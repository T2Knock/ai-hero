import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { chatPrompts } from "./prompts";

const model = google("gemini-2.0-flash-001");

export const answerMyQuestion = async (prompt: string) => {
  const { textStream } = streamText({
    model,
    prompt,
    system: chatPrompts,
  });

  for await (const textPart of textStream) {
    console.log(textPart);
  }
};

await answerMyQuestion(
  `Bro when the heck did is the vietname war end and how ? 

 ✨ My homies we are cooking let's go !! time to make war happen again WW3 is comming`,
);
