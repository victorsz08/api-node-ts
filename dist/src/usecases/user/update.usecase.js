"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserUsecase = void 0;
const http_exception_1 = require("../../package/http-exceptions/http-exception");
const http_status_1 = require("../../package/http-exceptions/http-status");
class UpdateUserUsecase {
    constructor(userInterface) {
        this.userInterface = userInterface;
    }
    ;
    static build(userInterface) {
        return new UpdateUserUsecase(userInterface);
    }
    ;
    async execute(input) {
        const { id, username, firstName, lastName } = input;
        const updatedAt = new Date();
        const user = await this.userInterface.find(id);
        if (!user) {
            throw new http_exception_1.HttpException("usuário não encontrado com esse id", http_status_1.HttpStatus.NOT_FOUND);
        }
        ;
        await this.userInterface.update(id, username, firstName, lastName, updatedAt);
        return;
    }
    ;
}
exports.UpdateUserUsecase = UpdateUserUsecase;
;
