import { prisma } from "../../package/prisma/prisma.service";
import { CreateNoteUsecase } from "../../usecases/note/create.usecase";
import { DeleteNoteUsecase } from "../../usecases/note/delete.usecase";
import { FindNoteUsecase } from "../../usecases/note/find.usecase";
import { ListNoteUsecase } from "../../usecases/note/list.usecase";
import { UpdateNoteUsecase } from "../../usecases/note/update.usecase";
import { CreateNoteRoute } from "../api/express/routes/note/create.route.express";
import { DeleteNoteRoute } from "../api/express/routes/note/delete.route.express";
import { FindNoteRoute } from "../api/express/routes/note/find.route.express";
import { ListNoteRoute } from "../api/express/routes/note/list.route.express";
import { UpdateNoteRoute } from "../api/express/routes/note/update.route.express";
import { NoteRepository } from "../repositories/note.repository";




const noteRepository = NoteRepository.build(prisma);


// usecases
const createNoteUsecase = CreateNoteUsecase.build(noteRepository);
const findNoteUsecase = FindNoteUsecase.build(noteRepository);
const listNoteUsecase = ListNoteUsecase.build(noteRepository);
const updateNoteUsecase = UpdateNoteUsecase.build(noteRepository);
const deleteNoteUsecase = DeleteNoteUsecase.build(noteRepository);

// routes
const createNoteRoute = CreateNoteRoute.build(createNoteUsecase);
const findNoteRoute = FindNoteRoute.build(findNoteUsecase);
const listNoteRoute = ListNoteRoute.build(listNoteUsecase);
const updateNoteRoute = UpdateNoteRoute.build(updateNoteUsecase);
const deleteNoteRoute = DeleteNoteRoute.build(deleteNoteUsecase);

export const noteRoutes = [
    createNoteRoute,
    findNoteRoute,
    listNoteRoute,
    updateNoteRoute,
    deleteNoteRoute
];