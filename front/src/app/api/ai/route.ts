import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { ingredients, allergies, servings } = await req.json();

  // Appel au backend (service back) pour générer la recette via ChatGPT
  const res = await fetch("http://back:3000/gpt-recipe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients, allergies, servings }),
  });

  if (!res.ok) {
    const error = await res.text();
    return NextResponse.json({ error }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}