"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecuityRecoveryUsecase = void 0;
const generate_hash_pattern_1 = __importDefault(require("../../patterns/libs/generate-hash.pattern"));
class SecuityRecoveryUsecase {
    constructor(securityIterface) {
        this.securityIterface = securityIterface;
    }
    ;
    static build(securityIterface) {
        return new SecuityRecoveryUsecase(securityIterface);
    }
    async execute(input) {
        const { id } = input;
        const updatedAt = new Date();
        const passwordRandon = Math.random().toString(30).slice(-10);
        const passwordHashed = await generate_hash_pattern_1.default.generate(passwordRandon);
        await this.securityIterface.recovery(id, passwordHashed, updatedAt);
        return {
            password: passwordRandon
        };
    }
    ;
}
exports.SecuityRecoveryUsecase = SecuityRecoveryUsecase;
;
