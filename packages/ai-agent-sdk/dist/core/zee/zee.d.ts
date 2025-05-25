import type { ZeeWorkflowOptions, ZEEWorkflowResponse } from ".";
import { Base } from "../base/base";
export declare class ZeeWorkflow extends Base {
    private agents;
    private defaultAgents;
    private addedAgents;
    private context;
    private actionQueue;
    private maxIterations;
    private temperature;
    private goal;
    constructor({ agents, model, goal, config }: ZeeWorkflowOptions);
    private getAgent;
    private parseTasks;
    private processActionItem;
    private processAgentResponse;
    run(): Promise<ZEEWorkflowResponse>;
}
//# sourceMappingURL=zee.d.ts.map