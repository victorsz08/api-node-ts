"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindNoteRoute = void 0;
const route_express_1 = require("../route.express");
const logger_middleware_1 = require("../../../../../middlewares/logger.middleware");
const validate_data_middleware_1 = require("../../../../../middlewares/validate-data.middleware");
const note_schema_1 = require("../../../../../validators/note.schema");
class FindNoteRoute {
    constructor(path, method, findNoteUsecase) {
        this.path = path;
        this.method = method;
        this.findNoteUsecase = findNoteUsecase;
    }
    ;
    static build(findNoteUsecase) {
        return new FindNoteRoute("/notes/:id", route_express_1.HttpMethod.GET, findNoteUsecase);
    }
    ;
    getHandler() {
        return async (req, res) => {
            const { id } = req.params;
            const note = await this.findNoteUsecase.execute({ id });
            return res.status(200).json(note);
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
exports.FindNoteRoute = FindNoteRoute;
;
