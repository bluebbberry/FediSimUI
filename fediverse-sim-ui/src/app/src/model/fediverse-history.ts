import { FediverseState } from "./fediverse-state";

export class FediverseHistory {
    fediverseStates?: FediverseState[];

    constructor(fediverseStates: FediverseState[]) {
        if (fediverseStates) this.fediverseStates = fediverseStates;
    }
}
