<template>
  <div>
    <button @click="showDialog = !showDialog" class="open-dialog-button">
      Criar Turno
    </button>

    <!-- Dialog -->
    <div v-if="showDialog" class="dialog-overlay">
      <div class="dialog">
        <button @click="closeDialog" class="close-dialog-button">X</button>
        
        <form @submit.prevent="submitShift" class="shift-form">
          <h2>Criar Turno</h2>

          <EmployeeDropdown @update:selectedOption="selectedEmployee = $event" />

          <div class="input-group">
            <label for="startTime">Hora de Início:</label>
            <input type="time" id="startTime" v-model="startTime" required />
          </div>

          <div class="input-group">
            <label for="endTime">Hora de Fim:</label>
            <input type="time" id="endTime" v-model="endTime" required />
          </div>

          <div class="weekdays-group">
            <label>Dias da Semana:</label>
            <div class="weekdays">
              <label v-for="day in weekdays" :key="day">
                <input type="checkbox" :value="day" v-model="selectedWeekdays" />
                {{ day }}
              </label>
            </div>
          </div>

          <div class="input-group">
            <label for="duration">Duração:</label>
            <input type="number" v-model="duration" min="1" required />
            <select v-model="durationType">
              <option value="week">Semanas</option>
              <option value="month">Meses</option>
            </select>
          </div>

          <div class="action-buttons">
            <button :disabled="isCreatingShifts" type="submit">Salvar Turno</button>
            <div class="status-message">
              <label v-if="isCreatingShifts" class="status-loading">Criando Turno...</label>
              <label v-if="isCreatingShiftsError" class="status-error">{{ creatingShiftsError }}</label>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { addMonths } from 'date-fns/addMonths';
import { addWeeks } from 'date-fns/addWeeks';
import { computed, ref } from 'vue';
import type { Shift } from '../models/shift';
import { useShiftStore, type Employee } from '../stores/shiftStore';
import EmployeeDropdown from './EmployeeDropdown.vue';
import {weekdays} from './../utils/data'

const store = useShiftStore();
const selectedEmployee = ref<Employee>({ id: 0, name: '' });
const startTime = ref<string>('');
const endTime = ref<string>('');
const selectedWeekdays = ref<string[]>([]);
const duration = ref<number>(1);
const durationType = ref<'week' | 'month'>('week');
const isCreatingShiftsError = computed(() => store.isCreatingShiftsError);
const isCreatingShifts = computed(() => store.isCreatingShifts);
const creatingShiftsError = computed(() => store.creatingShiftsError);

const showDialog = ref<boolean>(false);

const closeDialog = () => {
  showDialog.value = false;
  resetForm(); // Reset the form when closing the dialog
};

const resetForm = () => {
  selectedEmployee.value = { id: 0, name: '' };
  startTime.value = '';
  endTime.value = '';
  selectedWeekdays.value = [];
  duration.value = 1;
  durationType.value = 'week';
};

const submitShift = () => {
  const date = new Date();
  store.addShift({
    id: 0,
    employeeId: selectedEmployee.value.id,
    employeeName: selectedEmployee.value.name,
    endDate: (durationType.value === 'week' ? addWeeks(date, duration.value) : addMonths(date, duration.value)).toISOString(),
    startDate: date.toISOString(),
    startTime: startTime.value,
    endTime: endTime.value,
    ShiftDayOfWeek: selectedWeekdays.value,
    repeatCount: duration.value,
    repeatCicleIn: durationType.value,
  } as Shift);

};
</script>

<style scoped>
/* Dialog Overlay */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

.close-dialog-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 20px;
  color: #333;
  cursor: pointer;
}

.open-dialog-button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.open-dialog-button:hover {
  background-color: #45a049;
}

/* Rest of the styling remains the same */
.shift-form-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.shift-form h2 {
  text-align: center;
  color: #333;
}

.input-group {
  margin-bottom: 15px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
  text-align: left;
}

.input-group input,
.input-group select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.weekdays-group {
  margin-bottom: 15px;
}

.weekdays-group label {
  font-weight: bold;
  color: #555;
  margin-bottom: 5px;
}

.weekdays {
  display: flex;
  flex-wrap: wrap;
}

.weekdays label {
  margin-right: 20px;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover {
  background-color: #45a049;
}

.status-message {
  margin-top: 10px;
}

.status-loading {
  color: yellow;
  font-weight: bold;
}

.status-error {
  color: red;
  font-weight: bold;
}
</style>
