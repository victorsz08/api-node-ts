"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
class FormatDate {
    startOfDate(date) {
        return (0, date_fns_1.addDays)((0, date_fns_1.startOfDay)(date), 1);
    }
    ;
    endOfDate(date) {
        return (0, date_fns_1.addDays)((0, date_fns_1.endOfDay)(date), 1);
    }
    ;
}
;
exports.default = new FormatDate();
