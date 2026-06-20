import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously as fbSignInAnonymously } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { Rsvp, Blessing, Photo } from './types';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth();

// Sign-In Anonymously helper (disabled as anonymous auth is not required)
export async function signInGuestAnonymously() {
  // Skipping anonymous authentication
}

// Error handling structures as mandated by Firebase integration skill
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
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
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error Detailed: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Firebase CRUD Operations
export async function submitRsvp(rsvp: Omit<Rsvp, 'id'>) {
  const path = 'rsvps';
  try {
    // Ensure user is signed in anonymously at least
    await signInGuestAnonymously();
    const docRef = await addDoc(collection(db, path), {
      ...rsvp,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function submitBlessing(blessing: Omit<Blessing, 'id'>) {
  const path = 'blessings';
  try {
    await signInGuestAnonymously();
    const docRef = await addDoc(collection(db, path), {
      ...blessing,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function submitPhoto(photo: Omit<Photo, 'id'>) {
  const path = 'photos';
  try {
    await signInGuestAnonymously();
    const docRef = await addDoc(collection(db, path), {
      ...photo,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// Listen to Blessings in Real-Time
export function listenToBlessings(callback: (blessings: Blessing[]) => void) {
  const path = 'blessings';
  const q = query(collection(db, path), orderBy('createdAt', 'desc'), limit(50));
  
  return onSnapshot(q, (snapshot) => {
    const list: Blessing[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data() as Omit<Blessing, 'id'>;
      list.push({ ...data, id: doc.id });
    });
    callback(list);
  }, (error) => {
    console.error('Firestore Blessings listen error:', error);
    callback([]); // Let default/seed blessings show gracefully
  });
}

// Listen to Photos in Real-Time
export function listenToPhotos(callback: (photos: Photo[]) => void) {
  const path = 'photos';
  const q = query(collection(db, path), orderBy('createdAt', 'desc'), limit(50));
  
  return onSnapshot(q, (snapshot) => {
    const list: Photo[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data() as Omit<Photo, 'id'>;
      list.push({ ...data, id: doc.id });
    });
    callback(list);
  }, (error) => {
    console.error('Firestore Photos listen error:', error);
    callback([]); // Let default/seed photos show gracefully
  });
}
