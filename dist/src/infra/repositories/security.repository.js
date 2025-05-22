"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityRepository = void 0;
const http_exception_1 = require("../../package/http-exceptions/http-exception");
const http_status_1 = require("../../package/http-exceptions/http-status");
class SecurityRepository {
    constructor(repository) {
        this.repository = repository;
    }
    ;
    static build(repository) {
        return new SecurityRepository(repository);
    }
    ;
    async recovery(id, password, updatedAt) {
        const user = await this.repository.user.findUnique({ where: { id } });
        if (!user) {
            throw new http_exception_1.HttpException("usuário não encontrado com esse id", http_status_1.HttpStatus.BAD_REQUEST);
        }
        ;
        await this.repository.user.update({
            where: { id },
            data: {
                password,
                updatedAt
            }
        });
        return;
    }
    ;
    async grantedUser(id, role, updatedAt) {
        const user = await this.repository.user.findUnique({ where: { id } });
        if (!user) {
            throw new http_exception_1.HttpException("usuário não encontrado com esse id", http_status_1.HttpStatus.BAD_REQUEST);
        }
        ;
        await this.repository.user.update({
            where: { id },
            data: {
                role,
                updatedAt
            }
        });
        return;
    }
}
exports.SecurityRepository = SecurityRepository;
;
