import express from "express";
import Ffmpeg from "fluent-ffmpeg";

const app = express();
app.use(express.json());


app.post("/process-video",(req,res)=>{
    const infilePath = req.body.infilePath;
    const outfilePath = req.body.outfilePath;

    if(!infilePath || !outfilePath)
    {
        res.status(400).send("Bad request :  Path not found");
    }

    Ffmpeg(infilePath)
    .outputOption("-vf","scale=-1:360")
    .on("end",()=>{
        return res.status(200).send("processing completed");
    })
    .on ("error",(err)=>{
        console.log('an error occured :' + err.message);
        res.status(500).send("internal server error :" + err.message);
    })
    .save(outfilePath);
});

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("vid listening to port 3000 at http://localhost:"+port);
})

