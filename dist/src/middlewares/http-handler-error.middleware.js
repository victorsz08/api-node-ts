"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpHandlerError = HttpHandlerError;
function HttpHandlerError(error, req, res, next) {
    const statusCode = error.statusCode ?? 500;
    const message = error.statusCode ? error.message : "Internal server error";
    return res.status(statusCode).send({ status: statusCode, error: message });
}
;
