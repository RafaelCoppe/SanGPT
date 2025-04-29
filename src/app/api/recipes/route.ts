import { NextResponse } from "next/server";
import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID!);

console.log("Airtable API Key:", process.env.AIRTABLE_API_KEY);

export async function GET() {
  const records = await base("Recipes").select().all();
  const recipes = records.map((rec) => ({
    id: rec.id,
    ...rec.fields,
  }));
  return NextResponse.json(recipes);
}
