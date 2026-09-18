import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import crypto from "crypto";
import { logActivity } from "@/lib/activity-logger";

function hashPassword(password) {
  return crypto.createHash("sha256").update(password + "cms_salt_2024").digest("hex");
}

function cleanEnv(val) {
  let str = (val || "").trim();
  if ((str.startsWith('"') && str.endsWith('"')) || (str.startsWith("'") && str.endsWith("'"))) {
    str = str.slice(1, -1).trim();
  }
  return str;
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = (body.email || "").toString().trim();
    const password = (body.password || "").toString();

    // Credentials are read ONLY from environment variables (.env / Vercel Environment Variables)
    const adminEmail = cleanEnv(process.env.ADMIN_EMAIL).toLowerCase();
    const adminPassword = cleanEnv(process.env.ADMIN_PASSWORD);
    const inputEmail = email.toLowerCase();

    // 1. Check Super Admin credentials
    if (adminEmail && adminPassword && inputEmail === adminEmail && password === adminPassword) {
      const token = "demo-jwt-token";
      await logActivity(request, 'login', 'Super Admin', {}, { userId: 'super_admin', userName: 'Super Admin' });
      const response = NextResponse.json({
        token,
        user: {
          name: "Super Admin",
          email: adminEmail,
          role: "super_admin",
        }
      });
      const isProd = process.env.NODE_ENV === "production";
      response.cookies.set("jwt", token, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: isProd,
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      return response;
    }

    // 2. Check Database users (e.g. cms_users)
    const db = await getDb();
    const user = await db.collection("cms_users").findOne({
      email: { $regex: new RegExp(`^${inputEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') }
    });

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
        const isProd = process.env.NODE_ENV === "production";
        response.cookies.set("jwt", token, {
          httpOnly: true,
          path: "/",
          sameSite: "lax",
          secure: isProd,
          maxAge: 60 * 60 * 24 * 7,
        });
        return response;
      }
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}