import { type ModelProvider } from "../../llm";
import { BaseGoldRushTool } from "./goldrush";
import { z } from "zod";
declare const NFTBalancesSchema: z.ZodObject<{
    chain: z.ZodEnum<[string, ...string[]]>;
    address: z.ZodString;
}, "strip", z.ZodTypeAny, {
    chain: string;
    address: string;
}, {
    chain: string;
    address: string;
}>;
export declare class NFTBalancesTool extends BaseGoldRushTool<typeof NFTBalancesSchema> {
    constructor(provider: ModelProvider["provider"]);
}
export {};
//# sourceMappingURL=nft-balances.d.ts.map