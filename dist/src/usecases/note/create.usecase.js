"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNoteUsecase = void 0;
const note_entity_1 = require("../../domain/entities/note.entity");
class CreateNoteUsecase {
    constructor(noteInterface) {
        this.noteInterface = noteInterface;
    }
    ;
    static build(noteInterface) {
        return new CreateNoteUsecase(noteInterface);
    }
    ;
    async execute(input) {
        const { content, userId } = input;
        const note = note_entity_1.NoteEntity.build(content, userId);
        await this.noteInterface.create(note);
        return;
    }
    ;
}
exports.CreateNoteUsecase = CreateNoteUsecase;
;
