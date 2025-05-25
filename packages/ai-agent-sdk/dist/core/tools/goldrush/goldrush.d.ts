import { Tool } from "../tool";
import { type ToolParams } from "../tool.types";
import { GoldRushClient } from "@covalenthq/client-sdk";
import type { AnyZodObject } from "zod";
export declare abstract class BaseGoldRushTool<ZOD_OBJECT extends AnyZodObject> extends Tool<ZOD_OBJECT> {
    protected client: GoldRushClient;
    constructor(params: ToolParams<ZOD_OBJECT>);
    static bigIntSerializer(data: object | object[]): any;
}
//# sourceMappingURL=goldrush.d.ts.map