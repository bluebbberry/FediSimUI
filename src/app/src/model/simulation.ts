import { FediverseState } from "./fediverse-state";

export class Simulation {
    startState?: FediverseState;
    duration?: number;
    type?: string;

    constructor(startState?: FediverseState, duration?: number, type?: string) {
        if (startState) this.startState = startState;
        if (duration) this.duration = duration;
        if (type) this.type = type;
    }
}
