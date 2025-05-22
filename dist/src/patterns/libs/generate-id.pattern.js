"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class GenerateRandonId {
    generate() {
        const id = (0, uuid_1.v4)();
        return id;
    }
    ;
}
;
exports.default = new GenerateRandonId();
