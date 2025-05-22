"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_mapper_1 = __importDefault(require("../../patterns/mappers/user.mapper"));
const http_exception_1 = require("../../package/http-exceptions/http-exception");
const http_status_1 = require("../../package/http-exceptions/http-status");
class UserRepository {
    constructor(repository) {
        this.repository = repository;
    }
    static build(repository) {
        return new UserRepository(repository);
    }
    async create(user) {
        const { id, username, firstName, lastName, role, password, createdAt, updatedAt } = user;
        await this.repository.user.create({
            data: {
                id,
                username,
                name: firstName,
                lastname: lastName,
                role,
                password,
                createdAt,
                updatedAt
            },
        });
        return;
    }
    async find(id) {
        const user = await this.repository.user.findUnique({ where: { id } });
        if (!user) {
            throw new http_exception_1.HttpException("usuário não encontrado com esse id", http_status_1.HttpStatus.NOT_FOUND);
        }
        const output = user_mapper_1.default.toEntity(user);
        return output;
    }
    async list(query) {
        const { page, limit, search } = query;
        const queryArgs = {
            where: {},
            take: limit,
            skip: (page - 1) * limit,
        };
        const countArgs = {
            where: {},
        };
        if (search) {
            queryArgs.where = {
                OR: [
                    { username: { contains: search, mode: "insensitive" } },
                    { name: { contains: search, mode: "insensitive" } },
                    { lastname: { contains: search, mode: "insensitive" } },
                ],
            };
            countArgs.where = {
                OR: [
                    { username: { contains: search, mode: "insensitive" } },
                    { name: { contains: search, mode: "insensitive" } },
                    { lastname: { contains: search, mode: "insensitive" } },
                ],
            };
        }
        const [users, total] = await this.repository.$transaction([
            this.repository.user.findMany(queryArgs),
            this.repository.user.count(countArgs),
        ]);
        const pages = Math.ceil(total / limit);
        const userList = users.map((user) => user_mapper_1.default.toEntity(user));
        return {
            users: userList,
            total,
            pages,
            limit,
        };
    }
    async update(id, username, firstName, lastName, updatedAt) {
        await this.repository.user.update({
            where: {
                id,
            },
            data: {
                username,
                name: firstName,
                lastname: lastName,
                updatedAt,
            },
        });
        return;
    }
    async updatePassword(id, password, updatedAt) {
        await this.repository.user.update({
            where: {
                id,
            },
            data: {
                password,
                updatedAt,
            },
        });
        return;
    }
    async delete(id) {
        await this.repository.user.delete({
            where: {
                id,
            },
        });
        return;
    }
}
exports.UserRepository = UserRepository;
