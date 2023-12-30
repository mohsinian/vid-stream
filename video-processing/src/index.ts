import express from "express";
import Ffmpeg from "fluent-ffmpeg";
import { convertVideo, downloadRaw, uploadProcessed, setupDirectories, deleteRawVideo, deleteProcessedVideo} from "./storage";
import { isVideoNew, setVideo } from "./firestore";

setupDirectories();

const app = express();
app.use(express.json());


app.post("/process-video",async(req,res)=>{
    let data;
    try{
        const message = Buffer.from(req.body.message.data, 'base64').toString('utf-8');
        data = JSON.parse(message);
        if(!data.name){
            throw new Error("invalid payload");
        }
    } catch(error) {
        console.error(error);
        return res.status(400).send('bad request filename missing');
    }
    const inputFileName = data.name;
    const outputFileName = `processed-${inputFileName}`;
    const videoId = inputFileName.split('.')[0];

    if(!isVideoNew(videoId))
    {
        return res.status(400).send('video already processed or processing');
    }
    else {
        await setVideo(videoId,{
            id: videoId,
            status: 'processing',
            uid: videoId.split('-')[0]

        })
    }
    await downloadRaw(inputFileName);
    try {
        await convertVideo(inputFileName, outputFileName);}
    catch {
            await Promise.all([
                deleteRawVideo(inputFileName),
                deleteProcessedVideo(outputFileName)
            ]);
            return res.status(500).send('processing failed');
        }
    await uploadProcessed(outputFileName);
    
    await setVideo(videoId,{
        status: 'processed',
        filename: outputFileName
    });

    await Promise.all([
        await deleteRawVideo(inputFileName),
        await deleteProcessedVideo(outputFileName)
    ]);
    
    return res.status(200).send('processing successful');
});

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`vid listening to http://localhost:${port}`);
})

