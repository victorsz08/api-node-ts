"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateData = ValidateData;
const zod_1 = require("zod");
const http_status_1 = require("../package/http-exceptions/http-status");
function ValidateData(schema, source = "body") {
    return async (req, res, next) => {
        try {
            const validateToData = req[source];
            schema.parse(validateToData);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errorMessages = error.errors.map((issue) => ({
                    issue: `${issue.path.join(".")}`,
                    message: `${issue.message}`,
                }));
                return res
                    .status(http_status_1.HttpStatus.BAD_REQUEST)
                    .json({
                    error: "campos preenchidos incorretamente",
                    details: errorMessages,
                });
            }
            else {
                return res.status(500).json({ error: "Internal Server Error" });
            }
        }
    };
}
