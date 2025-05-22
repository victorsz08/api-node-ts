"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteRoutes = void 0;
const prisma_service_1 = require("../../package/prisma/prisma.service");
const create_usecase_1 = require("../../usecases/note/create.usecase");
const delete_usecase_1 = require("../../usecases/note/delete.usecase");
const find_usecase_1 = require("../../usecases/note/find.usecase");
const list_usecase_1 = require("../../usecases/note/list.usecase");
const update_usecase_1 = require("../../usecases/note/update.usecase");
const create_route_express_1 = require("../api/express/routes/note/create.route.express");
const delete_route_express_1 = require("../api/express/routes/note/delete.route.express");
const find_route_express_1 = require("../api/express/routes/note/find.route.express");
const list_route_express_1 = require("../api/express/routes/note/list.route.express");
const update_route_express_1 = require("../api/express/routes/note/update.route.express");
const note_repository_1 = require("../repositories/note.repository");
const noteRepository = note_repository_1.NoteRepository.build(prisma_service_1.prisma);
// usecases
const createNoteUsecase = create_usecase_1.CreateNoteUsecase.build(noteRepository);
const findNoteUsecase = find_usecase_1.FindNoteUsecase.build(noteRepository);
const listNoteUsecase = list_usecase_1.ListNoteUsecase.build(noteRepository);
const updateNoteUsecase = update_usecase_1.UpdateNoteUsecase.build(noteRepository);
const deleteNoteUsecase = delete_usecase_1.DeleteNoteUsecase.build(noteRepository);
// routes
const createNoteRoute = create_route_express_1.CreateNoteRoute.build(createNoteUsecase);
const findNoteRoute = find_route_express_1.FindNoteRoute.build(findNoteUsecase);
const listNoteRoute = list_route_express_1.ListNoteRoute.build(listNoteUsecase);
const updateNoteRoute = update_route_express_1.UpdateNoteRoute.build(updateNoteUsecase);
const deleteNoteRoute = delete_route_express_1.DeleteNoteRoute.build(deleteNoteUsecase);
exports.noteRoutes = [
    createNoteRoute,
    findNoteRoute,
    listNoteRoute,
    updateNoteRoute,
    deleteNoteRoute
];
