import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const {
    contact_method,
    contact_value,
    variant,
    country,
    utm_source,
    utm_campaign,
    utm_content,
  } = body as Record<string, string>;

  if (!contact_value?.trim()) {
    return NextResponse.json({ error: "contact_value is required" }, { status: 400 });
  }
  if (!["whatsapp", "email"].includes(contact_method)) {
    return NextResponse.json(
      { error: "contact_method must be whatsapp or email" },
      { status: 400 }
    );
  }
  if (!["general", "plan", "career"].includes(variant)) {
    return NextResponse.json(
      { error: "variant must be general, plan, or career" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("early_access_signups")
    .insert({
      contact_method,
      contact_value: contact_value.trim(),
      variant,
      country: country || "Mexico",
      utm_source: utm_source || null,
      utm_campaign: utm_campaign || null,
      utm_content: utm_content || null,
      status: "started",
    })
    .select("id")
    .single();

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }

  return NextResponse.json({ id: data.id }, { status: 201 });
}
