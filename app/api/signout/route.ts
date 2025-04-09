import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("auth", "", { maxAge: 0 });
  response.cookies.set("username", "", { maxAge: 0 });
  response.headers.set("X-Redirect", "/signin");
  return response;
}
