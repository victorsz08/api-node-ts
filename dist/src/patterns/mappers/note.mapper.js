"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const note_entity_1 = require("../../domain/entities/note.entity");
const transform_date_1 = __importDefault(require("../utils/transform-date"));
class NoteMapper {
    toEntity(note) {
        return note_entity_1.NoteEntity.with({
            id: note.id,
            content: note.text,
            userId: note.user_id,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt
        });
    }
    ;
    toDto(input) {
        return {
            id: input.id,
            content: input.content,
            createdAt: transform_date_1.default.toString(input.createdAt),
            updatedAt: transform_date_1.default.toString(input.updatedAt)
        };
    }
    ;
}
;
exports.default = new NoteMapper();
