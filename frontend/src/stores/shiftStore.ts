import { createShift } from '../services/api/create-shifts';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { CreateShiftSchema, ShiftSchema } from '../models/shift'
import type { Shift } from '../models/shift'
export interface Employee {
  id: number;
  name: string;
}


export const useShiftStore = defineStore('shiftStore', {
  state: () => ({
    employees: [] as Employee[],
    shifts: [] as Shift[],
    isLoadingEmployees: false as boolean,
    isLoadingShifts: false as boolean,
    loadingShiftsError: null as (string | null),
    isCreatingShifts: false as boolean,
    isCreatingShiftsError: false as boolean,
    creatingShiftsError: null as (string | null),
    dialogVisible: false as boolean,
    selectedShift: null as Shift | null,
  }),
  actions: {
    async addShift(shift: Shift) {
      try {
        this.creatingShiftsError = null
        this.isCreatingShiftsError = false
        this.isCreatingShifts = true


        const { data, error, success } = CreateShiftSchema.safeParse(shift)

        if (data && success) {
          const response = createShift(data)
          this.shifts.push(ShiftSchema.parse(response));

        } else {
          this.isCreatingShiftsError = true
          this.creatingShiftsError = `Ocoreu um erro ao validar o formulario: \n ${error.message}`
        }

      } catch {
        this.isCreatingShiftsError = true
        this.creatingShiftsError = "Ocoreu um error ao salvar o component"
      } finally {
        this.isCreatingShifts = false
      }
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
    handleEventClick(eventProps: any) {
      this.dialogVisible = true;
      console.log('handle click event', eventProps.extendedProps)
      const shiftData = eventProps.extendedProps;
      const employee = this.employees.find((e) => e.id === shiftData.employeeId);
      this.selectedShift = {
        ...shiftData,
        employeeName: employee?.name || 'Unknown',
      };
    },
    closeDialog() {
      this.dialogVisible = false;
      this.selectedShift = null;
    },
  },
});


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useShiftStore, import.meta.hot))
}