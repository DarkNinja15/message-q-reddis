import {createClient} from 'redis';

const client=createClient();


async function connectReddisServer() {
    try {
        await client.connect();
        while(1){
            const response = await client.brPop("problems",0);
            console.log(response);
            await new Promise((resolve)=>setTimeout(resolve,1000));

            // send it to pub sub
            console.log("Processed users submission");
        }
    } catch (error) {
        console.log(error);   
    }
}

connectReddisServer();