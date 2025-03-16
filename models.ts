import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { marked, type MarkedExtension } from "marked";
import { markedTerminal } from "marked-terminal";
import {
  ACTION_TYPES,
  CHAT_PROMPTS,
  LLM_PROVIDERS,
  TRANSLATION_PROMPTS,
  type ActionTypes,
  type LlmProviders,
} from "./constants";

marked.use(markedTerminal() as MarkedExtension);

export const ask = async (
  prompt: string,
  provider: LlmProviders,
  actionType: ActionTypes,
) => {
  const model = getModel(provider);
  const system = getActionSystemPrompts(actionType);

  const { text } = await generateText({
    model,
    prompt,
    system,
  });

  const parsedText = await marked.parse(text);
  console.log("\n", parsedText, "\n");
};

const getModel = (provider: LlmProviders) => {
  switch (provider) {
    case LLM_PROVIDERS.openAI:
      return openai("gpt-4o");

    case LLM_PROVIDERS.gemini:
      return google("gemini-2.0-flash-001");
  }
};

const getActionSystemPrompts = (actionType: ActionTypes) => {
  switch (actionType) {
    case ACTION_TYPES.question:
      return CHAT_PROMPTS;

    case ACTION_TYPES.translation:
      return TRANSLATION_PROMPTS;
  }
};
