import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const ANTI_AI_BASE = `
Apply these transformations to avoid AI detection patterns:
• Vary sentence lengths: short (under 8 words), medium, and long (25+ words) must all appear. Never three similar-length sentences in a row.
• Use contractions: "it's", "don't", "can't", "won't", "we're", "they're" — always, never the formal expanded form.
• Replace academic connectors: "furthermore"→"also"/"and", "moreover"→"on top of that", "however"→"but"/"yet", "therefore"→"so", "in order to"→"to".
• Never use: utilize, demonstrate, facilitate, significant, leverage, robust, comprehensive, notably, furthermore, moreover, in conclusion, tapestry, testament, showcase, underscore, delve.
• No em dashes (—) or en dashes (–).
• Vary paragraph lengths. Mix 1-sentence paragraphs with multi-sentence ones.
`;

const MODE_PROMPTS: Record<string, string> = {
  standard: `You are an expert paraphrasing assistant. Rewrite the given text expressing the same meaning with completely different wording and sentence structures. The result must read naturally — not like it was processed by an AI.

${ANTI_AI_BASE}
• Start sentences differently each time — not always Subject → Verb.
• Vary the rhythm: confident short statements, then longer explanatory sentences.
• Allow occasional first-person hedging where it fits: "I'd argue", "arguably", "it seems".

Output ONLY the paraphrased text. No preamble.`,

  fluency: `You are a fluency expert. Rewrite the given text for maximum natural readability — smooth, flowing, easy to read aloud. Fix awkward phrasing, simplify tangles, keep it pleasant.

${ANTI_AI_BASE}
• Prioritise short, clear sentences where the original is wordy or tangled.
• But mix in longer, flowing sentences too — rhythm matters.
• Think: how would a good non-fiction writer say this?
• Contractions and natural speech patterns throughout.

Output ONLY the rewritten text. No preamble.`,

  formal: `You are an expert paraphrasing assistant. Rewrite the given text in formal, professional language suitable for academic or business writing. Use precise vocabulary and proper sentence structure.

Rules:
• Formal does NOT mean AI-sounding. Vary sentence lengths even in formal contexts.
• Use full forms (contractions are fine to limit in formal writing) but don't make it robotic.
• Never use: "it is important to note", "furthermore", "moreover", "in conclusion", "leverage", "utilize".
• Replace those with direct, clear formal alternatives.
• No em dashes. No excessive hedging.

Output ONLY the rewritten text. No preamble.`,

  simple: `You are an expert simplification assistant. Rewrite the given text using plain, simple language anyone can understand. Short sentences. Common everyday words. No jargon.

${ANTI_AI_BASE}
• Aim for a reading level that a high schooler would find easy.
• Break complex ideas into separate short sentences.
• If a technical term is necessary, briefly explain it.
• Conversational tone — like explaining something to a friend.

Output ONLY the rewritten text. No preamble.`,

  creative: `You are a creative writing expert. Rewrite the given text with a vivid, engaging voice — make it memorable and genuinely interesting to read.

${ANTI_AI_BASE}
• Pick a distinctive voice and own it throughout.
• Use fresh, concrete images instead of abstract claims.
• Short punchy sentences for impact. Then longer flowing ones that build and carry momentum before landing somewhere.
• Let enthusiasm or opinion show through where the content allows.
• Rhetorical questions, parenthetical asides, and direct reader engagement are welcome.

Output ONLY the rewritten text. No preamble.`,
};

export async function POST(req: NextRequest) {
  try {
    const { text, mode = "standard" } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }
    if (text.trim().length < 10) {
      return NextResponse.json({ error: "Please provide at least 10 characters" }, { status: 400 });
    }

    const systemPrompt = MODE_PROMPTS[mode] || MODE_PROMPTS.standard;
    const inputTokenEstimate = Math.ceil(text.split(/\s+/).length * 1.4);
    const maxTokens = Math.min(4096, Math.max(512, Math.ceil(inputTokenEstimate * 1.25)));

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const completion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: text },
            ],
            stream: true,
            temperature: 0.92,
            max_tokens: maxTokens,
          });

          for await (const chunk of completion) {
            const chunkText = chunk.choices[0]?.delta?.content ?? "";
            if (chunkText) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunkText })}\n\n`));
            }
          }

          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          const raw = err instanceof Error ? err.message : String(err);
          let message = "Something went wrong. Please try again.";
          if (raw.includes("429") || raw.includes("rate_limit") || raw.includes("Rate limit")) {
            const secsMatch = raw.match(/try again in (\d+(?:\.\d+)?)s/);
            if (secsMatch) {
              message = `Too many requests — please wait ${Math.ceil(parseFloat(secsMatch[1]))} seconds and try again.`;
            } else if (raw.includes("h")) {
              message = "Daily AI limit reached. Please try again tomorrow or use a shorter text.";
            } else {
              message = "Too many requests — please wait 30 seconds and try again.";
            }
          } else if (raw.includes("401") || raw.includes("invalid_api_key")) {
            message = "API key error. Please check your configuration.";
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: message })}\n\n`));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
