import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const { error } = await supabase.from("beta_requests").insert([
      { email }
    ]);

    if (error) {
      console.error(error);
      setStatus("error");
    } else {
      setStatus("success");
      setEmail("");
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "80px 24px" }}>
      <section style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontSize: 56, marginBottom: 16 }}>SimGrid</h1>
        <h2 style={{ fontSize: 24, opacity: 0.8, marginBottom: 32 }}>
          Race. Win. Rise.
        </h2>

        <p style={{ opacity: 0.7, marginBottom: 48 }}>
          The global platform for sim racing championships, pilots and organizers.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: 12, minWidth: 260 }}
          />
          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending..." : "Request access"}
          </button>
        </form>

        {status === "success" && (
          <p style={{ color: "#4ade80", marginTop: 16 }}>
            You're on the list 🚀
          </p>
        )}

        {status === "error" && (
          <p style={{ color: "#f87171", marginTop: 16 }}>
            Something went wrong.
          </p>
        )}
      </section>
    </main>
  );
}
