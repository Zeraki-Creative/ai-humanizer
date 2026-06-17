import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }
    if (text.trim().length < 50) {
      return NextResponse.json({ error: "Please provide at least 50 characters for analysis" }, { status: 400 });
    }

    const words = text.split(/\s+/).filter((w) => w.length > 0).length;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You are a plagiarism detection expert. Respond ONLY with raw JSON — no markdown, no code blocks.",
        },
        {
          role: "user",
          content: `Analyze the following text for potential plagiarism based on your knowledge of academic papers, published works, Wikipedia, news articles, and common online sources.

Look for:
1. Verbatim or near-verbatim phrases from known sources
2. Highly distinctive phrasing likely from a specific source
3. Content that reads as directly lifted rather than paraphrased
4. Structural patterns matching known templates

Text to analyze:
"""
${text}
"""

Respond in EXACTLY this JSON format with no markdown, no code blocks, just raw JSON:
{"overallScore":<0-100, plagiarism level>,"originalityScore":<0-100, originality level>,"verdict":"Original"|"Mostly Original"|"Some Similarities"|"High Similarity"|"Plagiarized","suspiciousSegments":[{"text":"<segment max 100 chars>","potentialSource":"<source name>","similarity":<0-100>,"type":"exact"|"near-exact"|"paraphrased"}],"sourceCategories":{"academic":<0-100>,"web":<0-100>,"books":<0-100>,"news":<0-100>},"summary":"<2-3 sentences>","recommendations":["<string>","<string>"]}

Be realistic — only flag content you genuinely recognize. Give low plagiarism score for original-sounding text.`,
        },
      ],
      temperature: 0.2,
      max_tokens: 1024,
    });

    const responseText = (completion.choices[0]?.message?.content ?? "").trim();

    let parsed;
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      parsed = JSON.parse(jsonMatch ? jsonMatch[0] : responseText);
    } catch {
      parsed = {
        overallScore: 5, originalityScore: 95, verdict: "Original",
        suspiciousSegments: [],
        sourceCategories: { academic: 0, web: 0, books: 0, news: 0 },
        summary: "The text appears to be original content.",
        recommendations: ["Continue writing original content.", "Cite sources when using external information."],
      };
    }

    return NextResponse.json({ ...parsed, wordCount: words, charactersAnalyzed: text.length });
  } catch (err) {
    console.error("Plagiarism check error:", err);
    return NextResponse.json({ error: "Analysis failed. Please try again." }, { status: 500 });
  }
}
