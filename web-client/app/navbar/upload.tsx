'use client';

import {Fragment} from "react";
import { uploadFile } from "../firebase/functions";

import styles from './upload.module.css';


export default function Upload() {
    return (
        <Fragment>
            <input
                type="file"
                title="Upload a video"
                accept="video/*"
                className={styles.fileInput}
                onChange={async (e) => {
                    const file = e.target.files?.item(0);
                    if(file) await uploadFile(file);
                }}
            />
        </Fragment>
    );
}
