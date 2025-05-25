"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsTool = void 0;
const goldrush_1 = require("./goldrush");
const client_sdk_1 = require("@covalenthq/client-sdk");
const zod_1 = require("zod");
const TransactionsSchema = zod_1.z.object({
    chain: zod_1.z.enum(Object.values(client_sdk_1.ChainName)),
    address: zod_1.z.string(),
});
class TransactionsTool extends goldrush_1.BaseGoldRushTool {
    constructor(provider) {
        super({
            provider,
            name: "transactions",
            description: "Fetch transactions for a wallet address on a specific blockchain",
            parameters: TransactionsSchema,
            execute: async ({ address, chain }) => {
                const txs = await this.client.TransactionService.getAllTransactionsForAddressByPage(chain, address, {
                    noLogs: true,
                });
                if (txs.error) {
                    throw new Error(txs.error_message);
                }
                return goldrush_1.BaseGoldRushTool.bigIntSerializer(txs.data.items ?? []);
            },
        });
    }
}
exports.TransactionsTool = TransactionsTool;
//# sourceMappingURL=transactions.js.map