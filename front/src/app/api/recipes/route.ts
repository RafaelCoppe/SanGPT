import { NextResponse } from "next/server";

export async function GET() {
  // Ici, fais le fetch vers Airtable ou ton backend
  const res = await fetch("http://back:3000/recipes"); // adapte l'URL si besoin
  const data = await res.json();
  return NextResponse.json(data);
}
