<script setup lang="ts">
import { useField } from "vee-validate";
import {
  HOUSE_HOLD_INCOME_TEXT,
  STATUS_OF_FOUNDATION_CONSTRUCTION,
  DISPOSAL_TYPES_TEXT,
} from "../utils/types";

interface Emits {
  (e: "next"): void;
  (e: "back"): void;
}

const emit = defineEmits<Emits>();

const {
  value: householdIncome,
  errorMessage: incomeError,
  handleBlur: handleIncomeBlur,
} = useField<string>("project.householdIncome");

const {
  value: statusFoundation,
  errorMessage: statusError,
  handleBlur: handleStatusBlur,
} = useField<string>("project.statusOfFoundationConstruction");

const { value: fullReplacement } = useField<boolean>(
  "project.fullReplacementOfHeatingSystemPlanned"
);

const {
  value: additionalDisposal,
  errorMessage: disposalError,
  handleBlur: handleDisposalBlur,
} = useField<string[]>("project.additionalDisposal");

const {
  value: infosLeadsource,
  errorMessage: leadsourceError,
  handleBlur: handleLeadsourceBlur,
} = useField<string>("project.infosLeadsource");

const nextStep = () => {
  emit("next");
};
</script>

<template>
  <v-card class="pa-4 d-flex flex-column" :style="{ minHeight: '600px' }">
    <v-card-title class="text-h5 mb-6 px-0">Project Planning</v-card-title>

    <v-form class="d-flex flex-column flex-grow-1" @submit.prevent="nextStep">
      <v-row>
        <v-col cols="12" md="4">
          <v-select
            v-model="householdIncome"
            :items="HOUSE_HOLD_INCOME_TEXT"
            item-title="text"
            item-value="slug"
            label="Household Income"
            :error-messages="incomeError"
            variant="underlined"
            @blur="handleIncomeBlur"
          ></v-select>
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            v-model="statusFoundation"
            :items="STATUS_OF_FOUNDATION_CONSTRUCTION"
            label="Foundation Construction Status"
            :error-messages="statusError"
            variant="underlined"
            @blur="handleStatusBlur"
          ></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            v-model="additionalDisposal"
            :items="DISPOSAL_TYPES_TEXT"
            item-title="text"
            item-value="slug"
            label="Additional Disposal Needed"
            multiple
            chips
            closable-chips
            :error-messages="disposalError"
            variant="underlined"
            @blur="handleDisposalBlur"
          ></v-select>
        </v-col>

        <v-col cols="12">
          <v-textarea
            v-model="infosLeadsource"
            label="Additional Information / Lead Source"
            :error-messages="leadsourceError"
            variant="underlined"
            rows="3"
            @blur="handleLeadsourceBlur"
          ></v-textarea>
        </v-col>

        <v-col cols="12">
          <v-checkbox
            v-model="fullReplacement"
            label="Full replacement of heating system planned?"
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
