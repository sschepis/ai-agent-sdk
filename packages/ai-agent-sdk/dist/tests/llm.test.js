"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const node_fetch_1 = __importDefault(require("node-fetch"));
const vitest_1 = require("vitest");
const zod_1 = require("zod");
(0, vitest_1.describe)("@ai-agent-sdk/llm", () => {
    const providers = [
        {
            provider: "openai",
            id: "gpt-4o-mini",
        },
        {
            provider: "google",
            id: "gemini-2.5-flash-preview-05-20",
        },
        {
            provider: "anthropic",
            id: "claude-3-7-sonnet-20250219",
        },
    ];
    providers.forEach((model) => {
        (0, vitest_1.describe)(`${model.provider}::${model.id}`, () => {
            const llm = new __1.LLM(model);
            (0, vitest_1.test)("structured output", async () => {
                const schema = zod_1.z.object({
                    answer: zod_1.z.string(),
                    explanation: zod_1.z.string(),
                });
                const result = await llm.generate({
                    prompt: "What is 5 plus 7?",
                    schema,
                });
                console.log(result);
                if (typeof result.value !== "object") {
                    throw new Error("Expected structured output");
                }
                (0, vitest_1.expect)(result.type).toBe("assistant");
                (0, vitest_1.expect)(result.value["answer"]).toBeDefined();
                (0, vitest_1.expect)(result.value["explanation"]).toBeDefined();
            });
            (0, vitest_1.test)("tool calling", async () => {
                const tools = {
                    weather: new __1.Tool({
                        provider: model.provider,
                        name: "weather",
                        description: "Fetch the current weather in a location",
                        parameters: zod_1.z.object({
                            location: zod_1.z.string(),
                        }),
                        execute: async ({ location }) => {
                            const response = await (0, node_fetch_1.default)(`https://api.weatherapi.com/v1/current.json?q=${location}&key=88f97127772c41a991095603230604`);
                            const data = await response.json();
                            return data;
                        },
                    }),
                };
                const result = await llm.generate({
                    prompt: "What is the weather in San Francisco?",
                    tools,
                });
                console.log(result);
                (0, vitest_1.expect)(result.type).toBe("assistant");
                (0, vitest_1.expect)(result.value).toBeDefined();
            });
            (0, vitest_1.test)("multimodal image url input", async () => {
                const schema = zod_1.z.object({
                    description: zod_1.z.string(),
                    colors: zod_1.z.array(zod_1.z.string()),
                    text_content: zod_1.z.string().optional(),
                    improvements: zod_1.z.string().optional(),
                });
                const result = await llm.generate({
                    messages: [
                        (0, __1.userMessage)("What's in this image? Suggest Improvements to the logo as well"),
                        (0, __1.userMessage)([
                            {
                                type: "image",
                                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png",
                            },
                        ]),
                    ],
                    schema,
                });
                console.log(result);
                (0, vitest_1.expect)(result.type).toBe("assistant");
                (0, vitest_1.expect)(result.value).toBeDefined();
            });
            (0, vitest_1.test)("multimodal image base64 input", async () => {
                const schema = zod_1.z.object({
                    description: zod_1.z.string(),
                    colors: zod_1.z.array(zod_1.z.string()),
                    text_content: zod_1.z.string().optional(),
                });
                const base64Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
                const result = await llm.generate({
                    messages: [
                        (0, __1.userMessage)("What's in this image?"),
                        (0, __1.userMessage)([
                            {
                                type: "image",
                                image: base64Image,
                            },
                        ]),
                    ],
                    schema,
                });
                console.log(result);
                (0, vitest_1.expect)(result.type).toBe("assistant");
                (0, vitest_1.expect)(result.value).toBeDefined();
            });
        });
    });
});
//# sourceMappingURL=llm.test.js.map