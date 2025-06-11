"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const http_exception_1 = require("../../package/http-exceptions/http-exception");
const http_status_1 = require("../../package/http-exceptions/http-status");
const generate_hash_pattern_1 = __importDefault(require("../../patterns/libs/generate-hash.pattern"));
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../../../prisma/config");
class AuthRepository {
    constructor(repository) {
        this.repository = repository;
    }
    ;
    static build(repository) {
        return new AuthRepository(repository);
    }
    ;
    async login(username, password) {
        const user = await this.repository.user.findUnique({ where: { username } });
        if (!user) {
            throw new http_exception_1.HttpException("usuário ou senha incorretos", http_status_1.HttpStatus.BAD_REQUEST);
        }
        ;
        const validatePassword = await generate_hash_pattern_1.default.compareHash(password, user.password);
        if (!validatePassword) {
            throw new http_exception_1.HttpException("usuário ou senha incorretos", http_status_1.HttpStatus.BAD_REQUEST);
        }
        ;
        const payload = (0, jsonwebtoken_1.sign)({
            id: user.id,
            username: user.username,
            firstName: user.name,
            lastName: user.lastname,
            role: user.role
        }, config_1.config.secret, { expiresIn: "1d" });
        return payload;
    }
    ;
}
exports.AuthRepository = AuthRepository;
;
