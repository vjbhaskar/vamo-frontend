<script setup lang="ts">
import { useField } from "vee-validate";
import {
  YES_NO,
  INSTALLATION_HEIGHT,
  LOCATION_HEATING,
  BOILER_ROOM_SIZE,
  TIMELINE,
} from "../utils/types";
import { computed, watch } from "vue";

interface Emits {
  (e: "next"): void;
  (e: "back"): void;
  (e: "notSupportedFlow"): void;
}

const emit = defineEmits<Emits>();

const { value: boilerRoomSize, errorMessage: boilerRoomSizeError } =
  useField<string>("building.buildingInformation.boilerRoomSize");

const { value: ceilingHeight, errorMessage: ceilingHeightError } =
  useField<string>(
    "building.buildingInformation.installationLocationCeilingHeight"
  );

const { value: widthPathway, errorMessage: widthPathwayError } =
  useField<string>("building.buildingInformation.widthPathway");

const { value: heightPathway, errorMessage: heightPathwayError } =
  useField<string>("building.buildingInformation.heightPathway");

const {
  value: timeline,
  errorMessage: timelineError,
  handleBlur: handleTimelineBlur,
} = useField<string>("project.timeline");

const {
  value: locationHeating,
  errorMessage: locationHeatingError,
  handleBlur: handleLocationBlur,
} = useField<string>("building.energyRelevantInformation.locationHeating");

watch(locationHeating, (newValue) => {
  const supportedLocations = ["Basement", "Ground floor"];

  if (newValue && !supportedLocations.includes(newValue)) {
    emit("notSupportedFlow");
  }
});

watch(ceilingHeight, (newValue) => {
  if (newValue && newValue === "lower than 180 cm") {
    emit("notSupportedFlow");
  }
});

watch(heightPathway, (newValue) => {
  if (newValue && newValue === "No") {
    emit("notSupportedFlow");
  }
});

watch(widthPathway, (newValue) => {
  if (newValue && newValue === "No") {
    emit("notSupportedFlow");
  }
});

watch(boilerRoomSize, (newValue) => {
  if (newValue && newValue === "less than 4 square meters") {
    emit("notSupportedFlow");
  }
});
const showUsableSpace = computed(() => {
  return (
    locationHeating.value === "Basement" ||
    locationHeating.value === "Ground floor"
  );
});

const showCeilingHeight = computed(() => {
  return boilerRoomSize.value === "more than 4 square meters";
});

const showWidthPathway = computed(() => {
  return (
    ceilingHeight.value === "180 - 199 cm" ||
    ceilingHeight.value === "higher than 199 cm"
  );
});

const showHeightPathway = computed(() => {
  return widthPathway.value === "Yes";
});

const showTimeline = computed(() => {
  return heightPathway.value === "Yes";
});

const nextStep = () => {
  emit("next");
};
</script>

<template>
  <v-card class="pa-4 d-flex flex-column" :style="{ minHeight: '600px' }">
    <v-card-title class="text-h5 mb-4 px-0"
      >Heating Room Information</v-card-title
    >
    <v-form @submit.prevent="nextStep" class="d-flex flex-column flex-grow-1">
      <v-row>
        <v-col cols="12" md="4">
          <v-select
            v-model="locationHeating"
            :items="LOCATION_HEATING"
            label="Heating Location"
            :error-messages="locationHeatingError"
            variant="underlined"
            @blur="handleLocationBlur"
          ></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            v-if="showUsableSpace"
            v-model="boilerRoomSize"
            :items="BOILER_ROOM_SIZE"
            label="Boiler Room Size"
            :error-messages="boilerRoomSizeError"
            variant="underlined"
          ></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            v-model="ceilingHeight"
            v-if="showCeilingHeight"
            :items="INSTALLATION_HEIGHT"
            label="Ceiling Height"
            :error-messages="ceilingHeightError"
            variant="underlined"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-select
            v-model="widthPathway"
            v-if="showWidthPathway"
            :items="YES_NO"
            label="Pathway Width > 1m?"
            :error-messages="widthPathwayError"
            variant="underlined"
          ></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            v-model="heightPathway"
            v-if="showHeightPathway"
            :items="YES_NO"
            label="Pathway Height > 2m?"
            :error-messages="heightPathwayError"
            variant="underlined"
          ></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            v-model="timeline"
            v-if="showTimeline"
            :items="TIMELINE"
            label="Project Timeline"
            :error-messages="timelineError"
            variant="underlined"
            @blur="handleTimelineBlur"
          ></v-select>
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
