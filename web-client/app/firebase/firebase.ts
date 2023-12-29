'use client';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUcfamWJYIMZP_2D0wKQICys8lM32Wi6c",
  authDomain: "vid-stream-71952.firebaseapp.com",
  projectId: "vid-stream-71952",
  appId: "1:165691965809:web:74af12c943c48225ba76d0",
  measurementId: "G-CY2LHS6VMT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

/**
 * Signs in the user with Google OAuth authentication.
 * Uses the Firebase signInWithPopup method with GoogleAuthProvider.
 */
export function signInWithGoogle() {
  return signInWithPopup(auth, new GoogleAuthProvider());
}

/**
 * Signs out the current user by calling Firebase auth.signOut().
 */
export function signOut() {
  return auth.signOut();
}

/**
 * Registers a listener callback that is called whenever
 * the authentication state changes (user signs in or out).
 *
 * @param callback - The callback to invoke when the auth state changes.
 * @returns The unsubscribe function for removing the listener.
 */
export function onAuthStateChangedListener(
  callback: (user: User | null) => void
) {
  return onAuthStateChanged(auth, callback);
}
