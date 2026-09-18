"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: email.trim(), password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        const { token, user } = data;
        localStorage.setItem("jwt", token);
        localStorage.setItem("user", JSON.stringify(user || { role: 'super_admin' }));
        const isHttps = typeof window !== "undefined" && window.location.protocol === "https:";
        document.cookie = `jwt=${token}; path=/; max-age=604800; SameSite=Lax${isHttps ? "; Secure" : ""}`;
        window.location.href = "/admin"; // Force reload and navigate to admin
      } else {
        setError(data?.error || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login request failed:", err);
      setError("Connection error. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    //   background: "linear-gradient(135deg, #20507C 0%, #0e6b50 100%)"
    }}>
      <form
        onSubmit={handleLogin}
        style={{
          background: "#fff",
          padding: "40px 32px",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          minWidth: 340,
          display: "flex",
          flexDirection: "column",
          gap: 18
        }}
      >
        <h2 style={{ textAlign: "center", color: "#20507C", marginBottom: 8 }}>Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
            color:'black'
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
            color:'black'
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px",
            borderRadius: "8px",
            background: "#34953C",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "16px",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            marginTop: "8px"
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && (
          <div style={{ color: "red", textAlign: "center", marginTop: "4px" }}>
            {error}
          </div>
        )}

      </form>
    </div>
  );
}