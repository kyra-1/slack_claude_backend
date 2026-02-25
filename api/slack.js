export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  // Slack sends urlencoded body
  const body = new URLSearchParams(req.body);

  const question = body.get("text");
  const channel = body.get("channel_id");

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
          channel
        }

      })
    }
  );

  return res.status(200).send("Claude is thinking...");
}
