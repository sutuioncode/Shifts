<template>
    <div>
      <label for="employee">Select Employee:</label>
      <select v-model="selectedEmployee" id="employee">
        <option disabled value="">Select an employee</option>
        <option v-for="employee in employees" :key="employee.id" :value="employee.id">
          {{ employee.name }}
        </option>
      </select>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useShiftStore, IEmployee } from '../stores/shiftStore';
  
  export default defineComponent({
    name: 'EmployeeDropdown',
    setup() {
      const store = useShiftStore();
      const selectedEmployee = ref<number | ''>('');
  
      onMounted(() => {
        store.fetchEmployees();
      });
      console.log(store.employees)
      return { employees: store.employees, selectedEmployee };
    },
  });
  </script>
  