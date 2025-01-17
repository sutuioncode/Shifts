import { createShift } from '../services/api/create-shifts';
import { listShift } from '../services/api/list-shifts';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { CreateShiftSchema, ShiftSchema } from '../models/shift'
import { getWeekdayDate } from '../utils/data'
import type { Shift } from '../models/shift'
import { addDays, endOfMonth, endOfWeek, format, isBefore, startOfMonth, startOfWeek } from 'date-fns';
export interface Employee {
  id: number;
  name: string;
}

export interface Event {
  title: string
  date: string
  id: string
}


export const useShiftStore = defineStore('shiftStore', {
  state: () => ({
    employees: [] as Employee[],
    shifts: [] as Event[],
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
          const response = await createShift(data)
          this.listShifts(new Date(shift.startDate))

        } else {
          this.isCreatingShiftsError = true
          this.creatingShiftsError = `Ocoreu um erro ao validar o formulario: \n ${error.message}`
        }

      } catch (error) {
        this.isCreatingShiftsError = true
        this.creatingShiftsError = "Ocoreu um error ao salvar o component"
        console.log(error)
      } finally {
        this.isCreatingShifts = false
      }
    },
    async listShifts(currentDate: Date) {
      this.isLoadingShifts = true;
      const start = startOfMonth(currentDate)
      const end = endOfMonth(currentDate)
      try {

        const response = await listShift(format(start, 'yyyy-MM-dd'), format(end, 'yyyy-MM-dd'))
        for (const shift of response) {
          for (const day of shift.ShiftDayOfWeek) {
            const date = getWeekdayDate(start, day)
            const week = startOfWeek(date)

            console.log({ date, week, start })
            if (isBefore(week, date)) {
              const newDate = addDays(date, 7)
              this.shifts.push({
                id: day,
                date: `${format(newDate, 'yyyy-MM-dd')} ${shift.startTime}`,
                title: shift.employeeName
              })
            } else {

              this.shifts.push({
                id: day,
                date: `${format(date, 'yyyy-MM-dd')} ${shift.startTime}`,
                title: shift.employeeName
              })

            }
          }
        }

      } catch (error) {

        console.log(error)

      } finally {
        this.isLoadingShifts = false
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