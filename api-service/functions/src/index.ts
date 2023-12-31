import {onCall} from "firebase-functions/v2/https";
import * as functions from "firebase-functions";
import {initializeApp} from "firebase-admin/app";
import {Firestore} from "firebase-admin/firestore";
import * as logger from "firebase-functions/logger";
import {Storage} from "@google-cloud/storage";

const storage = new Storage();
initializeApp();
const firestore = new Firestore();
const rawVideoBucket = "mohsin-raw-video";
const videoCollection = "videos";

export interface Video {
    id?: string,
    uid?: string,
    filename?: string,
    status?: "processing" | "processed",
    title?: string,
    description?: string,
}

export const createUser = functions.auth.user().onCreate((user) => {
  const userInfo = {
    uid: user.uid,
    email: user.email,
    photoURL: user.photoURL,
    displayName: user.displayName,
  };
  firestore.collection("users").doc(user.uid).set(userInfo);
  logger.info(`User created: ${JSON.stringify(userInfo)}`);
  return;
});

export const generateUploadUrl = onCall(
  {maxInstances: 1},
  async (request) => {
    if (!request.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated to upload video"
      );
    }

    const auth = request.auth;
    const data = request.data;
    const bucket = storage.bucket(rawVideoBucket);

    const filename = `${auth.uid}-${Date.now()}.${data.fileExtension}`;
    const [url] = await bucket.file(filename).getSignedUrl({
      action: "write",
      expires: Date.now() + 2 * 60 * 1000,
      version: "v4",
    });
    return {url, filename};
  }
);

export const getVideos = onCall({maxInstances: 1}, async () => {
  const snapshot = await firestore.collection(videoCollection).
    limit(10).get();
  return snapshot.docs.map((doc) => doc.data());
});

