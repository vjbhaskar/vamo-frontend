<script setup lang="ts">
import { useField } from "vee-validate";
import {
  YES_NO,
  ROOMS_BETWEEN_HEATING_OUTDOOR_TEXT,
  FLOORTYPES,
  GROUNDING_TYPE_TEXT,
} from "../utils/types";
interface Emits {
  (e: "next"): void;
  (e: "back"): void;
}

const emit = defineEmits<Emits>();

const {
  value: constructionYearString,
  errorMessage: constructionYearStringError,
} = useField<string>("building.buildingInformation.constructionYearString");

const { value: constructionYear, errorMessage: constructionYearError } =
  useField<string>("building.buildingInformation.constructionYear");

const { value: heritageProtection, errorMessage: heritageProtectionError } =
  useField<string>("building.buildingInformation.heritageProtection");

const { value: personsHousehold, errorMessage: personsHouseholdError } =
  useField<number>("building.buildingInformation.personsHousehold");

const { value: livingSpace, errorMessage: livingSpaceError } = useField<number>(
  "building.buildingInformation.livingSpace"
);

const { value: residentialUnits, errorMessage: residentialUnitsError } =
  useField<number>("building.buildingInformation.residentialUnits");

const { value: roomsBetween, errorMessage: roomsBetweenError } =
  useField<string>(
    "building.buildingInformation.roomsBetweenHeatingRoomAndOutdoorUnit"
  );

const { value: meterClosetLocation, errorMessage: meterClosetLocationError } =
  useField<string>("building.buildingInformation.meterClosetLocation");

const { value: electricityLocation, errorMessage: electricityLocationError } =
  useField<string>(
    "building.buildingInformation.electricityConnectionLocation"
  );

const { value: groundingType, errorMessage: groundingTypeError } =
  useField<string>("building.buildingInformation.groundingType");

const { value: hasSolarThermalSystem } = useField<boolean>(
  "building.buildingInformation.hasSolarThermalSystem"
);

const nextStep = () => {
  emit("next");
};
</script>

<template>
  <v-card class="pa-4 d-flex flex-column" :style="{ minHeight: '600px' }">
    <v-card-title class="text-h5 mb-6 px-0">Building Information</v-card-title>

    <v-form class="d-flex flex-column flex-grow-1" @submit.prevent="nextStep">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="constructionYear"
            type="number"
            label="Construction Year (e.g. 1950)"
            :error-messages="constructionYearError"
            variant="underlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="constructionYearString"
            label="Construction Year (e.g. 2001-2010)"
            :error-messages="constructionYearStringError"
            variant="underlined"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model.number="livingSpace"
            label="Living Space (sqm)"
            type="number"
            suffix="m²"
            :error-messages="livingSpaceError"
            variant="underlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model.number="residentialUnits"
            label="Residential Units"
            type="number"
            :error-messages="residentialUnitsError"
            variant="underlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model.number="personsHousehold"
            label="Persons in Household"
            type="number"
            :error-messages="personsHouseholdError"
            variant="underlined"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            v-model="roomsBetween"
            :items="ROOMS_BETWEEN_HEATING_OUTDOOR_TEXT"
            item-title="text"
            item-value="slug"
            label="Rooms between Indoor/Outdoor unit"
            :error-messages="roomsBetweenError"
            variant="underlined"
          ></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            v-model="groundingType"
            :items="GROUNDING_TYPE_TEXT"
            item-title="text"
            item-value="slug"
            label="Grounding Type"
            :error-messages="groundingTypeError"
            variant="underlined"
          ></v-select>
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            v-model="meterClosetLocation"
            :items="FLOORTYPES"
            label="Meter Closet Location"
            :error-messages="meterClosetLocationError"
            variant="underlined"
          ></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            v-model="electricityLocation"
            :items="FLOORTYPES"
            label="Electricity Connection Location"
            :error-messages="electricityLocationError"
            variant="underlined"
          ></v-select>
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            v-model="heritageProtection"
            :items="YES_NO"
            label="Heritage Protection?"
            :error-messages="heritageProtectionError"
            variant="underlined"
          ></v-select>
        </v-col>

        <v-col cols="12" md="4">
          <v-checkbox
            v-model="hasSolarThermalSystem"
            label="Has Solar Thermal System"
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
