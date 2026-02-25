export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  try {

    // Slack body parsing (safe)
    const rawBody =
      typeof req.body === "string"
        ? req.body
        : new URLSearchParams(req.body).toString();

    const params = new URLSearchParams(rawBody);

    const question = params.get("text") || "hello";

    const channel = params.get("channel_id");

    console.log("Dispatching question:", question);

    const response = await fetch(
      "https://api.github.com/repos/kyra-1/thapar-task-hub/dispatches",
      {

        method: "POST",

        headers: {

          Authorization: `Bearer ${process.env.GH_TOKEN}`,

          Accept: "application/vnd.github+json",

          "X-GitHub-Api-Version": "2022-11-28",

          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          event_type: "claude_query",

          client_payload: {
            question,
            channel
          }

        })
      }
    );

    console.log("GitHub status:", response.status);

  } catch (err) {

    console.error("ERROR:", err);

  }

  return res.status(200).send("Claude is thinking...");
}
