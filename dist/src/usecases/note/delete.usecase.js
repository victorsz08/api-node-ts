"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteNoteUsecase = void 0;
class DeleteNoteUsecase {
    constructor(noteInterface) {
        this.noteInterface = noteInterface;
    }
    ;
    static build(noteInterface) {
        return new DeleteNoteUsecase(noteInterface);
    }
    ;
    async execute(input) {
        const { id } = input;
        await this.noteInterface.find(id);
        await this.noteInterface.delete(id);
        return;
    }
    ;
}
exports.DeleteNoteUsecase = DeleteNoteUsecase;
;
