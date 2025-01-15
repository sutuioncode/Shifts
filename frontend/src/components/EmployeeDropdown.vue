<template>
    <div>
        <label for="employee">Select Employee:</label>
        <select v-model="selectedEmployee" id="employee">
            <option disabled value="">Select an employee</option>
            <option v-for="employee in employees" :key="employee.id" :value="employee.id">
                {{ employee.name }}
            </option>
        </select>
        <p v-if="isLoading">Loading employees...</p>
        <p > {{ store.isLoadingEmployees }}</p>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useShiftStore, IEmployee } from '../stores/shiftStore';

export default defineComponent({
    name: 'EmployeeDropdown',
    setup() {
        const store = useShiftStore();
        const selectedEmployee = ref<number | ''>('');

        onMounted(() => {
            console.log("ONMOUNT")
            store.fetchEmployees();
        });
        // Reactively track the employees from the store
        const employees = computed(() => store.employees);
        const isLoading = computed(() => store.isLoadingEmployees);
        return { employees: store.employees, selectedEmployee, isLoading };
    },
});
</script>
  