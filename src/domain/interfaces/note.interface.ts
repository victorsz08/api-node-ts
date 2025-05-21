import { NoteEntity } from "../entities/note.entity";



export type ListNoteInput = {
    page: number;
    limit: number;
    userId: string;
    dateIn?: Date;
    dateOut?: Date;
};

export type ListNoteOutput = {
    notes: NoteEntity[];
    total: number;
    pages: number;
    limit: number;
};

export interface NoteInterface {
    create(note: NoteEntity): Promise<void>;
    find(id: string): Promise<NoteEntity>;
    list(query: ListNoteInput): Promise<ListNoteOutput>;
    update(id: string, content: string, updatedAt: Date): Promise<void>;
    delete(id: string): Promise<void>;
};