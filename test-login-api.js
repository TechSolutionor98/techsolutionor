async function test() {
  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: "mw951390@gmail.com", password: "mw951390" }),
      headers: { "Content-Type": "application/json" },
    });
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Body:", text);
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}
test();
