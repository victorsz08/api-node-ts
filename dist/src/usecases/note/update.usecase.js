"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNoteUsecase = void 0;
class UpdateNoteUsecase {
    constructor(noteInterface) {
        this.noteInterface = noteInterface;
    }
    ;
    static build(noteInterface) {
        return new UpdateNoteUsecase(noteInterface);
    }
    ;
    async execute(input) {
        const { id, content } = input;
        const updatedAt = new Date();
        await this.noteInterface.find(id);
        await this.noteInterface.update(id, content, updatedAt);
        return;
    }
    ;
}
exports.UpdateNoteUsecase = UpdateNoteUsecase;
;
