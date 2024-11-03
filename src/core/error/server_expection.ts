export class ServerException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ServerException";
    }
}