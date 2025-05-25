"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFTBalancesTool = void 0;
const goldrush_1 = require("./goldrush");
const client_sdk_1 = require("@covalenthq/client-sdk");
const zod_1 = require("zod");
const NFTBalancesSchema = zod_1.z.object({
    chain: zod_1.z.enum(Object.values(client_sdk_1.ChainName)),
    address: zod_1.z.string(),
});
class NFTBalancesTool extends goldrush_1.BaseGoldRushTool {
    constructor(provider) {
        super({
            provider,
            name: "nft-balances",
            description: "Fetch NFT balances for a wallet address on a specific blockchain",
            parameters: NFTBalancesSchema,
            execute: async ({ address, chain }) => {
                const nfts = await this.client.NftService.getNftsForAddress(chain, address);
                if (nfts.error) {
                    throw new Error(nfts.error_message);
                }
                return goldrush_1.BaseGoldRushTool.bigIntSerializer(nfts.data.items ?? []);
            },
        });
    }
}
exports.NFTBalancesTool = NFTBalancesTool;
//# sourceMappingURL=nft-balances.js.map