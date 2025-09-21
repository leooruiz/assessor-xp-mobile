import { Platform } from "react-native";
export const API_BASE_URL =
  Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";

async function http<T>(
  path: string,
  init?: RequestInit,
  tries = 2
): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
      ...init,
    });
    if (!res.ok) {
      const err = await res.text().catch(() => "");
      throw new Error(`${res.status} ${err}`);
    }
    return (await res.json()) as T;
  } catch (e) {
    if (tries > 0) return http<T>(path, init, tries - 1);
    throw e;
  }
}

export type Asset = { id: string; nome: string; classe: string };
export type Profile = {
  id: string;
  suitability: string;
  objetivo: string;
  liquidez: string;
};
export type RecommendationItem = {
  assetId: string;
  nome: string;
  peso: number;
  xai: string;
};
export type Recommendation = {
  id: string;
  profileId: string;
  items: RecommendationItem[];
  resumo?: string;
};

export const api = {
  getAssets: () => http<Asset[]>("/assets"),
  listProfiles: () => http<Profile[]>("/profiles"),
  createProfile: (data: Omit<Profile, "id">) =>
    http<Profile>("/profiles", { method: "POST", body: JSON.stringify(data) }),
  createRecommendation: (profileId: string) =>
    http<Recommendation>("/recommendations", {
      method: "POST",
      body: JSON.stringify({ profileId }),
    }),
};
