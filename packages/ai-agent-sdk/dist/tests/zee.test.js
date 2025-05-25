"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const node_fetch_1 = __importDefault(require("node-fetch"));
const vitest_1 = require("vitest");
const zod_1 = require("zod");
(0, vitest_1.describe)("@ai-agent-sdk/zee", () => {
    const providers = [
        {
            provider: "openai",
            id: "gpt-4o-mini",
        },
        {
            provider: "anthropic",
            id: "claude-3-7-sonnet-20250219",
        },
    ];
    providers.forEach((model) => {
        (0, vitest_1.describe)(`${model.provider}::${model.id}`, () => {
            (0, vitest_1.test)("workflow with two agents", async () => {
                const screenplayWriter = new __1.Agent({
                    name: "screenplay writer",
                    description: "You are an expert screenplay writer",
                    instructions: [
                        "Write a script outline with 3-5 main characters and key plot points.",
                        "Outline the three-act structure and suggest 2-3 twists.",
                        "Ensure the script aligns with a genre and target audience.",
                    ],
                    model,
                });
                const producer = new __1.Agent({
                    name: "movie producer",
                    description: "Experienced movie producer",
                    instructions: [
                        "Based on the script outline, plan the cast and crew for the movie.",
                        "Summarize the budget for the movie.",
                        "Provide a synopsis of the movie.",
                    ],
                    model,
                });
                const zee = new __1.ZeeWorkflow({
                    goal: "Plan a scene-by-scene script for a movie that is 10 minutes long and has a happy ending. Create a scene-by-scene budget for the provided script. Suggest a cast and crew for the movie.",
                    agents: [screenplayWriter, producer],
                    model,
                    config: {
                        temperature: 1,
                    },
                });
                const result = await zee.run();
                console.log(result);
            });
            (0, vitest_1.test)("workflow with agent forced followup", async () => {
                const scriptWriter = new __1.Agent({
                    name: "script writer",
                    description: "You are an expert screenplay writer who creates detailed scripts and character descriptions.",
                    instructions: [
                        "Write a brief script outline with main plot points.",
                        "Only if you are providing the script, then start your script with 'COMPLETE:', else just provide desired response.",
                    ],
                    model,
                });
                const producer = new __1.Agent({
                    name: "movie producer",
                    description: "Experienced movie producer who needs specific character details for casting.",
                    instructions: [
                        "Review the script outline.",
                        "You MUST ask the script writer for detailed character descriptions before making casting decisions.",
                        "Once you have character details, provide casting suggestions and budget breakdown.",
                        "Use 'FOLLOWUP:' to ask for character details.",
                        "Start your final plan with 'COMPLETE:'",
                    ],
                    model,
                });
                const zee = new __1.ZeeWorkflow({
                    goal: "Create a 10-minute movie script with matching cast and $500,000 budget breakdown.",
                    agents: [scriptWriter, producer],
                    model,
                });
                const result = await zee.run();
                console.log(result);
            });
            (0, vitest_1.test)("workflow with custom tools", async () => {
                const weatherAgent = new __1.Agent({
                    name: "weather agent",
                    model,
                    description: "You provided weather information for a location.",
                    instructions: [
                        "Call the weather tool to get the current weather information for a location.",
                    ],
                    tools: {
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
                    },
                });
                const analystAgent = new __1.Agent({
                    name: "analyst agent",
                    model,
                    description: "You are an analyst that analyzes weather information.",
                    instructions: [
                        "Analyze and summarize the weather information provided.",
                    ],
                });
                const zee = new __1.ZeeWorkflow({
                    goal: "What's the weather in Delhi? Elaborate on the weather.",
                    agents: [weatherAgent, analystAgent],
                    model,
                });
                const result = await zee.run();
                console.log(result);
            });
            (0, vitest_1.test)("workflow with goldrush tools", async () => {
                const nftBalancesAgent = new __1.Agent({
                    name: "nft balances agent",
                    model,
                    description: "You are provide NFT balances for a wallet address for a chain.",
                    instructions: ["Provide the nft holdings"],
                    tools: {
                        nftBalances: new __1.NFTBalancesTool(model.provider),
                    },
                });
                const tokenBalancesAgent = new __1.Agent({
                    name: "token balances agent",
                    model,
                    description: "You are provide token balances for a wallet address for a chain.",
                    instructions: ["Provide the token holdings"],
                    tools: {
                        tokenBalances: new __1.TokenBalancesTool(model.provider),
                    },
                });
                const analystAgent = new __1.Agent({
                    name: "analyst agent",
                    model,
                    description: "You are an expert blockchain analyst that analyzes wallet activities across different chains.",
                    instructions: [
                        "Analyze and summarize the wallet balances.",
                    ],
                });
                const zee = new __1.ZeeWorkflow({
                    goal: "Whats are the NFT and Token balances of the wallet address 'karanpargal.eth' on the chain 'eth-mainnet'? Elaborate on the balances.",
                    agents: [
                        nftBalancesAgent,
                        tokenBalancesAgent,
                        analystAgent,
                    ],
                    model,
                });
                const result = await zee.run();
                console.log(result);
            });
            (0, vitest_1.test)("exceeding max iterations", async () => {
                const strategist = new __1.Agent({
                    name: "campaign strategist",
                    description: "You are an experienced political campaign strategist who specializes in message development and voter outreach strategies.",
                    instructions: [
                        "Analyze the campaign goal and develop key messaging points.",
                        "Identify target voter demographics.",
                        "Propose specific outreach strategies.",
                    ],
                    model,
                });
                const mediaManager = new __1.Agent({
                    name: "media manager",
                    description: "You are a media and communications expert who transforms campaign strategies into actionable media plans.",
                    instructions: [
                        "Review the campaign strategy.",
                        "Create a detailed media plan including social media, traditional media, and advertising.",
                        "Suggest content themes and timing for different platforms.",
                    ],
                    model,
                });
                const budgetManager = new __1.Agent({
                    name: "budget manager",
                    description: "You are a budget manager who manages the campaign budget.",
                    instructions: [
                        "Review the campaign strategy.",
                        "Create a detailed budget plan for the campaign",
                        "Suggest content themes and timing for different platforms.",
                    ],
                    model,
                });
                const zee = new __1.ZeeWorkflow({
                    goal: "Develop a 30-day local political campaign strategy focusing on environmental policies and community engagement. Include both traditional and digital media approaches. Summarize a budget for the provided campaign strategy.",
                    agents: [strategist, mediaManager, budgetManager],
                    model,
                    config: {
                        maxIterations: 5,
                    },
                });
                const result = await zee.run();
                console.log(result);
            });
            (0, vitest_1.test)("workflow with image messages", async () => {
                const imageAnalyser = new __1.Agent({
                    name: "image analyser",
                    description: "You are an expert image analyser",
                    instructions: [
                        "Analyze the image and provide a detailed description of the image.",
                    ],
                    model,
                });
                const zee = new __1.ZeeWorkflow({
                    goal: "Analyze the image at https://drive.usercontent.google.com/download?id=1NwUfXIVOus3mPz8EA0UIib3ZxM6hNIjx and provide a detailed analysis of what it depicts.",
                    agents: [imageAnalyser],
                    model,
                    config: {
                        temperature: 1,
                    },
                });
                const result = await zee.run();
                console.log(result);
            });
        });
    });
});
//# sourceMappingURL=zee.test.js.map