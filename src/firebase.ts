import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDocFromServer } from "firebase/firestore";

// Read from client-side Vite environment variables exclusively safely casted for TS
const env = (import.meta as any).env || {};
const config = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

// Check if we have minimum requirements to initialize Firebase.
// During build environments (like Vercel) where env files are not fully populated,
// mock values are supplied to prevent the compiler from crashing during static analysis or builds.
const hasFirebaseConfig = !!(config.apiKey && config.projectId && config.appId);

if (!hasFirebaseConfig) {
  console.warn("Vite Firebase environment variables are missing! " +
               "Please define VITE_FIREBASE_API_KEY, VITE_FIREBASE_PROJECT_ID, " +
               "and VITE_FIREBASE_APP_ID in your configuration.");
}

const app = initializeApp({
  apiKey: config.apiKey || "mock-api-key-for-vercel-build",
  authDomain: config.authDomain || "mock-auth-domain-for-vercel-build",
  projectId: config.projectId || "mock-project-id-for-vercel-build",
  storageBucket: config.storageBucket || "mock-storage-bucket-for-vercel-build",
  messagingSenderId: config.messagingSenderId || "mock-sender-id-for-vercel-build",
  appId: config.appId || "mock-app-id-for-vercel-build",
});

// Connect to the default Firestore database
export const db = getFirestore(app);

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
  if (!hasFirebaseConfig) return;
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
