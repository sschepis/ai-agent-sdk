"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenBalancesTool = void 0;
const goldrush_1 = require("./goldrush");
const client_sdk_1 = require("@covalenthq/client-sdk");
const zod_1 = require("zod");
const TokenBalancesSchema = zod_1.z.object({
    chain: zod_1.z.enum(Object.values(client_sdk_1.ChainName)),
    address: zod_1.z.string(),
});
class TokenBalancesTool extends goldrush_1.BaseGoldRushTool {
    constructor(provider) {
        super({
            provider,
            name: "token-balances",
            description: "Fetch token balances for a wallet address on a specific blockchain",
            parameters: TokenBalancesSchema,
            execute: async ({ address, chain }) => {
                const balances = await this.client.BalanceService.getTokenBalancesForWalletAddress(chain, address);
                if (balances.error) {
                    throw new Error(balances.error_message);
                }
                return goldrush_1.BaseGoldRushTool.bigIntSerializer(balances.data.items ?? []);
            },
        });
    }
}
exports.TokenBalancesTool = TokenBalancesTool;
//# sourceMappingURL=token-balances.js.map