import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ─── Guaranteed post-processing ─────────────────────────────────────────────
// Applied to the final LLM output. These fire regardless of what the model does.
function postProcess(text: string): string {
  return text
    // Contractions
    .replace(/\bI am\b(?!')/g,      "I'm")
    .replace(/\bI have\b/g,         "I've")
    .replace(/\bI will\b/g,         "I'll")
    .replace(/\bI would\b/g,        "I'd")
    .replace(/\bit is\b(?!')/g,     "it's")
    .replace(/\bIt is\b(?!')/g,     "It's")
    .replace(/\bthat is\b(?!')/g,   "that's")
    .replace(/\bthere is\b(?!')/g,  "there's")
    .replace(/\bThere is\b(?!')/g,  "There's")
    .replace(/\bwhat is\b(?!')/g,   "what's")
    .replace(/\bwho is\b(?!')/g,    "who's")
    .replace(/\bhe is\b(?!')/g,     "he's")
    .replace(/\bshe is\b(?!')/g,    "she's")
    .replace(/\bthey are\b(?!')/g,  "they're")
    .replace(/\bThey are\b(?!')/g,  "They're")
    .replace(/\bwe are\b(?!')/g,    "we're")
    .replace(/\bWe are\b(?!')/g,    "We're")
    .replace(/\byou are\b(?!')/g,   "you're")
    .replace(/\bYou are\b(?!')/g,   "You're")
    .replace(/\bcannot\b/gi,        "can't")
    .replace(/\bwill not\b/gi,      "won't")
    .replace(/\bdo not\b/gi,        "don't")
    .replace(/\bdoes not\b/gi,      "doesn't")
    .replace(/\bdid not\b/gi,       "didn't")
    .replace(/\bhave not\b/gi,      "haven't")
    .replace(/\bhas not\b/gi,       "hasn't")
    .replace(/\bhad not\b/gi,       "hadn't")
    .replace(/\bare not\b/gi,       "aren't")
    .replace(/\bwere not\b/gi,      "weren't")
    .replace(/\bwas not\b/gi,       "wasn't")
    .replace(/\bwould not\b/gi,     "wouldn't")
    .replace(/\bcould not\b/gi,     "couldn't")
    .replace(/\bshould not\b/gi,    "shouldn't")
    // Banned AI vocabulary
    .replace(/\butilizes\b/gi,      "uses")
    .replace(/\butilized\b/gi,      "used")
    .replace(/\butilizing\b/gi,     "using")
    .replace(/\butilize\b/gi,       "use")
    .replace(/\butilization\b/gi,   "use")
    .replace(/\bdemonstrates\b/gi,  "shows")
    .replace(/\bdemonstrated\b/gi,  "showed")
    .replace(/\bdemonstrating\b/gi, "showing")
    .replace(/\bdemonstrate\b/gi,   "show")
    .replace(/\bfacilitates\b/gi,   "helps")
    .replace(/\bfacilitated\b/gi,   "helped")
    .replace(/\bfacilitate\b/gi,    "help")
    .replace(/\bleverages\b/gi,     "uses")
    .replace(/\bleveraged\b/gi,     "used")
    .replace(/\bleverage\b/gi,      "use")
    .replace(/\bunderscores\b/gi,   "shows")
    .replace(/\bunderscored\b/gi,   "showed")
    .replace(/\bunderscore\b/gi,    "show")
    .replace(/\bshowcases\b/gi,     "shows")
    .replace(/\bshowcased\b/gi,     "showed")
    .replace(/\bshowcase\b/gi,      "show")
    .replace(/\bdelves\b/gi,        "looks")
    .replace(/\bdelved\b/gi,        "looked")
    .replace(/\bdelve\b/gi,         "look")
    .replace(/\bpivotal\b/gi,       "key")
    .replace(/\brobust\b/gi,        "strong")
    .replace(/\bcomprehensive\b/gi, "thorough")
    .replace(/\bholistic\b/gi,      "overall")
    .replace(/\bmultifaceted\b/gi,  "complex")
    .replace(/\bparadigm\b/gi,      "model")
    .replace(/\bsynergy\b/gi,       "combination")
    .replace(/\bcutting-edge\b/gi,  "advanced")
    .replace(/\btestament to\b/gi,  "proof of")
    .replace(/\btapestry\b/gi,      "mix")
    .replace(/\bfurthermore,?\b/gi, "also")
    .replace(/\bmoreover,?\b/gi,    "and")
    .replace(/\bnotably,?\b/gi,     "")
    .replace(/\badditionally,?\b/gi,"also")
    // Filler phrases
    .replace(/\bin order to\b/gi,                   "to")
    .replace(/\bdue to the fact that\b/gi,          "because")
    .replace(/\bit is important to note that\b/gi,  "")
    .replace(/\bIt is important to note that\b/g,   "")
    .replace(/\bit is worth noting that\b/gi,       "")
    .replace(/\bIt is worth noting that\b/g,        "")
    .replace(/\bIt should be noted that\b/g,        "")
    .replace(/\bIn conclusion,?\s*/gi,               "")
    .replace(/\bTo summarize,?\s*/gi,                "")
    .replace(/\bIn summary,?\s*/gi,                  "")
    // Em / en dashes
    .replace(/\s*—\s*/g,  ". ")
    .replace(/\s*–\s*/g,  ", ")
    // Clean up artefacts
    .replace(/  +/g,       " ")
    .replace(/\. \./g,     ".")
    .replace(/,\s*\./g,    ".")
    .trim();
}

function friendlyError(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  if (msg.includes("429") || msg.includes("rate_limit") || msg.includes("Rate limit")) {
    // Extract retry time from Groq error, e.g. "Please try again in 12.5s" or "in 1h 2m"
    const secondsMatch = msg.match(/try again in (\d+(?:\.\d+)?)s/);
    const longMatch = msg.match(/try again in (.+?)\./);
    if (secondsMatch) {
      const secs = Math.ceil(parseFloat(secondsMatch[1]));
      return `Too many requests — please wait ${secs} seconds and try again.`;
    }
    if (longMatch && longMatch[1].includes("h")) {
      return "Daily AI limit reached. Please try again tomorrow or use a shorter text.";
    }
    return "Too many requests — please wait 30 seconds and try again.";
  }
  if (msg.includes("401") || msg.includes("invalid_api_key")) {
    return "API key error. Please check your configuration.";
  }
  if (msg.includes("timeout") || msg.includes("ETIMEDOUT")) {
    return "Request timed out. Please try again with a shorter text.";
  }
  return "Something went wrong. Please try again.";
}

// ─── Prompts ─────────────────────────────────────────────────────────────────

const BASE = `You are rewriting AI-generated text to pass as human-written. You know exactly how AI detectors work.

WHAT DETECTORS MEASURE:
1. BURSTINESS — sentence length variance. AI writes sentences of eerily similar length. Low variance = flagged as AI.
   FIX: Mix lengths wildly. Short sentences (4-7 words). Medium (10-18). Long (25-35). Never three similar-length sentences in a row. This is the single most important fix.

2. PERPLEXITY — word choice predictability. AI always picks the statistically "safest" word.
   FIX: Use less common but equally correct words. "use" over "utilize". "show" over "demonstrate". "help" over "facilitate". "get" over "obtain". "need" over "require". Pick unexpected but fitting words.

3. VOCABULARY DISTRIBUTION — AI spreads vocabulary too evenly.
   FIX: Let key topic words repeat naturally (like a human who cares about their subject) while varying everyday connectors.

MANDATORY — apply every single one:
□ Sentence rhythm: After 2 normal sentences, write one that is 4-7 words. Full stop. Then continue. Keep doing this.
□ Contractions: it's, don't, can't, won't, we're, they're, you're, isn't, aren't, hasn't, doesn't — always. Never the formal expanded form.
□ Sentence openers: Vary them. "But", "And", "So", "Yet" are fine at sentence starts. Use adverbs: "Honestly,", "Clearly,". Use prep phrases: "In practice,", "Over time,".
□ Transitions: furthermore→also/and, moreover→and, additionally→also, however→but/yet, therefore→so, in order to→to, due to the fact that→because.
□ Voice: Insert "I think", "arguably", "honestly", "from what I can tell" 1-3 times where it fits naturally.
□ Parenthetical asides: Add 1-2 (like this) — distinctly human.
□ One rhetorical question somewhere.
□ Specific > abstract: Replace vague claims with concrete details or examples.

BANNED WORDS — never output these:
utilize, demonstrate, facilitate, leverage, robust, comprehensive, holistic, furthermore, moreover, notably, pivotal, testament, tapestry, showcase, underscore, delve, multifaceted, paradigm, synergy, cutting-edge, in conclusion, it is important to note, it is worth noting, in today's world, in the modern era

HARD NO:
• Zero em dashes (—) or en dashes (–)
• No bullet lists unless the original had them
• No bold or italic
• No chatbot phrases ("Certainly!", "I hope this helps")

WORD COUNT — CRITICAL:
Your output MUST be approximately the same length as the input (within ±10%). Do NOT summarize, condense, or skip any content. Rewrite EVERY sentence and EVERY paragraph. If the input has 10 paragraphs, the output must have 10 paragraphs. If the input is 1000 words, output 900–1100 words.

INTERNAL CHECK before writing your output:
→ Will at least 25% of my sentences be under 9 words? If not, shorten some.
→ Any banned words? Replace them.
→ Any "—" or "–"? Remove them.
→ Three consecutive same-length sentences? Break the pattern.
→ Does my output have the same number of paragraphs as the input? If not, expand.
→ Is my word count close to the target? If I'm more than 10% short, I must add back the missing content.

Output ONLY the rewritten text. Nothing else.`;

const MODE_ADDENDUM: Record<string, string> = {
  standard: "\nTONE: Clear, direct, conversational. Like an informed person explaining something to a colleague.",
  enhanced: "\nTONE: Strong personal voice with real opinions. More first-person ('I genuinely think', 'what strikes me'). Allow mild colloquialism ('it's a mess', 'which is wild'). One-liner paragraphs next to dense ones.",
  creative: "\nTONE: Vivid and distinctive. Pick a personality and own it. Use fresh concrete images. Short punchy sentences for impact. Then longer flowing ones that build momentum before landing. React to the content with genuine feeling.",
};

// ─── Route ───────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const { text, mode = "standard" } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }
    if (text.trim().length < 10) {
      return NextResponse.json({ error: "Please provide at least 10 characters" }, { status: 400 });
    }

    const inputWords = text.trim().split(/\s+/).length;
    const minWords = Math.floor(inputWords * 0.9);
    const wordCountDirective = `⚠️ WORD COUNT — HIGHEST PRIORITY RULE:
The input contains ${inputWords} words. Your output MUST contain at least ${minWords} words.
This is non-negotiable. Count your words as you write. If you finish early and are below ${minWords} words, go back and expand every paragraph with more detail, examples, and elaboration until you reach the target.
Do NOT summarize. Do NOT skip any section. Do NOT merge paragraphs. Rewrite EVERY sentence of the original in full.

`;
    const systemPrompt = wordCountDirective + BASE + (MODE_ADDENDUM[mode] ?? MODE_ADDENDUM.standard);
    const inputTokenEstimate = Math.ceil(inputWords * 1.4);
    // Budget 1.7× input tokens so the model has room to match the word count
    const maxTokens = Math.min(4096, Math.max(768, Math.ceil(inputTokenEstimate * 1.7)));
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        // Keep SSE connection alive with periodic pings while waiting for Groq
        const ping = () => {
          try { controller.enqueue(encoder.encode(": ping\n\n")); } catch { /* closed */ }
        };
        const hb = setInterval(ping, 8000);
        ping();

        try {
          // Single-pass, non-streaming from Groq — lets us apply postProcess before sending
          const completion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: `[TARGET LENGTH: ~${inputWords} words — rewrite ALL content, do NOT condense]\n\n${text}` },
            ],
            temperature: 1.0,
            max_tokens: maxTokens,
            stream: false,
          });

          clearInterval(hb);

          const raw = completion.choices[0]?.message?.content ?? "";
          const processed = postProcess(raw);

          // Chunk the processed result so the client gets streaming-style output
          const chunkSize = 18;
          for (let i = 0; i < processed.length; i += chunkSize) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ text: processed.slice(i, i + chunkSize) })}\n\n`)
            );
          }

          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          clearInterval(hb);
          const msg = friendlyError(err);
          try {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: msg })}\n\n`));
          } catch { /* already closed */ }
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
