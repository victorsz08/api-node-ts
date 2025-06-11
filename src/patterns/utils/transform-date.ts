import { format } from "date-fns";



class FormartDatePattern {
    public toString(date: Date) {
        return format(date, "yyyy-MM-dd")
    };

    public toDate(date: string) {
        return new Date(date)
    };
};

export default new FormartDatePattern();