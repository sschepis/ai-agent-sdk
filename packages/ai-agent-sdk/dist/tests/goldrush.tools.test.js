"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
require("dotenv/config");
const vitest_1 = require("vitest");
(0, vitest_1.describe)("@ai-agent-sdk/tools/goldrush", () => {
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
            (0, vitest_1.test)("token balances tool with an agent", async () => {
                const tools = {
                    tokenBalances: new __1.TokenBalancesTool(model.provider),
                };
                const agent = new __1.Agent({
                    name: "token balances agent",
                    model,
                    description: "You are a senior blockchain researcher analyzing wallet activities across different chains.",
                    instructions: [
                        "Summarize token holdings",
                        "Provide insights about the token holdings",
                    ],
                    tools,
                });
                const result = await agent.generate({
                    messages: [
                        (0, __1.userMessage)("What are the token balances for karanpargal.eth on eth-mainnet?"),
                    ],
                });
                console.log(result);
                (0, vitest_1.expect)(result.type).toBe("assistant");
                (0, vitest_1.expect)(result.value).toBeDefined();
            });
            (0, vitest_1.test)("token balances tool with an agent", async () => {
                const tools = {
                    transactions: new __1.TransactionsTool(model.provider),
                };
                const agent = new __1.Agent({
                    name: "token balances agent",
                    model,
                    description: "You are a senior blockchain researcher analyzing wallet activities across different chains.",
                    instructions: [
                        "Summarize transactions",
                        "Provide insights about the transactions",
                    ],
                    tools,
                });
                const result = await agent.generate({
                    messages: [
                        (0, __1.userMessage)("What are the transactions for karanpargal.eth on eth-mainnet?"),
                    ],
                });
                console.log(result);
                (0, vitest_1.expect)(result.type).toBe("assistant");
                (0, vitest_1.expect)(result.value).toBeDefined();
            });
            (0, vitest_1.test)("nft balances tool with an agent", async () => {
                const tools = {
                    nftBalances: new __1.NFTBalancesTool(model.provider),
                };
                const agent = new __1.Agent({
                    name: "nft balances agent",
                    model,
                    description: "You are a senior blockchain researcher analyzing wallet activities across different chains.",
                    instructions: [
                        "Summarize nft holdings",
                        "Provide insights about the nft holdings",
                    ],
                    tools,
                });
                const result = await agent.generate({
                    messages: [
                        (0, __1.userMessage)("What are the nft holdings for karanpargal.eth on eth-mainnet?"),
                    ],
                });
                console.log(result);
                (0, vitest_1.expect)(result.type).toBe("assistant");
                (0, vitest_1.expect)(result.value).toBeDefined();
            });
            (0, vitest_1.test)("nft balances tool with an agent", async () => {
                const tools = {
                    historicalTokenPrice: new __1.HistoricalTokenPriceTool(model.provider),
                };
                const agent = new __1.Agent({
                    name: "historical token price agent",
                    model,
                    description: "You are a senior blockchain researcher analyzing activities across different chains.",
                    instructions: [
                        "Summarize historical token prices",
                        "Provide insights about the historical token prices",
                    ],
                    tools,
                });
                const result = await agent.generate({
                    messages: [
                        (0, __1.userMessage)("What are the historical token prices for 0x7abc8a5768e6be61a6c693a6e4eacb5b60602c4d on eth-mainnet over the past week?"),
                    ],
                });
                console.log(result);
                (0, vitest_1.expect)(result.type).toBe("assistant");
                (0, vitest_1.expect)(result.value).toBeDefined();
            });
            (0, vitest_1.test)("multiple goldrush tools with an agent", async () => {
                const tools = {
                    tokenBalances: new __1.TokenBalancesTool(model.provider),
                    nftBalances: new __1.NFTBalancesTool(model.provider),
                    transactions: new __1.TransactionsTool(model.provider),
                };
                const agent = new __1.Agent({
                    name: "goldrush agent",
                    model,
                    description: "You are a senior blockchain researcher analyzing wallet activities across different chains.",
                    instructions: [
                        "Analyze wallet activities using the provided blockchain tools",
                        "Summarize token holdings, NFT collections, and recent transactions",
                        "Provide insights about the wallet's activity patterns",
                    ],
                    tools,
                });
                const result = await agent.generate({
                    messages: [
                        (0, __1.userMessage)("What is the activity of karanpargal.eth on eth-mainnet?"),
                    ],
                });
                console.log(result);
                (0, vitest_1.expect)(result.type).toBe("assistant");
                (0, vitest_1.expect)(result.value).toBeDefined();
            });
        });
    });
});
//# sourceMappingURL=goldrush.tools.test.js.map