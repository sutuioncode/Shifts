import { addDays, format, startOfWeek } from 'date-fns';

export const weekdays = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];

export function getWeekdayDate(startDate: Date, targetWeekdayName: string) {
    const targetIndex = weekdays.indexOf(targetWeekdayName);

    if (targetIndex === -1) {
        throw new Error("Invalid weekday name. Use full names like 'Monday', 'Tuesday', etc.");
    }

    const weekStartDate = startOfWeek(startDate, { weekStartsOn: 1 }); // Monday as the start of the week
    const targetDate = addDays(weekStartDate, targetIndex); // Get the target weekday
    return targetDate
}