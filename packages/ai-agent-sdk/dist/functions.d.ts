import type { UserContentAttachments } from "./core/llm/llm.types";
import type { AssistantContent, CoreAssistantMessage, CoreSystemMessage, CoreUserMessage } from "ai";
export declare const userMessage: (content: string | UserContentAttachments) => CoreUserMessage;
export declare const assistantMessage: (content: AssistantContent) => CoreAssistantMessage;
export declare const systemMessage: (content: string) => CoreSystemMessage;
//# sourceMappingURL=functions.d.ts.map