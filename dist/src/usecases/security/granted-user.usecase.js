"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrantedUserUsecase = void 0;
class GrantedUserUsecase {
    constructor(securityInterface) {
        this.securityInterface = securityInterface;
    }
    ;
    static build(securityInterface) {
        return new GrantedUserUsecase(securityInterface);
    }
    ;
    async execute(input) {
        const { id, role } = input;
        const updatedAt = new Date();
        await this.securityInterface.grantedUser(id, role, updatedAt);
        return;
    }
    ;
}
exports.GrantedUserUsecase = GrantedUserUsecase;
;
