'use client';

import {Fragment} from "react";
import { uploadFile } from "../firebase/functions";

import styles from './upload.module.css';


export default function Upload() {

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.item(0);
        if(file) {
            handleUpload(file);
        }
    }

    const handleUpload = async (file: File) => {
        try {
            const response = await uploadFile(file);
            alert(`Video uploaded successfully! ${JSON.stringify(response)}`);
        } catch (error) {
            alert(`Error uploading video: ${error}`);
        }
    }

    return (
        <Fragment>
            <input id ="upload" type="file" accept="video/*" className={styles.inputnone}
            onChange={handleFileChange} />
            <label htmlFor="upload" className={styles.fileInput}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.1} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
</svg> 
            </label>
        </Fragment>
    );
}
