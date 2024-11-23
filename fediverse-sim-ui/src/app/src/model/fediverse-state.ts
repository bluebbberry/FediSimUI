import { Server } from "./server";

export class FediverseState {
        year: number;
        servers: Array<Server>;

    constructor(year: number, servers: Array<any>) {
        this.year = year;
        this.servers = servers;
    }
}
