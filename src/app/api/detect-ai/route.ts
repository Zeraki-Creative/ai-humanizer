import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

function computeLocalMetrics(text: string) {
  const sentences = text.split(/[.!?]+/).map((s) => s.trim()).filter((s) => s.length > 0);
  const words = text.split(/\s+/).filter((w) => w.length > 0);
  const totalWords = words.length;

  if (sentences.length === 0 || totalWords === 0) {
    return { perplexityScore: 0.5, burstinessScore: 0.5, vocabRichness: 0.5, avgSentenceLen: 0 };
  }

  const sentenceLengths = sentences.map((s) => s.split(/\s+/).length);
  const meanLen = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
  const variance = sentenceLengths.reduce((sum, l) => sum + (l - meanLen) ** 2, 0) / sentenceLengths.length;
  const burstinessScore = Math.min(1, Math.sqrt(variance) / 8);

  const uniqueWords = new Set(words.map((w) => w.toLowerCase().replace(/[^a-z]/g, "")));
  const vocabRichness = Math.min(1, (uniqueWords.size / totalWords) * 1.8);

  const bigrams = new Map<string, number>();
  for (let i = 0; i < words.length - 1; i++) {
    const bigram = `${words[i].toLowerCase()} ${words[i + 1].toLowerCase()}`;
    bigrams.set(bigram, (bigrams.get(bigram) || 0) + 1);
  }
  const repeatedBigrams = [...bigrams.values()].filter((v) => v > 1).length;
  const perplexityScore = Math.max(0, 1 - (repeatedBigrams / Math.max(bigrams.size, 1)) * 2);

  return { perplexityScore, burstinessScore, vocabRichness, avgSentenceLen: meanLen };
}

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }
    if (text.trim().length < 50) {
      return NextResponse.json({ error: "Please provide at least 50 characters for accurate detection" }, { status: 400 });
    }

    const localMetrics = computeLocalMetrics(text);

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You are an expert AI text detection system. Analyze text and respond ONLY with raw JSON — no markdown, no code blocks.",
        },
        {
          role: "user",
          content: `Analyze the following text and determine if it was written by an AI or a human.

Examine these specific indicators:
1. Perplexity patterns: Does word choice feel predictably safe and generic, or genuinely creative?
2. Burstiness: Does the text have natural rhythm variation, or unnaturally uniform sentence structures?
3. AI markers: Look for phrases like "In conclusion", "It is important to note", "Furthermore", "Moreover", "Delve into", repetitive transitional phrases, overly exhaustive lists
4. Human markers: Contractions, informal language, personal opinions, occasional imperfection, humor, emotional authenticity
5. Vocabulary patterns: Does it use unusually balanced vocabulary that feels artificially constructed?
6. Structural patterns: Does paragraph structure feel templated or formulaic?

Text to analyze:
"""
${text}
"""

Respond in EXACTLY this JSON format with no markdown, no code blocks, just raw JSON:
{"aiProbability":<number 0-100>,"humanProbability":<number 0-100>,"confidence":"low"|"medium"|"high","verdict":"Human Written"|"Likely Human"|"Uncertain"|"Likely AI"|"AI Generated","keyIndicators":[{"type":"ai"|"human","indicator":"<string>","weight":"low"|"medium"|"high"}],"analysis":"<2-3 sentence explanation>","aiSegments":["<exact verbatim passage from the text that is most AI-like>","<another passage>"]}

For aiSegments: copy up to 5 exact verbatim passages (complete sentences or phrases) from the analyzed text that show the strongest AI patterns. Each entry must be an exact substring of the input text. Return an empty array [] if the text appears human-written.`,
        },
      ],
      temperature: 0.2,
      max_tokens: 1536,
    });

    const responseText = (completion.choices[0]?.message?.content ?? "").trim();

    let claudeAnalysis;
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      claudeAnalysis = JSON.parse(jsonMatch ? jsonMatch[0] : responseText);
    } catch {
      claudeAnalysis = {
        aiProbability: 50, humanProbability: 50, confidence: "low",
        verdict: "Uncertain", keyIndicators: [], analysis: "Unable to parse analysis.",
      };
    }

    const localAIScore =
      (1 - localMetrics.burstinessScore) * 0.4 +
      (1 - localMetrics.vocabRichness) * 0.3 +
      (1 - localMetrics.perplexityScore) * 0.3;

    const blendedAIProb = Math.round(claudeAnalysis.aiProbability * 0.75 + localAIScore * 100 * 0.25);

    return NextResponse.json({
      ...claudeAnalysis,
      aiProbability: blendedAIProb,
      humanProbability: 100 - blendedAIProb,
      metrics: {
        perplexity: Math.round(localMetrics.perplexityScore * 100),
        burstiness: Math.round(localMetrics.burstinessScore * 100),
        vocabularyRichness: Math.round(localMetrics.vocabRichness * 100),
        avgSentenceLength: Math.round(localMetrics.avgSentenceLen),
      },
      wordCount: text.split(/\s+/).filter((w) => w.length > 0).length,
    });
  } catch (err) {
    console.error("AI detection error:", err);
    return NextResponse.json({ error: "Detection failed. Please try again." }, { status: 500 });
  }
}
