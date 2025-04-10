import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params;
    const numericId = Number.parseInt(id);
    const data = await request.json();
    const guest = await prisma.guest.update({
      where: { id: numericId },
      data,
    });
    return NextResponse.json(guest);
  } catch {
    return NextResponse.json(
      { error: "Failed to update guest" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params;
    const numericId = Number.parseInt(id);
    await prisma.guest.delete({
      where: { id: numericId },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete guest" },
      { status: 500 }
    );
  }
}
