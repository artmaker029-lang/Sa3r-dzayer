import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export const dynamic = "force-dynamic"

export async function GET() {
  const start = Date.now()

  const { data, error } = await supabase.from("prices").select("*").limit(1)

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    ok: true,
    elapsed: `${Date.now() - start}ms`,
    timestamp: new Date().toISOString(),
  })
}
