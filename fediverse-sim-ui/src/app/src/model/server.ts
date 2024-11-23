export class Server {
    name: string;
    usersPerMonth: number;

    constructor(name: string, userPerMonth: number) {
        this.name = name;
        this.usersPerMonth = userPerMonth;
    }
}
