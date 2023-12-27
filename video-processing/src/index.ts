import express from "express";
import Ffmpeg from "fluent-ffmpeg";
import { convertVideo, downloadRaw, uploadProcessed, setupDirectories, deleteRawVideo, deleteProcessedVideo} from "./storage";

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
    
    await Promise.all([
        await deleteRawVideo(inputFileName),
        await deleteProcessedVideo(outputFileName)
    ]);
    
    return res.status(200).send('processing successful');
});

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("vid listening to port 3000 at http://localhost:"+port);
})

