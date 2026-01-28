"use client";

import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import type { FarmPoint } from "@/types/farm";
import { createFarm, deleteFarm, listFarms, updateFarm } from "@/lib/farms";

type FormState = Omit<FarmPoint, "id">;

const emptyForm: FormState = {
  lat: -5.5,
  lng: 120.0,
  ownerName: "",
  shortDesc: "",
  dusun: "",
  phone: "",
};

export default function AdminPage() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  const [rows, setRows] = useState<FarmPoint[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthed(!!user);
      setReady(true);
    });
    return () => unsub();
  }, []);

  async function refresh() {
    setLoading(true);
    try {
      setRows(await listFarms());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (authed) refresh();
  }, [authed]);

  const canSubmit = useMemo(() => {
    return (
      form.ownerName.trim().length > 0 &&
      form.shortDesc.trim().length > 0 &&
      form.dusun.trim().length > 0 &&
      form.phone.trim().length > 0 &&
      Number.isFinite(form.lat) &&
      Number.isFinite(form.lng)
    );
  }, [form]);

  if (!ready) return null;

  if (!authed) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="max-w-md w-full rounded-xl border bg-white p-6">
          <h1 className="text-2xl font-bold">Admin</h1>
          <p className="mt-2 text-gray-600">
            Kamu belum login. Klik tombol <b>MASUK</b> di navbar.
          </p>
        </div>
      </div>
    );
  }

  async function handleSubmit() {
    if (!canSubmit) return;

    const payload: FormState = {
      ...form,
      lat: Number(form.lat),
      lng: Number(form.lng),
    };

    setLoading(true);
    try {
      if (editingId) {
        await updateFarm(editingId, payload);
      } else {
        await createFarm(payload);
      }
      setForm(emptyForm);
      setEditingId(null);
      await refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Kelola Titik Pemilik Sawah</h1>
          <p className="text-gray-600 mt-1">
            Tambah/Edit/Hapus titik, lalu otomatis muncul di peta publik.
          </p>
        </div>

        <button
          className="rounded-lg border px-4 py-2 hover:bg-gray-50"
          onClick={() => signOut(auth)}
        >
          Logout
        </button>
      </div>

      {/* FORM */}
      <div className="mt-8 rounded-xl border bg-white p-6">
        <h2 className="text-xl font-bold">
          {editingId ? "Edit Titik" : "Tambah Titik"}
        </h2>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="rounded-lg border px-4 py-3"
            placeholder="Nama pemilik"
            value={form.ownerName}
            onChange={(e) => setForm((s) => ({ ...s, ownerName: e.target.value }))}
          />
          <input
            className="rounded-lg border px-4 py-3"
            placeholder="Deskripsi singkat (contoh: Petani Jagung dan Cabai)"
            value={form.shortDesc}
            onChange={(e) => setForm((s) => ({ ...s, shortDesc: e.target.value }))}
          />
          <input
            className="rounded-lg border px-4 py-3"
            placeholder="Dusun (contoh: Batu Sodong)"
            value={form.dusun}
            onChange={(e) => setForm((s) => ({ ...s, dusun: e.target.value }))}
          />
          <input
            className="rounded-lg border px-4 py-3"
            placeholder="No HP (+62...)"
            value={form.phone}
            onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
          />

          <input
            className="rounded-lg border px-4 py-3"
            placeholder="Latitude"
            value={String(form.lat)}
            onChange={(e) => setForm((s) => ({ ...s, lat: Number(e.target.value) }))}
          />
          <input
            className="rounded-lg border px-4 py-3"
            placeholder="Longitude"
            value={String(form.lng)}
            onChange={(e) => setForm((s) => ({ ...s, lng: Number(e.target.value) }))}
          />
        </div>

        <div className="mt-5 flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || loading}
            className="rounded-lg bg-black text-white px-5 py-3 font-semibold disabled:opacity-60"
          >
            {editingId ? "Simpan Perubahan" : "Tambah Titik"}
          </button>

          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
              }}
              className="rounded-lg border px-5 py-3 hover:bg-gray-50"
            >
              Batal
            </button>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="mt-6 rounded-xl border bg-white overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-bold">Daftar Titik</h2>
          <button className="text-sm underline" onClick={refresh} disabled={loading}>
            Refresh
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr className="text-sm text-gray-600">
                <th className="px-6 py-3">Nama</th>
                <th className="px-6 py-3">Deskripsi</th>
                <th className="px-6 py-3">Dusun</th>
                <th className="px-6 py-3">Telepon</th>
                <th className="px-6 py-3">Lat/Lng</th>
                <th className="px-6 py-3 w-[160px]">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="px-6 py-4 font-semibold">{r.ownerName}</td>
                  <td className="px-6 py-4">{r.shortDesc}</td>
                  <td className="px-6 py-4">{r.dusun}</td>
                  <td className="px-6 py-4">{r.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {r.lat}, {r.lng}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        className="rounded-lg border px-3 py-2 hover:bg-gray-50"
                        onClick={() => {
                          setEditingId(r.id);
                          setForm({
                            lat: r.lat,
                            lng: r.lng,
                            ownerName: r.ownerName,
                            shortDesc: r.shortDesc,
                            dusun: r.dusun,
                            phone: r.phone,
                          });
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="rounded-lg border px-3 py-2 hover:bg-red-50 text-red-600"
                        onClick={async () => {
                          if (!confirm("Hapus titik ini?")) return;
                          setLoading(true);
                          try {
                            await deleteFarm(r.id);
                            await refresh();
                          } finally {
                            setLoading(false);
                          }
                        }}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {rows.length === 0 && (
                <tr>
                  <td className="px-6 py-10 text-gray-600" colSpan={6}>
                    {loading ? "Memuat..." : "Belum ada data titik."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
