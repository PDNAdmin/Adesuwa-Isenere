import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { SANITY_CACHE_TAG } from "@/sanity/client";

// Called by a Sanity webhook on every publish so edits appear on the live site immediately.
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "SANITY_REVALIDATE_SECRET is not set" }, { status: 500 });
  }

  try {
    const { isValidSignature } = await parseBody(req, secret);
    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    revalidateTag(SANITY_CACHE_TAG, { expire: 0 });
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    console.error("[sanity] revalidate webhook failed:", error);
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
