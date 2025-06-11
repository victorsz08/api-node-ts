"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
class FormartDatePattern {
    toString(date) {
        return (0, date_fns_1.format)(date, "dd/MM/yyyy");
    }
    ;
    toDate(date) {
        return new Date(date);
    }
    ;
}
;
exports.default = new FormartDatePattern();
