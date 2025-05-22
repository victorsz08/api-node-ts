"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListNoteUsecase = void 0;
const note_mapper_1 = __importDefault(require("../../patterns/mappers/note.mapper"));
class ListNoteUsecase {
    constructor(noteInterface) {
        this.noteInterface = noteInterface;
    }
    ;
    static build(noteInterface) {
        return new ListNoteUsecase(noteInterface);
    }
    ;
    async execute(input) {
        const { page, limit, userId, dateIn, dateOut } = input;
        const data = await this.noteInterface.list({ page, limit, userId, dateIn, dateOut });
        const output = this.present(data);
        return output;
    }
    ;
    present(data) {
        return {
            notes: data.notes.map((note) => {
                return note_mapper_1.default.toDto(note);
            }),
            total: data.total,
            pages: data.pages,
            limit: data.limit
        };
    }
    ;
}
exports.ListNoteUsecase = ListNoteUsecase;
;
