<template>
    <FullCalendar ref="calendarRef" :options="calendarOptions" />
</template>
  
<script setup lang="ts">
import type { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import FullCalendar from '@fullcalendar/vue3';
import { format } from 'date-fns';
import { computed, useTemplateRef, watch } from 'vue';
import { useShiftStore } from '../stores/shiftStore';


const store = useShiftStore();
const calendarRef = useTemplateRef<typeof FullCalendar>('calendarRef')

// Transform shifts into FullCalendar event format
const calendarEvents = computed(() =>
    store.shifts.map((shift) => ({
        id: shift.id.toString(),
        interactive: false,
        title: `${shift.employeeName}`,
        start: `${format(shift.startDate, 'yyyy-MM-dd')} ${shift.startTime}`, // Assuming shift.startTime is ISO format
        end: `${format(shift.endDate, 'yyyy-MM-dd')} ${shift.endTime}`, // Assuming shift.startTime is ISO format
    }))
);

console.log(calendarEvents.value)
watch(store.shifts, () => {
    (calendarRef.value?.getApi() as Calendar).refetchEvents()
})

const calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: (_, onSuccess, __) => {
        onSuccess(
            calendarEvents.value
        )

    }
}


</script>