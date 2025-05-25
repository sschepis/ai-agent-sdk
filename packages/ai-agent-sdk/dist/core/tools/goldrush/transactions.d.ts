import { type ModelProvider } from "../../llm";
import { BaseGoldRushTool } from "./goldrush";
import { z } from "zod";
declare const TransactionsSchema: z.ZodObject<{
    chain: z.ZodEnum<[string, ...string[]]>;
    address: z.ZodString;
}, "strip", z.ZodTypeAny, {
    chain: string;
    address: string;
}, {
    chain: string;
    address: string;
}>;
export declare class TransactionsTool extends BaseGoldRushTool<typeof TransactionsSchema> {
    constructor(provider: ModelProvider["provider"]);
}
export {};
//# sourceMappingURL=transactions.d.ts.map