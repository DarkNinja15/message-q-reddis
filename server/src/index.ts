import express from 'express';

import {createClient} from 'redis';

const app=express();

app.use(express.json());

app.post("/",async (req,res)=>{
    const problemId=req.body.problemId;
    const code=req.body.code;
    const language=req.body.language;


    try {
        await client.lPush("problems",JSON.stringify({code,language,problemId}));
        res.status(200).json({
            "message":"Submission recieved"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "error":error
        });
    }
});


const client = createClient();

async function startServer() {
    try {
        await client.connect();
        console.log("Connected to reddis");

        app.listen(8080,()=>{
            console.log("Server listening on port 8080");
        });
    } catch (error) {
        console.log(error);
    }
}

startServer();