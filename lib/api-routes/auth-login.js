import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import crypto from "crypto";
import { logActivity } from "@/lib/activity-logger";

function hashPassword(password) {
  return crypto.createHash("sha256").update(password + "cms_salt_2024").digest("hex");
}

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const adminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || "";
    const inputEmail = (email || "").trim().toLowerCase();

    // 1. Check Super Admin credentials (only the configured Super Admin account)
    if (adminEmail && adminPassword && inputEmail === adminEmail && password === adminPassword) {
      const token = "demo-jwt-token";
      await logActivity(request, 'login', 'Super Admin', {}, { userId: 'super_admin', userName: 'Super Admin' });
      const response = NextResponse.json({
        token,
        user: {
          name: "Super Admin",
          email: process.env.ADMIN_EMAIL,
          role: "super_admin",
        }
      });
      response.cookies.set("jwt", token, { httpOnly: true, path: "/" });
      return response;
    }

    // 2. Check Database users
    const db = await getDb();
    const user = await db.collection("cms_users").findOne({ email });

    if (user) {
      // Check status
      if (user.status !== "active") {
        return NextResponse.json({ error: "User account is deactivated" }, { status: 403 });
      }

      // Check password
      const calculatedHash = hashPassword(password);
      if (user.passwordHash === calculatedHash) {
        const token = Buffer.from(JSON.stringify({ userId: user._id.toString(), role: user.role, name: user.name })).toString('base64');
        await logActivity(request, 'login', user.name, {}, { userId: user._id.toString(), userName: user.name });
        const response = NextResponse.json({
          token,
          user: {
            name: user.name,
            email: user.email,
            role: user.role,
          }
        });
        response.cookies.set("jwt", token, { httpOnly: true, path: "/" });
        return response;
      }
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}