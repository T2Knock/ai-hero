import type { CoreMessage, CoreUserMessage } from "ai";
import chalk from "chalk";
import prompts from "prompts";
import { ACTION_TYPES, LLM_PROVIDERS } from "./constants";
import { ask } from "./models";

const questions: Array<prompts.PromptObject> = [
  {
    type: "select",
    name: "type",
    message: "Pick prompts action",
    choices: [
      { title: "Translate to vietnamese", value: ACTION_TYPES.translation },
      { title: "Chat with the wise one", value: ACTION_TYPES.question },
    ],
    validate: (type) =>
      !Object.values(ACTION_TYPES).includes(type)
        ? "Pick a valid action pls!!"
        : true,
  },
  {
    type: "select",
    name: "provider",
    message: "Pick llm provider",
    choices: [
      { title: "Open AI", value: LLM_PROVIDERS.openAI },
      { title: "Google Gemini", value: LLM_PROVIDERS.gemini },
    ],
    validate: (provider) =>
      !Object.values(LLM_PROVIDERS).includes(provider)
        ? "Pick a valid provider pls!!"
        : true,
  },
];

const { type, provider } = await prompts(questions);

const info = chalk.greenBright(`✨ Press Ctrl + C to terminate the repl`);
const messages: CoreMessage[] = [];
console.log(info, "\n");

while (true) {
  const { prompt } = await prompts({
    type: "text",
    name: "prompt",
    message: "Prompt: ",
    validate: (prompt) =>
      typeof prompt == "string"
        ? true
        : "That not a prompts dude ! Try again maybe",
  });
  if (!prompt) break;

  const userMessage: CoreUserMessage = {
    role: "user",
    content: prompt,
  };
  messages.push(userMessage);

  const responseMessages = await ask(messages, provider, type);
  messages.push(...responseMessages);
}
