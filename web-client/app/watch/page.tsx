'use client'
import { useSearchParams } from "next/navigation"
import styles from './page.module.css'

export default function Watch() {
    const videoSrc = useSearchParams().get('v');
    const videoPrefix = 'https://storage.googleapis.com/mohsin-processed-video/';

    return (
        <div className={styles.videoBox}>
            <h1>View Page</h1>
            <video controls src={videoPrefix + videoSrc} />
        </div>
    )
}