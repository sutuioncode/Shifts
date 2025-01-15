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
import { useShiftStore, Shift } from '../stores/shiftStore';

export default defineComponent({
  name: 'ShiftsList',
  setup() {
    const store = useShiftStore();

    const formatShift = (shift: Shift) => {
      return `Employee ${shift.employeeId}, Start: ${shift.startTime}, End: ${shift.endTime}, Days: ${shift.weekdays.join(', ')}, Duration: ${shift.duration} ${shift.durationType}`;
    };

    return { shifts: store.shifts, formatShift };
  },
});
</script>
