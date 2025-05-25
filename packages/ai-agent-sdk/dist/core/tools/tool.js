"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tool = void 0;
const ai_1 = require("ai");
class Tool {
    constructor(params) {
        return (0, ai_1.tool)({
            id: `${params.provider}.${params.name}`,
            description: params.description,
            parameters: params.parameters,
            execute: params.execute,
        });
    }
}
exports.Tool = Tool;
//# sourceMappingURL=tool.js.map