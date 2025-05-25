"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const node_fetch_1 = __importDefault(require("node-fetch"));
const vitest_1 = require("vitest");
const zod_1 = require("zod");
(0, vitest_1.describe)("@ai-agent-sdk/agent", () => {
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
            (0, vitest_1.test)("default agent flow", async () => {
                const agent = new __1.Agent({
                    name: "research agent",
                    model: model,
                    description: "You are a senior New York Times researcher writing an article on a topic.",
                    instructions: [
                        "For a given topic, search for the top 5 links.",
                        "Then read each URL and extract the article text, if a URL isn't available, ignore it.",
                        "Analyze and prepare an New York Times worthy article based on the information.",
                    ],
                });
                const result = await agent.generate({
                    messages: [(0, __1.userMessage)("Future of AI")],
                });
                console.log(result);
                (0, vitest_1.expect)(result.type).toBe("assistant");
                (0, vitest_1.expect)(result.value).toBeDefined();
            });
            (0, vitest_1.test)("agent with custom tool", async () => {
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
                const agent = new __1.Agent({
                    name: "weather agent",
                    model,
                    description: "You are a senior weather analyst writing a summary on the current weather for the provided location.",
                    instructions: [
                        "Use the weather tool to get the current weather in Celsius.",
                        "Elaborate on the weather.",
                    ],
                    tools,
                });
                const result = await agent.generate({
                    messages: [(0, __1.userMessage)("What is the weather in Delhi?")],
                });
                console.log(result);
                (0, vitest_1.expect)(result.type).toBe("assistant");
                (0, vitest_1.expect)(result.value).toBeDefined();
            });
        });
    });
});
//# sourceMappingURL=agent.test.js.map