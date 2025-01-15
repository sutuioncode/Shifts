import { defineStore } from 'pinia';

export interface Employee {
  id: number;
  name: string;
}

export interface Shift {
  id: number;
  employeeId: number;
  startTime: string;
  endTime: string;
  weekdays: string[];
  duration: number;
  durationType: 'week' | 'month';
}

export const useShiftStore = defineStore('shiftStore', {
  state: () => ({
    employees: [] as Employee[],
    shifts: [] as Shift[],
    isLoadingEmployees: false as boolean,
    isLoadingShifts: false as boolean
  }),
  actions: {
    addShift(shift: Shift) {
      this.shifts.push({ ...shift, id: this.shifts.length + 1 });
    },
    fetchEmployees() {
      // Simulated API call
      this.isLoadingEmployees = true;
      this.employees = [
        { id: 1, name: 'Marcus Aurelius' },
        { id: 2, name: 'Cesare Borgia' },
      ];
      this.isLoadingEmployees = false;
      console.log('Fetched Emplyees')
    },
  },
});
