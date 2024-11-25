import { Server } from "./server";

export class FediverseState {
        year?: number;
        servers?: Array<Server>;

    constructor(year?: number, servers?: Array<any>) {
        if (year) this.year = year;
        if (servers) this.servers = servers;
        else this.servers = [];
    }
}
