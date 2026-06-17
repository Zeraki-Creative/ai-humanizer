# AI Humanizer

Free, unlimited AI text humanizer, paraphraser, AI detector, and plagiarism checker — built with Next.js 16 and powered by Groq.

Live at → **[humanizer.zerakicreative.com](https://humanizer.zerakicreative.com)**

---

## Tools

| Tool | Path | Description |
|---|---|---|
| AI Humanizer | `/humanizer` | Converts AI-generated text into natural human writing (bypasses Turnitin, GPTZero, Copyleaks) |
| AI Paraphraser | `/paraphraser` | Rewrites text in 5 modes: Standard, Fluency, Formal, Simple, Creative |
| AI Detector | `/ai-detector` | Detects AI-generated content using perplexity and burstiness analysis |
| Plagiarism Checker | `/plagiarism-checker` | Checks text for plagiarism with highlighted matches and source attribution |

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4
- **AI:** [Groq SDK](https://console.groq.com) — `llama-3.1-8b-instant` (500k tokens/day free tier)
- **File parsing:** officeparser (Word/PDF/PPTX uploads)
- **Animations:** GSAP

---

## Prerequisites

- Node.js 18+
- A free [Groq API key](https://console.groq.com)

---

## Installation

```bash
# 1. Clone the repo
git clone https://github.com/your-org/ai-humanizer.git
cd ai-humanizer

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Open .env.local and add your Groq API key

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `GROQ_API_KEY` | Yes | Your Groq API key from [console.groq.com](https://console.groq.com) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | Google Analytics 4 Measurement ID (e.g. `G-XXXXXXXXXX`) |

> **Never commit `.env.local`** — it is listed in `.gitignore` by default.

---

## Scripts

```bash
npm run dev      # Start development server (Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── humanize/         # Humanizer SSE streaming endpoint
│   │   ├── paraphrase/       # Paraphraser endpoint
│   │   ├── detect-ai/        # AI detection endpoint
│   │   ├── plagiarism/       # Plagiarism check endpoint
│   │   └── parse-file/       # File upload parser (Word, PDF, PPTX)
│   ├── humanizer/            # Humanizer tool page
│   ├── paraphraser/          # Paraphraser tool page
│   ├── ai-detector/          # AI detector tool page
│   ├── plagiarism-checker/   # Plagiarism checker tool page
│   ├── insights/             # Blog / insights listing + articles
│   ├── privacy-policy/       # Privacy Policy page
│   ├── cookie-policy/        # Cookie Policy page
│   ├── sitemap.ts            # Auto-generated sitemap
│   ├── robots.ts             # robots.txt
│   └── layout.tsx            # Root layout with SEO metadata + JSON-LD
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ToolLayout.tsx
│   ├── TextInputPanel.tsx    # Shared text input with file upload support
│   └── HighlightedTextView.tsx
public/
├── zeraki-logo.png
├── favicon.ico
├── apple-touch-icon.png
├── android-chrome-*.png
└── site.webmanifest
```

---

## Notes

- **File uploads:** Supports `.docx`, `.pdf`, and `.pptx` via officeparser. Files are written to a temp path, parsed, then deleted — nothing is persisted.
- **Rate limits:** The free Groq tier allows 500,000 tokens/day on `llama-3.1-8b-instant`. Dynamic `max_tokens` is calculated per request to stay efficient.
- **Streaming:** The humanizer uses SSE (Server-Sent Events) to stream output to the client in real time.

---

## License

Private — © 2026 [Zeraki Creative](https://zerakicreative.com). All rights reserved.
