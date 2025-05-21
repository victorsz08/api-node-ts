import { Prisma, PrismaClient } from "@prisma/client";
import { NoteEntity } from "../../domain/entities/note.entity";
import {
  ListNoteInput,
  ListNoteOutput,
  NoteInterface,
} from "../../domain/interfaces/note.interface";
import { HttpException } from "../../package/http-exceptions/http-exception";
import { HttpStatus } from "../../package/http-exceptions/http-status";
import noteMapper from "../../patterns/mappers/note.mapper";

export class NoteRepository implements NoteInterface {
  private constructor(private readonly repository: PrismaClient) {}

  public static build(repository: PrismaClient) {
    return new NoteRepository(repository);
  }

  public async create(note: NoteEntity): Promise<void> {
    const { id, content, userId, createdAt, updatedAt } = note;

    const user = await this.repository.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpException(
        "usuário não encontrado com esse id",
        HttpStatus.BAD_REQUEST
      );
    }

    await this.repository.notes.create({
      data: {
        id,
        text: content,
        user: { connect: { id: userId } },
        createdAt,
        updatedAt,
      },
    });

    return;
  }

  public async find(id: string): Promise<NoteEntity> {
    const note = await this.repository.notes.findUnique({ where: { id } });

    if (!note) {
      throw new HttpException(
        "nota não encontrada com esse id",
        HttpStatus.NOT_FOUND
      );
    }

    const output = noteMapper.toEntity(note);
    return output;
  }

  public async list(query: ListNoteInput): Promise<ListNoteOutput> {
    const { page, limit, userId, dateIn, dateOut } = query;

    const queryArgs: Prisma.NotesFindManyArgs = {
      where: {
        user: { id: userId },
      },
      take: limit,
      skip: (page - 1) * limit,
    };

    const countArgs: Prisma.NotesCountArgs = {
      where: {
        user: { id: userId },
      },
    };

    if (dateIn && dateOut) {
      queryArgs.where = {
        ...queryArgs.where,
        createdAt: {
          gte: dateIn,
          lte: dateOut,
        },
      };

      countArgs.where = {
        ...countArgs.where,
        createdAt: {
          gte: dateIn,
          lte: dateOut,
        },
      };
    };


    const [notes, total] = await this.repository.$transaction([
        this.repository.notes.findMany(queryArgs),
        this.repository.notes.count(countArgs)
    ]);

    const noteList = notes.map((note) => {
        return noteMapper.toEntity(note)
    });

    const pages = Math.ceil(total / limit);
    
    return {
        notes: noteList,
        pages,
        total,
        limit
    };
  };

  public async update(
    id: string,
    content: string,
    updatedAt: Date
  ): Promise<void> {
    await this.repository.notes.update({
        where: { id },
        data: {
            text: content,
            updatedAt
        }
    });

    return;
  };

  public async delete(id: string): Promise<void> {
    await this.repository.notes.delete({
        where: { id }
    });

    return;
  };
};
