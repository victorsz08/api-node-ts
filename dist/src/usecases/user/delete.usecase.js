"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserUsecase = void 0;
const http_exception_1 = require("../../package/http-exceptions/http-exception");
const http_status_1 = require("../../package/http-exceptions/http-status");
class DeleteUserUsecase {
    constructor(userInterface) {
        this.userInterface = userInterface;
    }
    ;
    static build(userInterface) {
        return new DeleteUserUsecase(userInterface);
    }
    ;
    async execute(input) {
        const { id } = input;
        const user = await this.userInterface.find(id);
        if (!user) {
            throw new http_exception_1.HttpException("usuário não encontrado com esse id", http_status_1.HttpStatus.NOT_FOUND);
        }
        ;
        await this.userInterface.delete(id);
        return;
    }
    ;
}
exports.DeleteUserUsecase = DeleteUserUsecase;
;
