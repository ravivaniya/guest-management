import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const guests = await prisma.guest.findMany();
    return NextResponse.json(guests);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch guests" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const guest = await prisma.guest.create({ data });
    return NextResponse.json(guest);
  } catch {
    return NextResponse.json(
      { error: "Failed to create guest" },
      { status: 500 }
    );
  }
}
