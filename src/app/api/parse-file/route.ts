import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
// officeparser is listed in serverExternalPackages so Next.js won't bundle it
import { OfficeParser } from "officeparser";

const MAX_BYTES = 10 * 1024 * 1024;

const SUPPORTED = new Set(["pdf", "doc", "docx", "ppt", "pptx", "odt", "odp", "ods"]);

export async function POST(req: NextRequest) {
  let tmpPath: string | null = null;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "File too large. Maximum size is 10 MB." }, { status: 413 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!SUPPORTED.has(ext)) {
      return NextResponse.json({ error: "Unsupported file type." }, { status: 400 });
    }

    // officeparser v7 needs a file path, not a Buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    tmpPath = join(tmpdir(), `upload-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`);
    await writeFile(tmpPath, buffer);

    const ast = await OfficeParser.parseOffice(tmpPath);
    const text = ast.toText().trim();

    if (!text) {
      return NextResponse.json(
        { error: "Could not extract text from this file. It may be empty, scanned, or password-protected." },
        { status: 422 }
      );
    }

    return NextResponse.json({ text });
  } catch (err) {
    console.error("File parse error:", err);
    return NextResponse.json(
      { error: "Failed to read this file. Please try a different format or paste the text directly." },
      { status: 500 }
    );
  } finally {
    if (tmpPath) {
      unlink(tmpPath).catch(() => {});
    }
  }
}
