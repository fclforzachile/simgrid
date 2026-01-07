"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CTA() {
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
    <section className="w-full py-20 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md w-full"
      >
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-3 rounded-md text-black"
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-white text-black font-semibold py-3 rounded-md"
        >
          {status === "loading" ? "Sending..." : "Request access"}
        </button>

        {status === "success" && (
          <p className="text-green-400 text-sm">You're on the list 🚀</p>
        )}

        {status === "error" && (
          <p className="text-red-400 text-sm">
            Something went wrong. Try again.
          </p>
        )}
      </form>
    </section>
  );
}
