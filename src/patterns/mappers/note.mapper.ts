import { Notes } from "@prisma/client";
import { NoteEntity } from "../../domain/entities/note.entity";
import { Mapper } from "./mapper.core";
import formatDatePattern from "../utils/transform-date";


export type NoteDto = {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
};


class NoteMapper implements Mapper<NoteEntity, NoteDto> {
    public toEntity(note: Notes): NoteEntity {
        return NoteEntity.with({
            id: note.id,
            content: note.text,
            userId: note.user_id,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt
        });
    };
    
    public toDto(input: NoteEntity): NoteDto {
        return {
            id: input.id,
            content: input.content,
            createdAt: formatDatePattern.toString(input.createdAt),
            updatedAt: formatDatePattern.toString(input.updatedAt)
        }
    };
};

export default new NoteMapper();