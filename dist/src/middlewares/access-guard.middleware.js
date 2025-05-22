"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessGuard = AccessGuard;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../../prisma/config");
function AccessGuard(role) {
    return async (req, res, next) => {
        const token = req.cookies["nt.authtoken"]?.token;
        try {
            (0, jsonwebtoken_1.verify)(token, config_1.config.secret);
            const payload = (0, jsonwebtoken_1.decode)(token);
            if (payload.role !== role) {
                return res.status(401).json({ message: "acesso não autorizado" });
            }
            ;
            next();
        }
        catch (error) {
            return res.status(401).json({ message: "unauthorized" });
        }
        ;
    };
}
;
