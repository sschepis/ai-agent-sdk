import { type ModelProvider } from "../../llm";
import { BaseGoldRushTool } from "./goldrush";
import { z } from "zod";
declare const TokenBalancesSchema: z.ZodObject<{
    chain: z.ZodEnum<[string, ...string[]]>;
    address: z.ZodString;
}, "strip", z.ZodTypeAny, {
    chain: string;
    address: string;
}, {
    chain: string;
    address: string;
}>;
export declare class TokenBalancesTool extends BaseGoldRushTool<typeof TokenBalancesSchema> {
    constructor(provider: ModelProvider["provider"]);
}
export {};
//# sourceMappingURL=token-balances.d.ts.map