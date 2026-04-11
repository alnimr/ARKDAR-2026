import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebaseConfig from './firebaseConfig.json';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Ensure session persistence (Skill: identity-management)
setPersistence(auth, browserLocalPersistence);

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
});
export const storage = getStorage(app);

/** 
 * ARKDAR Standard Session Schema 
 * Consistent with biomechanical analysis metrics.
 */
export interface ArenaSession {
  id?: string;
  userId: string;
  timestamp: number;
  sport: 'archery' | 'tentpegging' | 'general';
  metrics: {
    avgTrunkAngle: number;
    balanceScore: number;
    gaitDistribution: Record<string, number>;
    welfareAlerts: number;
  };
  summary: string;
  videoUrl?: string; // Future cloud storage integration
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  GET = 'get',
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  console.error(`ARKDAR Data Engine Error [${operationType}] at [${path}]:`, error);
  throw error;
}
