export type FarmPoint = {
  id: string;

  // koordinat
  lat: number;
  lng: number;

  // info untuk modal popup
  ownerName: string;
  shortDesc: string; // mis: "Petani Jagung dan Cabai"
  dusun: string;
  phone: string; // format +62...

  // tipe lokasi → untuk pilih emoji marker di peta
  markerType: "farmer" | "shop" | "gov";

  commodities?: string[];
};
