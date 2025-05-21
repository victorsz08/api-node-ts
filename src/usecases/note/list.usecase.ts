import { ListNoteOutput, NoteInterface } from "../../domain/interfaces/note.interface";
import noteMapper, { NoteDto } from "../../patterns/mappers/note.mapper";
import { Usecase } from "../usecase.core";



export type ListNoteInputDto = {
    page: number;
    limit: number;
    userId: string;
    dateIn?: Date;
    dateOut?: Date;
};

export type ListNoteOutputDto = {
    notes: NoteDto[];
    total: number;
    pages: number;
    limit: number;
};

export class ListNoteUsecase implements Usecase<ListNoteInputDto, ListNoteOutputDto> {
    private constructor(private readonly noteInterface: NoteInterface) {};
    
    public static build(noteInterface: NoteInterface) {
        return new ListNoteUsecase(noteInterface);
    };

    public async execute(input: ListNoteInputDto): Promise<ListNoteOutputDto> {
        const { page, limit, userId, dateIn, dateOut } = input;

        const data = await this.noteInterface.list({ page, limit, userId, dateIn, dateOut });
        const output = this.present(data);

        return output;
    };

    private present(data: ListNoteOutput): ListNoteOutputDto {
        return {
            notes: data.notes.map((note) => {
                return noteMapper.toDto(note)
            }),
            total: data.total,
            pages: data.pages,
            limit: data.limit
        };
    };
};