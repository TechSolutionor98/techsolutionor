import { NextResponse } from "next/server";
import { logActivity } from "@/lib/activity-logger";

export async function POST(request) {
  await logActivity(request, 'logout', 'Admin Portal');
  const response = NextResponse.json({ message: "Logged out" });
  response.cookies.set("jwt", "", { httpOnly: true, path: "/", maxAge: 0 });
  return response;
}