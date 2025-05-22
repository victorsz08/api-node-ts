"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
class GenerateHash {
    async generate(value) {
        const hashString = await (0, bcryptjs_1.hash)(value, 10);
        return hashString;
    }
    ;
    async compareHash(password, hash) {
        const validate = await (0, bcryptjs_1.compare)(password, hash);
        return validate;
    }
    ;
}
;
exports.default = new GenerateHash();
