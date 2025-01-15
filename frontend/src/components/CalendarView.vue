<template>
    <FullCalendar :options="calendarOptions" />
</template>
  
<script lang="ts">
import type { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import FullCalendar from '@fullcalendar/vue3';
import { computed, defineComponent } from 'vue';
import { useShiftStore } from '../stores/shiftStore';


export default defineComponent({
    name: 'CalendarView',
    components: { FullCalendar },
    setup() {
        const store = useShiftStore();

        // Transform shifts into FullCalendar event format
        const calendarEvents = computed(() =>
            store.shifts.map((shift) => ({
                id: shift.id.toString(),
                title: `${shift.startTime} - ${shift.endTime}`,
                start: '2025-01-15 10:00', // Assuming shift.startTime is ISO format
                end: '2025-01-18 12:00',     // Assuming shift.endTime is ISO format

            }))
        );

        const calendarOptions: CalendarOptions = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            initialView: 'dayGridMonth',
            events: (_, onSuccess, __) => {

                onSuccess(
                    calendarEvents.value
                )

            }
        }

        return { calendarOptions };
    },

});
</script>
  
<style>
/* Add optional styles for better calendar appearance */
</style>
  