import { addDays, format, startOfWeek } from 'date-fns';

export const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function getWeekdayDate(startDate: Date, targetWeekdayName: string) {
    const targetIndex = weekdays.indexOf(targetWeekdayName);

    if (targetIndex === -1) {
        throw new Error("Invalid weekday name. Use full names like 'Monday', 'Tuesday', etc.");
    }

    const weekStartDate = startOfWeek(startDate, { weekStartsOn: 1 }); // Monday as the start of the week
    const targetDate = addDays(weekStartDate, targetIndex); // Get the target weekday
    return targetDate
}

const weekStart = '2025-01-13'; // Given start of the week
const targetWeekday = "Thursday"; // Desired weekday

