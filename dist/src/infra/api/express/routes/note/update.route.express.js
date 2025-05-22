"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNoteRoute = void 0;
const route_express_1 = require("../route.express");
const logger_middleware_1 = require("../../../../../middlewares/logger.middleware");
const validate_data_middleware_1 = require("../../../../../middlewares/validate-data.middleware");
const note_schema_1 = require("../../../../../validators/note.schema");
class UpdateNoteRoute {
    constructor(path, method, updateNoteUsecase) {
        this.path = path;
        this.method = method;
        this.updateNoteUsecase = updateNoteUsecase;
    }
    ;
    static build(updateNoteUsecase) {
        return new UpdateNoteRoute("/notes/:id", route_express_1.HttpMethod.PUT, updateNoteUsecase);
    }
    ;
    getHandler() {
        return async (req, res) => {
            const { id } = req.params;
            const { content } = req.body;
            await this.updateNoteUsecase.execute({ id, content });
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
            (0, validate_data_middleware_1.ValidateData)(note_schema_1.findNoteSchema, "params"),
            (0, validate_data_middleware_1.ValidateData)(note_schema_1.updateNoteSchema, "body")
        ];
    }
    ;
}
exports.UpdateNoteRoute = UpdateNoteRoute;
;
