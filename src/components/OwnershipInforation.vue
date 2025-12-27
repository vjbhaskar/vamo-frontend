<script setup lang="ts">
import { useField } from "vee-validate";
import {
  FileUploadProps,
  OWNER_TYPE_TEXT,
  TYPE_OF_HEATING,
} from "../utils/types";
import FileUploader from "./FileUploader.vue";
interface Emits {
  (e: "next"): void;
  (e: "back"): void;
  (e: "onFileUploaded", value: FileUploadProps): void;
}

const emit = defineEmits<Emits>();

const {
  value: ownerType,
  errorMessage: ownerTypeError,
  handleBlur: handleOwnerTypeBlur,
} = useField<string>("building.ownershipRelationships.type");

const { value: ownerOccupied } = useField<boolean>(
  "building.ownershipRelationships.ownerOccupiedHousing"
);

const {
  value: heatedArea,
  errorMessage: heatedAreaError,
  handleBlur: handleHeatedAreaBlur,
} = useField<number>("building.energyRelevantInformation.heatedArea");

const {
  value: typeOfHeating,
  errorMessage: typeOfHeatingError,
  handleBlur: handleHeatingTypeBlur,
} = useField<string>("building.energyRelevantInformation.typeOfHeating");

const nextStep = () => {
  emit("next");
};

const fileUploaded = (value: any) => {
  emit("onFileUploaded", value);
};
</script>

<template>
  <v-card class="pa-4 d-flex flex-column" :style="{ minHeight: '600px' }">
    <v-card-title class="text-h5 mb-4 px-0">Ownership Details</v-card-title>
    <v-form class="d-flex flex-column flex-grow-1" @submit.prevent="nextStep">
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            v-model="ownerType"
            :items="OWNER_TYPE_TEXT"
            item-title="text"
            item-value="slug"
            label="Ownership Type"
            :error-messages="ownerTypeError"
            variant="underlined"
            @blur="handleOwnerTypeBlur"
          ></v-select>
        </v-col>
        <v-col cols="12" md="6" class="d-flex align-center">
          <v-checkbox
            v-model="ownerOccupied"
            label="Is this owner-occupied housing?"
            color="primary"
            hide-details
          ></v-checkbox>
        </v-col>
      </v-row>

      <v-divider class="my-6"></v-divider>

      <v-card-title class="text-h5 mb-4 px-0">Energy Information</v-card-title>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model.number="heatedArea"
            label="Heated Area"
            type="number"
            suffix="m²"
            :error-messages="heatedAreaError"
            variant="underlined"
            @blur="handleHeatedAreaBlur"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            v-model="typeOfHeating"
            :items="TYPE_OF_HEATING"
            label="Type of Heating"
            :error-messages="typeOfHeatingError"
            variant="underlined"
            @blur="handleHeatingTypeBlur"
          ></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <FileUploader
            fieldName="project.pictures.outdoorUnitLocation"
            label="Outdoor Unit Location"
            @file-uploaded="fileUploaded"
          />
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
