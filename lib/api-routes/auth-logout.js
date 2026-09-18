import { NextResponse } from "next/server";
import { logActivity } from "@/lib/activity-logger";

export async function POST(request) {
  await logActivity(request, 'logout', 'Admin Portal');
  const response = NextResponse.json({ message: "Logged out" });
  const isProd = process.env.NODE_ENV === "production";
  response.cookies.set("jwt", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
    sameSite: "lax",
    secure: isProd,
  });
  return response;
}