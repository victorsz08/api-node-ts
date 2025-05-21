import { startOfDay, endOfDay, addDays } from 'date-fns';

class FormatDate {
    public startOfDate(date: Date): Date {
        return addDays(startOfDay(date), 1);
    };

    public endOfDate(date: Date): Date {
        return addDays(endOfDay(date), 1);
    };
};

export default new FormatDate();