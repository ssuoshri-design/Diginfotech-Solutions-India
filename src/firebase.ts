import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDocFromServer } from "firebase/firestore";

// Read from client-side Vite environment variables
const metaEnv = (import.meta as any).env || {};
const config = {
  projectId: metaEnv.VITE_FIREBASE_PROJECT_ID || "driver-first-4a302",
  appId: metaEnv.VITE_FIREBASE_APP_ID || "1:590031557700:web:3b69b0a6cb29535a92d811",
  apiKey: metaEnv.VITE_FIREBASE_API_KEY || "AIzaSyBfGQZ3qVCjPhcTUcOpa0feTbTFxBVgMgI",
  authDomain: metaEnv.VITE_FIREBASE_AUTH_DOMAIN || "driver-first-4a302.firebaseapp.com",
  storageBucket: metaEnv.VITE_FIREBASE_STORAGE_BUCKET || "driver-first-4a302.firebasestorage.app",
  messagingSenderId: metaEnv.VITE_FIREBASE_MESSAGING_SENDER_ID || "590031557700",
};

const app = initializeApp(config);
export const db = getFirestore(app, metaEnv.VITE_FIREBASE_FIRESTORE_DATABASE_ID || "(default)");

export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: [],
    },
    operationType,
    path,
  };
  console.error("Firestore Error: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connection check validation logic
async function testConnection() {
  try {
    await getDocFromServer(doc(db, "test", "connection"));
  } catch (error) {
    console.warn("Firebase connection test failed:", error);
    if (error instanceof Error && error.message.includes("the client is offline")) {
      console.warn("Please check your Firebase configuration. Ensure Firestore is enabled in your Firebase console.");
    }
  }
}
testConnection();
