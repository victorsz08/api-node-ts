"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteNoteRoute = void 0;
const route_express_1 = require("../route.express");
const logger_middleware_1 = require("../../../../../middlewares/logger.middleware");
const validate_data_middleware_1 = require("../../../../../middlewares/validate-data.middleware");
const note_schema_1 = require("../../../../../validators/note.schema");
class DeleteNoteRoute {
    constructor(path, method, deleteNoteUsecase) {
        this.path = path;
        this.method = method;
        this.deleteNoteUsecase = deleteNoteUsecase;
    }
    ;
    static build(deleteNoteUsecase) {
        return new DeleteNoteRoute("/notes/:id", route_express_1.HttpMethod.DELETE, deleteNoteUsecase);
    }
    ;
    getHandler() {
        return async (req, res) => {
            const { id } = req.params;
            await this.deleteNoteUsecase.execute({ id });
            return res.status(204).send();
        };
    }
    ;
    getPath() {
        return this.path;
    }
    ;
    getMethod() {
        return this.method;
    }
    ;
    getMiddlewares() {
        return [
            (0, logger_middleware_1.LoggerMiddleware)(),
            (0, validate_data_middleware_1.ValidateData)(note_schema_1.findNoteSchema, "params")
        ];
    }
    ;
}
exports.DeleteNoteRoute = DeleteNoteRoute;
;
