export class Server {
    name?: string;
    usersPerMonth?: number;

    constructor(name?: string, userPerMonth?: number) {
        if (name) this.name = name;
        if (userPerMonth) this.usersPerMonth = userPerMonth;
    }
}
