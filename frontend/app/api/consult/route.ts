// import { NextResponse } from "next/server"

// export async function POST(req: Request) {
//   try {
//     const { message, brand } = await req.json()

//     // Call your AWS Lambda API (server-side, no CORS)
//     const response = await fetch(process.env.CONSULT_API_URL!, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ message, brand }),
//     })

//     const data = await response.json()
//     return NextResponse.json(data)
//   } catch (error: any) {
//     console.error("Error calling Lambda:", error)
//     return NextResponse.json({ error: "Server error" }, { status: 500 })
//   }
// }

import { NextResponse } from 'next/server';

// ⏱️ Allow long-running route (Next.js 13+/Vercel)
export const maxDuration = 300; // seconds (5 minutes)

// Optional: disable caching
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { message, brand } = await req.json();

    // Create AbortController to extend timeout manually (5 minutes)
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 300_000); // 300s = 5min

    // 🛰️ Call FastAPI or Lambda backend
    const response = await fetch(process.env.CONSULT_API_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, brand }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    // If FastAPI returns JSON, forward it directly
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error calling consultation API:', error);
    const msg =
      error.name === 'AbortError' ? '⏱️ Request timed out (5 minutes limit).' : 'Server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
