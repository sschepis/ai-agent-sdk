import type { ToolSet } from "../tools";
import type { FilePart, generateObject, generateText, ImagePart } from "ai";
import type { AnyZodObject, z } from "zod";


export type DeepSeekModelId =
    | "deepseek-chat"
    | "deepseek-reasoner";
export interface DeepSeekModelProvider {
    provider: "deepseek";
    id: DeepSeekModelId;
}

export type OpenAIModelId =
    | "gpt-4o"
    | "gpt-4o-mini"
    | "gpt-4o-2024-05-13"
    | "gpt-4o-2024-08-06"
    | "gpt-4o-2024-11-20"
    | "gpt-4o-audio-preview"
    | "gpt-4o-audio-preview-2024-10-01"
    | "gpt-4o-audio-preview-2024-12-17"
    | "gpt-4o-mini-2024-07-18"
    | "gpt-4-turbo"
    | "gpt-4-turbo-2024-04-09"
    | "gpt-4-turbo-preview"
    | "gpt-4-0125-preview"
    | "gpt-4-1106-preview"
    | "gpt-4"
    | "gpt-4-0613"
    | "gpt-3.5-turbo-0125"
    | "gpt-3.5-turbo"
    | "gpt-3.5-turbo-1106";
export interface OpenAIModelProvider {
    provider: "openai";
    id: OpenAIModelId;
}

export type AnthropicModelId =
    | "claude-4-sonnet-20250514:thinking"
    | "claude-4-sonnet-20250514"
    | "claude-4-opus-20250514:thinking"
    | "claude-4-opus-20250514"
    | "claude-3-7-sonnet-20250219:thinking"
    | "claude-3-7-sonnet-20250219";
export interface AnthropicModelProvider {
    provider: "anthropic";
    id: AnthropicModelId;
}

export type GoogleModelId =
    | "gemini-2.5-flash-preview-05-20"
    | "gemini-2.5-flash-preview-05-20:thinking"
    | "gemini-2.5-pro-preview-05-06";
export interface GoogleModelProvider {
    provider: "google";
    id: GoogleModelId;
}

export type ModelProvider =
    | OpenAIModelProvider
    | DeepSeekModelProvider
    | AnthropicModelProvider
    | GoogleModelProvider;

export type GenerateTextParams = Omit<
    Parameters<typeof generateText>[0],
    "model" | "tools"
> & {
    tools?: ToolSet;
};

export type GenerateObjectParams = Omit<
    Parameters<typeof generateObject>[0],
    "model" | "schema" | "tools" | "toolChoice" | "output" | "mode"
> & {
    schema: AnyZodObject;
};

export type LLMParameters = GenerateTextParams | GenerateObjectParams;

export interface LLMStructuredResponse<T extends AnyZodObject> {
    type: "assistant";
    value: z.infer<T>;
}

export interface LLMTextResponse {
    type: "assistant";
    value: string;
}

export type LLMResponse<T extends AnyZodObject> =
    | LLMStructuredResponse<T>
    | LLMTextResponse;

export type UserContentAttachments = Array<ImagePart | FilePart>;
