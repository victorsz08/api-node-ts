import { NoteInterface } from "../../domain/interfaces/note.interface";
import { Usecase } from "../usecase.core";



export type UpdateNoteInputDto = {
    id: string;
    content: string;
};

export type UpdateNoteOutputDto = void;


export class UpdateNoteUsecase implements Usecase<UpdateNoteInputDto, UpdateNoteOutputDto> {
    private constructor(private readonly noteInterface: NoteInterface) {};
    
    public static build(noteInterface: NoteInterface) {
        return new UpdateNoteUsecase(noteInterface);
    };

    public async execute(input: UpdateNoteInputDto): Promise<void> {
        const { id, content } = input;
        const updatedAt = new Date();

        await this.noteInterface.find(id);
        await this.noteInterface.update(id, content, updatedAt);
        
        return;
    };
};