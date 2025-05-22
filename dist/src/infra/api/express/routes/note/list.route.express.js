"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListNoteRoute = void 0;
const route_express_1 = require("../route.express");
const logger_middleware_1 = require("../../../../../middlewares/logger.middleware");
const validate_data_middleware_1 = require("../../../../../middlewares/validate-data.middleware");
const note_schema_1 = require("../../../../../validators/note.schema");
const order_schemas_1 = require("../../../../../validators/order.schemas");
class ListNoteRoute {
    constructor(path, method, listNoteUsecase) {
        this.path = path;
        this.method = method;
        this.listNoteUsecase = listNoteUsecase;
    }
    ;
    static build(listNoteUsecase) {
        return new ListNoteRoute("/notes", route_express_1.HttpMethod.GET, listNoteUsecase);
    }
    ;
    getHandler() {
        return async (req, res) => {
            const query = req.query;
            const input = order_schemas_1.listOrderSchema.parse(query);
            const data = await this.listNoteUsecase.execute(input);
            return res.status(200).json(data);
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
            (0, validate_data_middleware_1.ValidateData)(note_schema_1.listNoteSchema, "query")
        ];
    }
    ;
}
exports.ListNoteRoute = ListNoteRoute;
;
