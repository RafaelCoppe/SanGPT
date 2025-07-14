import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  // Appelle le backend pour une recette précise
  const res = await fetch(`http://back:3000/recipes/${id}`);
  if (!res.ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const data = await res.json();
  return NextResponse.json(data);
}
