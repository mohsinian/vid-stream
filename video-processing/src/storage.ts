import { Storage } from "@google-cloud/storage";
import fs from "fs";
import Ffmpeg from "fluent-ffmpeg";

const storage = new Storage();

const rawVideoBucket = "mohsin-raw-video";
const processedVideoBucket = "mohsin-processed-video";

const localRawVideoPath = "./raw-video";
const localProcessedVideoPath = "./processed-video";

export function setupDirectories() {
    makeSureDirectoryExists(localRawVideoPath);
    makeSureDirectoryExists(localProcessedVideoPath);
}

export function convertVideo(rawVideoBucket:string,processedVideoBucket:string) {

    return new Promise<void> ((res,rej)=> {
        Ffmpeg(`${localRawVideoPath}/${rawVideoBucket}`)
    .outputOption("-vf","scale=-1:360")
    .on("end",()=>{
        console.log("processing completed");
        res();
    })
    .on ("error",(err)=>{
        console.log('an error occured :' + err.message);
        rej(err);
    })
    .save(`${localProcessedVideoPath}/${processedVideoBucket}`);
    })
}

export async function downloadRaw(filename:string) {
    await storage.bucket(rawVideoBucket)
    .file(filename)
    .download({destination:`${localRawVideoPath}/${filename}`});

    console.log(`gs://${rawVideoBucket}/${filename} downloaded to ${localRawVideoPath}/${filename}`);
}

export async function uploadProcessed(filename:string) {
    const bucket = storage.bucket(processedVideoBucket);

    await bucket.upload(`${localProcessedVideoPath}/${filename}`,{
        destination: filename
    });

    console.log(`${localProcessedVideoPath}/${filename} uploaded to gs://${processedVideoBucket}/${filename}`);

    await bucket.file(filename).makePublic();

}

export function deleteRawVideo(filename:string) {
    return deleteFile(`${localRawVideoPath}/${filename}`);
}

export function deleteProcessedVideo(filename:string) {
    return deleteFile(`${localProcessedVideoPath}/${filename}`);
}


function deleteFile(filepath:string):Promise<void>
{
    return new Promise((res,rej)=>{
        if(fs.existsSync(filepath)){
            fs.unlink(filepath, err => {
              if(err) 
              {
                console.log(`failed to delete file ${filepath}`,err);
                rej(err);
              }
              else {
                console.log(`file ${filepath} deleted successfully`);
                res();
              }
            })
        }
        else{
            console.log(`file ${filepath} does not exist`);
            res();
        }
    })
}

function makeSureDirectoryExists(directoryPath: string) {
    if(!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, {recursive: true});
        console.log(`Directory ${directoryPath} created`);
    }
}