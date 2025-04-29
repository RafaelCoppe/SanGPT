import { NextResponse } from "next/server";
import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID!);

export async function GET() {
  const records = await base("Recettes").select().all();
  const recipes = records.map((rec) => ({
    id: rec.id,
    ...rec.fields,
  }));
  return NextResponse.json(recipes);
}
