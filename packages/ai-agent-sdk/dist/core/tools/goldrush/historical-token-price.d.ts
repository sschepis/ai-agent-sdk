import { type ModelProvider } from "../../llm";
import { BaseGoldRushTool } from "./goldrush";
import { z } from "zod";
declare const HistoricalTokenPriceSchema: z.ZodObject<{
    chain: z.ZodEnum<[string, ...string[]]>;
    contractAddress: z.ZodString;
    timeframe: z.ZodEnum<["1h", "24h", "7d", "30d"]>;
}, "strip", z.ZodTypeAny, {
    chain: string;
    contractAddress: string;
    timeframe: "1h" | "24h" | "7d" | "30d";
}, {
    chain: string;
    contractAddress: string;
    timeframe: "1h" | "24h" | "7d" | "30d";
}>;
export declare class HistoricalTokenPriceTool extends BaseGoldRushTool<typeof HistoricalTokenPriceSchema> {
    constructor(provider: ModelProvider["provider"]);
}
export {};
//# sourceMappingURL=historical-token-price.d.ts.map