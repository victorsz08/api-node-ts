import { NoteInterface } from "../../domain/interfaces/note.interface";
import noteMapper, { NoteDto } from "../../patterns/mappers/note.mapper";
import { Usecase } from "../usecase.core";



export type FindNoteInputDto = {
    id: string;
};

export type FindNoteOutputDto = NoteDto;



export class FindNoteUsecase implements Usecase<FindNoteInputDto, FindNoteOutputDto> {
    private constructor(private readonly noteInterface: NoteInterface) {};
    
    public async execute(input: FindNoteInputDto): Promise<NoteDto> {
        const { id } = input;

        const note = await this.noteInterface.find(id);
        const output = noteMapper.toDto(note);

        return output;
    };
};