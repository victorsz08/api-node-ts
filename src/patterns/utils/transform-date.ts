import { format } from "date-fns";



class FormartDatePattern {
    public toString(date: Date) {
        return format(date, "dd/MM/yyyy HH:mm")
    };

    public toDate(date: string) {
        return new Date(date)
    };
};

export default new FormartDatePattern();