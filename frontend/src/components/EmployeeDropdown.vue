<template>
    <div>
        <label for="employee">Select Employee:</label>
        <select v-model="selectedOption" @change="onChange" id="employee" >
            <option disabled value="">Select an employee</option>
            <option v-for="employee in employees" :key="employee.id" :value="employee.id">
                {{ employee.name }}
            </option>
        </select>
        <p v-if="isLoading">Loading employees...</p>
    </div>
</template>
  
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useShiftStore, type Employee } from '../stores/shiftStore';


const store = useShiftStore();
const selectedOption = ref('');
const emit = defineEmits(['update:selectedOption']);

function onChange(event) {
    if (event.target == null) {
        emit('update:selectedOption', { id: 0, name: '' } as Employee);

        return;
    }

    const selectedElement = event.target.options[event.target.selectedIndex];
    emit('update:selectedOption', { id: parseInt(selectedElement.value), name: selectedElement.text });
}
onMounted(() => {
    store.fetchEmployees();
});



// Reactively track the employees from the store
const employees = computed(() => store.employees);
const isLoading = computed(() => store.isLoadingEmployees);

</script>
  