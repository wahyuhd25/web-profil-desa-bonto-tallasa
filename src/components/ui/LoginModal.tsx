"use client";

import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export default function LoginModal({ open, onClose, onSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setErr(null);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const submit = async () => {
    setErr(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      onClose();
      onSuccess?.();
    } catch (e: any) {
      setErr(e?.message ?? "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4" onClick={onClose}>
      <div
        className="relative w-full max-w-md rounded-xl bg-white shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Tutup"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100"
        >
          ✕
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold">Login Admin</h2>
          <p className="text-sm text-gray-600 mt-1">Masuk untuk mengelola titik pemilik sawah.</p>

          <div className="mt-5 space-y-3">
            <input
              className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-black/10"
              placeholder="Email admin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <input
              className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-black/10"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />

            {err && <div className="text-sm text-red-600">{err}</div>}

            <button
              onClick={submit}
              disabled={loading}
              className="w-full rounded-lg bg-black text-white py-3 font-semibold hover:bg-black/90 disabled:opacity-60"
            >
              {loading ? "Masuk..." : "Masuk"}
            </button>
          </div>
        </div>
      </div>
    </div>
    
  );
}
