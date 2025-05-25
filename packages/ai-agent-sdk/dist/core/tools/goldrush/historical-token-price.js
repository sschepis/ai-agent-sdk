"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoricalTokenPriceTool = void 0;
const goldrush_1 = require("./goldrush");
const client_sdk_1 = require("@covalenthq/client-sdk");
const zod_1 = require("zod");
const HistoricalTokenPriceSchema = zod_1.z.object({
    chain: zod_1.z.enum(Object.values(client_sdk_1.ChainName)),
    contractAddress: zod_1.z.string(),
    timeframe: zod_1.z.enum(["1h", "24h", "7d", "30d"]),
});
class HistoricalTokenPriceTool extends goldrush_1.BaseGoldRushTool {
    constructor(provider) {
        super({
            provider,
            name: "historical-token-price",
            description: "Fetch historical token prices for a specific token on a blockchain",
            parameters: HistoricalTokenPriceSchema,
            execute: async ({ chain, contractAddress, timeframe }) => {
                let from = null;
                const formatDate = (date) => {
                    return date.toISOString().split("T")[0];
                };
                switch (timeframe) {
                    case "1h":
                        from = formatDate(new Date(Date.now() - 1000 * 60 * 60));
                        break;
                    case "24h":
                        from = formatDate(new Date(Date.now() - 1000 * 60 * 60 * 24));
                        break;
                    case "7d":
                        from = formatDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 7));
                        break;
                    case "30d":
                        from = formatDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 30));
                        break;
                }
                const prices = await this.client.PricingService.getTokenPrices(chain, "USD", contractAddress, {
                    from: from,
                    to: formatDate(new Date(Date.now())),
                });
                if (prices.error) {
                    throw new Error(prices.error_message);
                }
                return goldrush_1.BaseGoldRushTool.bigIntSerializer(prices.data ?? []);
            },
        });
    }
}
exports.HistoricalTokenPriceTool = HistoricalTokenPriceTool;
//# sourceMappingURL=historical-token-price.js.map