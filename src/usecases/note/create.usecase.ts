import { NoteEntity } from "../../domain/entities/note.entity";
import { NoteInterface } from "../../domain/interfaces/note.interface";
import { Usecase } from "../usecase.core";



export type CreateNoteInputDto = {
    content: string;
    userId: string;
};


export type CreateNoteOutputDto = void;



export class CreateNoteUsecase implements Usecase<CreateNoteInputDto, CreateNoteOutputDto> {
    private constructor(private readonly noteInterface: NoteInterface) {};

    public static build(noteInterface: NoteInterface) {
        return new CreateNoteUsecase(noteInterface);
    };
    
    public async execute(input: CreateNoteInputDto): Promise<void> {
        const { content, userId } = input;

        const note = NoteEntity.build(content, userId);

        await this.noteInterface.create(note);
        return;
    };
};