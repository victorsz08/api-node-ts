



export class HttpException extends Error {
    declare statusCode: number;

    public constructor(message: string, statusCode: number) {
        super(message),
        this.statusCode = statusCode;
    };
};