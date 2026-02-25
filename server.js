import express from "express";
import fetch from "node-fetch";

const app = express();

app.use(express.urlencoded({extended:true}));

app.post("/slack", async(req,res)=>{

  const question=req.body.text;

  await fetch(
    "https://api.github.com/repos/kyra-1/thapar-task-hub/dispatches",
    {
      method:"POST",

      headers:{
        Authorization:`Bearer ${process.env.GH_TOKEN}`,
        Accept:"application/vnd.github+json"
      },

      body:JSON.stringify({

        event_type:"claude_query",

        client_payload:{
          question,
          channel:req.body.channel_id
        }

      })

    });

  res.send("Claude is thinking...");
});

app.listen(3008);