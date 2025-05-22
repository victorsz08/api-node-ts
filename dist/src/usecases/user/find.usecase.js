"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUserUsecase = void 0;
const http_exception_1 = require("../../package/http-exceptions/http-exception");
const http_status_1 = require("../../package/http-exceptions/http-status");
const user_mapper_1 = __importDefault(require("../../patterns/mappers/user.mapper"));
class FindUserUsecase {
    constructor(userInterface) {
        this.userInterface = userInterface;
    }
    ;
    static build(userInterface) {
        return new FindUserUsecase(userInterface);
    }
    ;
    async execute(input) {
        const { id } = input;
        const user = await this.userInterface.find(id);
        if (!user) {
            throw new http_exception_1.HttpException("usuário não encontrado com esse id", http_status_1.HttpStatus.NOT_FOUND);
        }
        ;
        const output = user_mapper_1.default.toDto(user);
        return output;
    }
    ;
}
exports.FindUserUsecase = FindUserUsecase;
;
