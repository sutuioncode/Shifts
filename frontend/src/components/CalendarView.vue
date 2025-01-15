<template>
    <div>
        <FullCalendar :options="calendarOptions" />
    </div>
</template>
  
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useShiftStore } from '../stores/shiftStore';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

export default defineComponent({
    name: 'CalendarView',
    components: { FullCalendar },
    setup() {
        const store = useShiftStore();
        const weekdayToIndex = (day: string): number => {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            return days.indexOf(day);
        };
        // Transform shifts into FullCalendar event format
        const calendarEvents = computed(() =>
            store.shifts.map((shift) => ({
                id: shift.id,
                title: `${shift.startTime} - ${shift.endTime}`,
                start: '2025-01-15 10:00', // Assuming shift.startTime is ISO format
                end: '2025-01-18 12:00',     // Assuming shift.endTime is ISO format
                daysOfWeek: shift.weekdays.map((day) => weekdayToIndex(day)),
            }))
        );

        const calendarOptions = {
            editable: true,
            selectable: true,
            selectMirror: true,
            dayMaxEvents: true,
            weekends: true,
            plugins: [dayGridPlugin, timeGridPlugin],
            events: calendarEvents.value,
            initialView: 'dayGridMonth'

        }


        console.log( calendarEvents.value)
        // Helper function to convert weekday names to FullCalendar indices


        return { calendarEvents, calendarOptions };
    },
});
</script>
  
<style>
/* Add optional styles for better calendar appearance */
</style>
  