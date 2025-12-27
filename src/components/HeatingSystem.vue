<script setup lang="ts">
import { useField } from "vee-validate";
import {
  SYSTEM_TYPE,
  DOMESTIC_PUMP_TEXT,
  DOMESTIC_WATER_STATION_TEXT,
} from "../utils/types";
import { computed } from "vue";

interface Emits {
  (e: "next"): void;
  (e: "back"): void;
}

const emit = defineEmits<Emits>();

const unitOptions = computed(() => {
  if (systemType.value === "Heating oil") {
    return ["Liters (l)"];
  }
  return ["Kilowatt hours (kWh)"];
});

const {
  value: systemType,
  errorMessage: systemTypeError,
  handleBlur: handleSystemTypeBlur,
} = useField<string>("heatingSystem.systemType");

const {
  value: consumption,
  errorMessage: consumptionError,
  handleBlur: handleConsumptionBlur,
} = useField<number>("heatingSystem.consumption");

const {
  value: consumptionUnit,
  errorMessage: consumptionUnitError,
  handleBlur: handleConsumptionUnitBlur,
} = useField<string>("heatingSystem.consumptionUnit");

const {
  value: constructionYear,
  errorMessage: constructionYearError,
  handleBlur: handleConstructionYearBlur,
} = useField<number>("heatingSystem.constructionYearHeatingSystem");

const { value: floorHeatingConnectedToReturnPipe } = useField<boolean>(
  "heatingSystem.floorHeatingConnectedToReturnPipe"
);

const { value: floorHeatingOwnHeatingCircuit } = useField<boolean>(
  "heatingSystem.floorHeatingOwnHeatingCircuit"
);

const { value: floorHeatingOnlyInSmallRooms } = useField<boolean>(
  "heatingSystem.floorHeatingOnlyInSmallRooms"
);

const {
  value: numberOfFloorHeatingDistributors,
  errorMessage: distributorsError,
  handleBlur: handleDistributorsBlur,
} = useField<number>("heatingSystem.numberOfFloorHeatingDistributors");

const {
  value: numberOfRadiators,
  errorMessage: radiatorsError,
  handleBlur: handleRadiatorsBlur,
} = useField<number>("heatingSystem.numberOfRadiators");

const { value: domesticHotWaterByHeatpump } = useField<boolean>(
  "heatingSystem.domesticHotWaterByHeatpump"
);

const {
  value: circulationPump,
  errorMessage: circulationPumpError,
  handleBlur: handleCirculationPumpBlur,
} = useField<string>("heatingSystem.domesticHotWaterCirculationPump");

const {
  value: waterStation,
  errorMessage: waterStationError,
  handleBlur: handleWaterStationBlur,
} = useField<string>("heatingSystem.domestic_water_station");

const nextStep = () => {
  emit("next");
};
</script>

<template>
  <v-card class="pa-4" :style="{ minHeight: '600px' }">
    <v-card-title class="text-h5 mb-6 px-0"
      >Heating System Details</v-card-title
    >

    <v-form class="d-flex flex-column flex-grow-1" @submit.prevent="nextStep">
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            v-model="systemType"
            :items="SYSTEM_TYPE"
            label="Current Heating System Type"
            :error-messages="systemTypeError"
            variant="underlined"
            @blur="handleSystemTypeBlur"
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model.number="constructionYear"
            label="Construction Year of Heating System"
            type="number"
            :error-messages="constructionYearError"
            variant="underlined"
            @blur="handleConstructionYearBlur"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model.number="consumption"
            label="Annual Consumption"
            type="number"
            :error-messages="consumptionError"
            variant="underlined"
            @blur="handleConsumptionBlur"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="consumptionUnit"
            :items="unitOptions"
            label="Consumption Unit"
            :error-messages="consumptionUnitError"
            variant="underlined"
            @blur="handleConsumptionUnitBlur"
          ></v-select>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model.number="numberOfRadiators"
            label="Number of Radiators"
            type="number"
            :error-messages="radiatorsError"
            variant="underlined"
            @blur="handleRadiatorsBlur"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model.number="numberOfFloorHeatingDistributors"
            label="Floor Heating Distributors"
            type="number"
            :error-messages="distributorsError"
            variant="underlined"
            @blur="handleDistributorsBlur"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            v-model="circulationPump"
            :items="DOMESTIC_PUMP_TEXT"
            item-title="text"
            item-value="slug"
            label="Circulation Pump"
            :error-messages="circulationPumpError"
            variant="underlined"
            @blur="handleCirculationPumpBlur"
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="waterStation"
            :items="DOMESTIC_WATER_STATION_TEXT"
            item-title="text"
            item-value="slug"
            label="Domestic Water Station"
            :error-messages="waterStationError"
            variant="underlined"
            @blur="handleWaterStationBlur"
          ></v-select>
        </v-col>

        <v-col cols="12" md="6">
          <v-checkbox
            v-model="domesticHotWaterByHeatpump"
            label="Hot water by heat pump?"
            color="primary"
            hide-details
          ></v-checkbox>
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            v-model="floorHeatingOwnHeatingCircuit"
            label="Own heating circuit for floor heating?"
            color="primary"
            hide-details
          ></v-checkbox>
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            v-model="floorHeatingConnectedToReturnPipe"
            label="Connected to return pipe?"
            color="primary"
            hide-details
          ></v-checkbox>
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            v-model="floorHeatingOnlyInSmallRooms"
            label="Floor heating only in small rooms?"
            color="primary"
            hide-details
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-card-actions class="px-0 pb-0" justify="end" align-content="center">
        <v-spacer></v-spacer>
        <v-btn variant="outlined" size="large" @click="emit('back')">
          Back
        </v-btn>
        <v-btn variant="elevated" color="success" size="large" type="submit">
          Next
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
