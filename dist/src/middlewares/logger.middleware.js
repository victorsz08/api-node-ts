"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = LoggerMiddleware;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../../prisma/config");
function LoggerMiddleware() {
    return async (req, res, next) => {
        const token = req.cookies["nt.authtoken"];
        if (!token) {
            return res.status(401).json({ message: "token não localizado" });
        }
        ;
        try {
            (0, jsonwebtoken_1.verify)(token, config_1.config.secret);
            return next();
        }
        catch (error) {
            return res.status(401).json({ message: "unauthorized" });
        }
        ;
    };
}
;
