"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePasswordUserUsecase = void 0;
const generate_hash_pattern_1 = __importDefault(require("../../patterns/libs/generate-hash.pattern"));
const http_exception_1 = require("../../package/http-exceptions/http-exception");
const http_status_1 = require("../../package/http-exceptions/http-status");
class UpdatePasswordUserUsecase {
    constructor(userInterface) {
        this.userInterface = userInterface;
    }
    ;
    static build(userInterface) {
        return new UpdatePasswordUserUsecase(userInterface);
    }
    ;
    async execute(input) {
        const { id, currentPassword, newPassword } = input;
        const updatedAt = new Date();
        const user = await this.userInterface.find(id);
        const validatePassword = await generate_hash_pattern_1.default.compareHash(currentPassword, user.password);
        if (!validatePassword) {
            throw new http_exception_1.HttpException("senha atual incorreta", http_status_1.HttpStatus.BAD_REQUEST);
        }
        ;
        const newPasswordHash = await generate_hash_pattern_1.default.generate(newPassword);
        await this.userInterface.updatePassword(id, newPasswordHash, updatedAt);
        return;
    }
    ;
}
exports.UpdatePasswordUserUsecase = UpdatePasswordUserUsecase;
;
