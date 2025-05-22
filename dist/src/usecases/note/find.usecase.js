"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindNoteUsecase = void 0;
const note_mapper_1 = __importDefault(require("../../patterns/mappers/note.mapper"));
class FindNoteUsecase {
    constructor(noteInterface) {
        this.noteInterface = noteInterface;
    }
    ;
    static build(noteInterface) {
        return new FindNoteUsecase(noteInterface);
    }
    async execute(input) {
        const { id } = input;
        const note = await this.noteInterface.find(id);
        const output = note_mapper_1.default.toDto(note);
        return output;
    }
    ;
}
exports.FindNoteUsecase = FindNoteUsecase;
;
