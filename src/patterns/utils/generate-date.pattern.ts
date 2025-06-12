import { format } from "date-fns";
import moment from "moment-timezone";



class GenerateDatePattern {
    public toString(date: Date): string {
        return moment.tz(date, "America/Sao_Paulo").format("YYYY-MM-DD");
    };

    public toDate(date: string): Date {
        return moment.tz(date, "America/Sao_Paulo").toDate()
    };

    public generateDate(): Date {
        return moment.tz("America/Sao_Paulo").toDate();
    };

    public parseDate(date: Date): Date {
        return moment.tz(date, "America/Sao_Paulo").toDate();
    }
};

export default new GenerateDatePattern();