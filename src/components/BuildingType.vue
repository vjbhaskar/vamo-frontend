<script setup lang="ts">
import { ref } from "vue";
import { IMMOTYPE_DATA } from "../utils/types";

interface Emits {
  (e: "next", value: string): void;
  (e: "notSupportedFlow"): void;
}

const isApartmentType = ref(false);
const propertyType = ref("");
const emit = defineEmits<Emits>();

const getImageUrl = (path: string): string => {
  return `/src/assets/${path}`;
};

const selectPropertyType = (propertySelected: string) => {
  if (propertySelected === "Apartment") {
    isApartmentType.value = true;
    propertyType.value = propertySelected;
  } else {
    emit("next", propertySelected);
  }
};

const selectHeatingType = (heatingType: string) => {
  if (heatingType === "yes") {
    emit("next", propertyType.value);
  } else {
    emit("notSupportedFlow");
    isApartmentType.value = false;
  }
};
</script>

<template>
  <v-card class="pa-4" :style="{ minHeight: '600px' }">
    <v-card-title class="text-h6 mb-4">Select Your Property Type</v-card-title>

    <div class="d-flex flex-wrap ga-4" v-if="!isApartmentType">
      <v-card
        class="property-card"
        v-for="houseType in IMMOTYPE_DATA"
        :key="houseType.text"
        @click="selectPropertyType(houseType.text)"
        hover
      >
        <v-card-text class="text-center">
          <img
            class="property-image"
            :src="getImageUrl(houseType.image)"
            :alt="houseType.text"
          />
          <p class="mt-2">{{ houseType.text }}</p>
        </v-card-text>
      </v-card>
    </div>
    <div v-else>
      <v-card
        class="pa-6 text-center d-flex justify-center align-center"
        :style="{ minHeight: '600px' }"
      >
        <v-row>
          <v-col cols="12">
            <h3 class="mt-2">
              Is the apartment on the ground floor with its own heating system
            </h3>
            <v-btn
              color="primary"
              class="mt-4"
              @click="selectHeatingType('yes')"
            >
              Yes
            </v-btn>

            <v-btn
              class="mt-4 ml-4"
              color="error"
              @click="selectHeatingType('no')"
            >
              No
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </v-card>
</template>
<style scoped>
.property-card {
  width: 43vh;
}
</style>
