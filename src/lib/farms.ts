import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { FarmPoint } from "@/types/farm";

const colRef = collection(db, "farms");

export async function listFarms(): Promise<FarmPoint[]> {
  const q = query(colRef, orderBy("ownerName", "asc"));
  const snap = await getDocs(q);

  return snap.docs.map((d) => {
    const data = d.data() as any;

    return {
      id: d.id,
      ...data,

      // fallback kalau dokumen lama belum punya field ini
      markerType: (data.markerType as FarmPoint["markerType"]) ?? "farmer",

      // pastikan selalu array, bukan undefined
      commodities: Array.isArray(data.commodities)
        ? data.commodities
        : [],
    } satisfies FarmPoint;
  });
}

export async function createFarm(payload: Omit<FarmPoint, "id">) {
  await addDoc(colRef, payload);
}

export async function updateFarm(
  id: string,
  payload: Partial<Omit<FarmPoint, "id">>
) {
  await updateDoc(doc(db, "farms", id), payload);
}

export async function deleteFarm(id: string) {
  await deleteDoc(doc(db, "farms", id));
}
