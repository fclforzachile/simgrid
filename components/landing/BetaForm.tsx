"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function BetaForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = () => {
    if (!email) return;
    setSent(true);
  };

  return (
    <div className="max-w-md mx-auto">
      {!sent ? (
        <>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border px-4 py-3 mb-4"
          />
          <Button onClick={submit}>Request access</Button>
        </>
      ) : (
        <p className="text-green-500 font-semibold">
          You're on the list 🚀
        </p>
      )}
    </div>
  );
}
