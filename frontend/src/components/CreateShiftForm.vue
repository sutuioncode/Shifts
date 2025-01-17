<template>
  <form @submit.prevent="submitShift">
    <h2>Create Shift</h2>

    <EmployeeDropdown v-model="selectedEmployee" />
    <div>
      <label for="startTime">Start Time:</label>
      <input type="time" id="startTime" v-model="startTime" required />
    </div>
    <div>
      <label for="endTime">End Time:</label>
      <input type="time" id="endTime" v-model="endTime" required />
    </div>
    <div style="display: flex; flex-direction: row">
      <label>Weekdays:</label>
      <div v-for="day in weekdays" :key="day">
        <label>
          <input type="checkbox" :value="day" v-model="selectedWeekdays" />
          {{ day }}
        </label>
      </div>
    </div>
    <div>
      <label>Duration:</label>
      <input type="number" v-model="duration" min="1" required />
      <select v-model="durationType">
        <option value="week">Weeks</option>
        <option value="month">Months</option>
      </select>
    </div>
    <div style="display: flex; flex-direction: column; padding-top: 1rem; ">
      <button :disabled="isCreatingShifts" type="submit">Save Shift</button>
      <label style="color: yellow;" v-if="isCreatingShifts">Creating Shift ...</label>
      <label style="color: red;" v-if="isCreatingShiftsError">{{ creatingShiftsError }}</label>
    </div>
    <label>{{ isCreatingShifts }}</label>
    <label>{{ isCreatingShiftsError }}</label>
  </form>
</template>

<script setup lang="ts">
import { addMonths } from 'date-fns/addMonths';
import { addWeeks } from 'date-fns/addWeeks';
import { computed, ref } from 'vue';
import type { Shift } from '../models/shift';
import { useShiftStore } from '../stores/shiftStore';
import EmployeeDropdown from './EmployeeDropdown.vue';

const store = useShiftStore();
const selectedEmployee = ref<number | ''>('');
const startTime = ref<string>('');
const endTime = ref<string>('');
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const selectedWeekdays = ref<string[]>([]);
const duration = ref<number>(1);
const durationType = ref<'week' | 'month'>('week');
var isCreatingShiftsError = computed(() => store.isCreatingShiftsError)
var isCreatingShifts = computed(() => store.isCreatingShifts)
var creatingShiftsError = computed(() => store.creatingShiftsError)

// const isCreatingShifts = store.isCreatingShifts


const date = new Date()

const submitShift = () => {
  store.addShift({
    id: 0, // ID will be added in the store
    employeeId: 1,
    employeeName: "Paulo",
    endDate: (durationType.value === 'week' ? addWeeks(date, duration.value) : addMonths(date, duration.value)).toISOString(),
    startDate: date.toISOString(),
    startTime: startTime.value,
    endTime: endTime.value,
    ShiftDayOfWeek: selectedWeekdays.value,
    repeatCount: duration.value,
    repeatCicleIn: durationType.value,
  } as Shift)
};



</script>
