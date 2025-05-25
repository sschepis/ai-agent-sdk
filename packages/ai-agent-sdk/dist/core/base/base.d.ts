import "dotenv/config";
export declare const logger: import("pino").Logger<never, boolean>;
export type MODULE = "agent" | "llm" | "tools" | "server" | "zee";
export declare class Base {
    private logger;
    private module;
    constructor(module: MODULE);
    info(message: string, ...args: unknown[]): void;
}
//# sourceMappingURL=base.d.ts.map