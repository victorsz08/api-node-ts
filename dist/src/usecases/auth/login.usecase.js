"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthLoginUsecase = void 0;
class AuthLoginUsecase {
    constructor(authInterface) {
        this.authInterface = authInterface;
    }
    ;
    static build(authInterface) {
        return new AuthLoginUsecase(authInterface);
    }
    ;
    async execute(input) {
        const { username, password } = input;
        const token = await this.authInterface.login(username, password);
        return { token };
    }
}
exports.AuthLoginUsecase = AuthLoginUsecase;
;
