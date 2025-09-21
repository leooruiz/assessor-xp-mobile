import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Session } from "../../App";

const K = {
  SESSION: "assessorxp/session",
};

export async function saveSession(session: Session) {
  await AsyncStorage.setItem(K.SESSION, JSON.stringify(session));
}

export async function loadSession(): Promise<Session> {
  const raw = await AsyncStorage.getItem(K.SESSION);
  return raw ? JSON.parse(raw) : null;
}

export async function clearSession() {
  await AsyncStorage.removeItem(K.SESSION);
}
