"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNoteRoute = void 0;
const route_express_1 = require("../route.express");
const logger_middleware_1 = require("../../../../../middlewares/logger.middleware");
const validate_data_middleware_1 = require("../../../../../middlewares/validate-data.middleware");
const note_schema_1 = require("../../../../../validators/note.schema");
const order_schemas_1 = require("../../../../../validators/order.schemas");
class CreateNoteRoute {
    constructor(path, method, createNoteUsecase) {
        this.path = path;
        this.method = method;
        this.createNoteUsecase = createNoteUsecase;
    }
    ;
    static build(createNoteUsecase) {
        return new CreateNoteRoute("/notes/:userId", route_express_1.HttpMethod.POST, createNoteUsecase);
    }
    ;
    getHandler() {
        return async (req, res) => {
            const { userId } = req.params;
            const { content } = req.body;
            await this.createNoteUsecase.execute({ content, userId });
            return res.status(201).send();
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
            (0, validate_data_middleware_1.ValidateData)(note_schema_1.createNoteSchema, "body"),
            (0, validate_data_middleware_1.ValidateData)(order_schemas_1.findUserIdSchema, "params")
        ];
    }
    ;
}
exports.CreateNoteRoute = CreateNoteRoute;
;
