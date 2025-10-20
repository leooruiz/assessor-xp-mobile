import { Platform } from "react-native";

export const API_BASE_URL =
  Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";

// Tipos de erro customizados
export class APIError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public details?: string
  ) {
    super(message);
    this.name = "APIError";
  }
}

export class NetworkError extends Error {
  constructor(message: string = "Falha na conexão com o servidor") {
    super(message);
    this.name = "NetworkError";
  }
}

export class ValidationError extends Error {
  constructor(public field: string, message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

// Função para processar erros de API
export function getErrorMessage(error: unknown): string {
  if (error instanceof APIError) {
    switch (error.statusCode) {
      case 400:
        return "Dados inválidos. Verifique as informações e tente novamente.";
      case 401:
        return "Acesso não autorizado. Faça login novamente.";
      case 404:
        return "Recurso não encontrado. Verifique se o serviço está funcionando.";
      case 500:
        return "Erro interno do servidor. Tente novamente mais tarde.";
      default:
        return error.message || "Erro desconhecido do servidor.";
    }
  }

  if (error instanceof NetworkError) {
    return error.message;
  }

  if (error instanceof ValidationError) {
    return `Erro no campo ${error.field}: ${error.message}`;
  }

  if (error instanceof Error) {
    // Detectar erros de rede
    if (
      error.message.includes("Network request failed") ||
      error.message.includes("fetch")
    ) {
      return "Falha na conexão. Verifique sua internet e tente novamente.";
    }
    return error.message;
  }

  return "Erro desconhecido. Tente novamente.";
}

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
      let errorDetails = "";
      try {
        const errorBody = await res.text();
        errorDetails = errorBody;
      } catch {
        errorDetails = "Erro desconhecido";
      }

      throw new APIError(res.status, `Erro ${res.status}`, errorDetails);
    }

    return (await res.json()) as T;
  } catch (e) {
    // Se for um erro de rede e ainda temos tentativas
    if (
      tries > 0 &&
      (e instanceof TypeError || (e as any)?.name === "TypeError")
    ) {
      return http<T>(path, init, tries - 1);
    }

    // Se o erro já é do nosso tipo, apenas re-lance
    if (e instanceof APIError) {
      throw e;
    }

    // Para outros erros, trate como erro de rede
    throw new NetworkError(getErrorMessage(e));
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
