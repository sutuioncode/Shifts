<template>
  <div>
    <h2>Shifts List</h2>
    <ul>
      <li v-for="shift in shifts" :key="shift.id">
        {{ formatShift(shift) }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useShiftStore } from '../stores/shiftStore';
import type { Shift } from '../models/shift';

export default defineComponent({
  name: 'ShiftsList',
  setup() {
    const store = useShiftStore();
    console.log(store.shifts.slice())
    const formatShift = (shift: Shift) => {
      return `Employee ${shift.employeeId}, Start: ${shift.startTime}, End: ${shift.endTime}, Days: ${shift.ShiftDayOfWeek}, Duration: ${shift.repeatCount} ${shift.repeatCount}`;
    };

    return { shifts: store.shifts, formatShift };
  },
});
</script>
