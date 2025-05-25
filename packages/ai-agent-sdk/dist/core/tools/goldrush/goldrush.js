"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseGoldRushTool = void 0;
const tool_1 = require("../tool");
const client_sdk_1 = require("@covalenthq/client-sdk");
class BaseGoldRushTool extends tool_1.Tool {
    client;
    constructor(params) {
        if (!process.env["GOLDRUSH_API_KEY"]) {
            throw new Error("GOLDRUSH_API_KEY is not set in the env");
        }
        super({
            provider: params.provider,
            name: params.name,
            description: params.description,
            parameters: params.parameters,
            execute: params.execute,
        });
        this.client = new client_sdk_1.GoldRushClient(process.env["GOLDRUSH_API_KEY"]);
    }
    static bigIntSerializer(data) {
        return JSON.parse(JSON.stringify(data, (_key, value) => {
            if (typeof value === "bigint") {
                return value.toString();
            }
            return value;
        }));
    }
}
exports.BaseGoldRushTool = BaseGoldRushTool;
//# sourceMappingURL=goldrush.js.map