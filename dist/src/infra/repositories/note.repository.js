"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteRepository = void 0;
const http_exception_1 = require("../../package/http-exceptions/http-exception");
const http_status_1 = require("../../package/http-exceptions/http-status");
const note_mapper_1 = __importDefault(require("../../patterns/mappers/note.mapper"));
class NoteRepository {
    constructor(repository) {
        this.repository = repository;
    }
    static build(repository) {
        return new NoteRepository(repository);
    }
    async create(note) {
        const { id, content, userId, createdAt, updatedAt } = note;
        const user = await this.repository.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new http_exception_1.HttpException("usuário não encontrado com esse id", http_status_1.HttpStatus.BAD_REQUEST);
        }
        await this.repository.notes.create({
            data: {
                id,
                text: content,
                user: { connect: { id: userId } },
                createdAt,
                updatedAt,
            },
        });
        return;
    }
    async find(id) {
        const note = await this.repository.notes.findUnique({ where: { id } });
        if (!note) {
            throw new http_exception_1.HttpException("nota não encontrada com esse id", http_status_1.HttpStatus.NOT_FOUND);
        }
        const output = note_mapper_1.default.toEntity(note);
        return output;
    }
    async list(query) {
        const { page, limit, userId, dateIn, dateOut } = query;
        const queryArgs = {
            where: {
                user: { id: userId },
            },
            take: limit,
            skip: (page - 1) * limit,
        };
        const countArgs = {
            where: {
                user: { id: userId },
            },
        };
        if (dateIn && dateOut) {
            queryArgs.where = {
                ...queryArgs.where,
                createdAt: {
                    gte: dateIn,
                    lte: dateOut,
                },
            };
            countArgs.where = {
                ...countArgs.where,
                createdAt: {
                    gte: dateIn,
                    lte: dateOut,
                },
            };
        }
        ;
        const [notes, total] = await this.repository.$transaction([
            this.repository.notes.findMany(queryArgs),
            this.repository.notes.count(countArgs)
        ]);
        const noteList = notes.map((note) => {
            return note_mapper_1.default.toEntity(note);
        });
        const pages = Math.ceil(total / limit);
        return {
            notes: noteList,
            pages,
            total,
            limit
        };
    }
    ;
    async update(id, content, updatedAt) {
        await this.repository.notes.update({
            where: { id },
            data: {
                text: content,
                updatedAt
            }
        });
        return;
    }
    ;
    async delete(id) {
        await this.repository.notes.delete({
            where: { id }
        });
        return;
    }
    ;
}
exports.NoteRepository = NoteRepository;
;
