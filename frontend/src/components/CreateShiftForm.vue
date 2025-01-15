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
    <button type="submit">Save Shift</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useShiftStore } from '../stores/shiftStore';
import EmployeeDropdown from './EmployeeDropdown.vue';

export default defineComponent({
  name: 'CreateShiftForm',
  components: { EmployeeDropdown },
  setup() {
    const store = useShiftStore();
    const selectedEmployee = ref<number | ''>('');
    const startTime = ref<string>('');
    const endTime = ref<string>('');
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const selectedWeekdays = ref<string[]>([]);
    const duration = ref<number>(1);
    const durationType = ref<'week' | 'month'>('week');

    const submitShift = () => {
      store.addShift({
        id: 0, // ID will be added in the store
        employeeId: selectedEmployee.value as number,
        startTime: startTime.value,
        endTime: endTime.value,
        weekdays: selectedWeekdays.value,
        duration: duration.value,
        durationType: durationType.value,
      });
      alert('Shift added successfully!');
    };

    return {
      selectedEmployee,
      startTime,
      endTime,
      weekdays,
      selectedWeekdays,
      duration,
      durationType,
      submitShift,
    };
  },
});
</script>
