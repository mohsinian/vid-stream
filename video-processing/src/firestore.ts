import {credential} from "firebase-admin";
import {initializeApp} from "firebase-admin/app";
import { Firestore } from "firebase-admin/firestore";

initializeApp({credential: credential.applicationDefault()});

const firestore = new Firestore();

const videoCollection = 'videos';

export interface Video {
    id?: string,
    uid?: string,
    filename?: string,
    status?: 'processing' | 'processed',
    title?: string,
    description?: string,
}

async function getVideo(videoId: string): Promise<Video> {
    const videoDoc = await firestore.collection(videoCollection).doc(videoId).get();
    return (videoDoc.data() as Video)??{};
}

export async function setVideo(videoId:string, video: Video) {
    return firestore
    .collection(videoCollection)
    .doc(videoId)
    .set(video, {merge: true});
}

export async function isVideoNew(videoId: string): Promise<boolean> {
    const video = await getVideo(videoId);
    return video?.status === undefined;
}