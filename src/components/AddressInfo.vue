<script setup lang="ts">
import { useField } from "vee-validate";

interface Props {
  keyType: string;
}

const props = defineProps<Props>();

interface Emits {
  (e: "next"): void;
  (e: "back"): void;
}

const emit = defineEmits<Emits>();

const {
  value: street,
  errorMessage: streetError,
  handleBlur: handleStreetBlur,
} = useField<string>(`${props.keyType}.address.street`);

const {
  value: city,
  errorMessage: cityError,
  handleBlur: handleCityBlur,
} = useField<string>(`${props.keyType}.address.city`);

const {
  value: postalCode,
  errorMessage: PostalCodeError,
  handleBlur: handlePostalCodeBlur,
} = useField<string>(`${props.keyType}.address.postalCode`);

const {
  value: countryCode,
  errorMessage: CountryCodeError,
  handleBlur: handleCountryCodeBlur,
} = useField<string>(`${props.keyType}.address.countryCode`);

const nextStep = () => {
  emit("next");
};
</script>

<template>
  <v-card class="pa-4 d-flex flex-column" :style="{ minHeight: '600px' }">
    <v-card-title class="text-h5 mb-6 px-0"
      >{{ props.keyType === "contact" ? "Contact" : "Building" }} Address
    </v-card-title>
    <v-card-subtitle class="px-0" v-if="props.keyType === 'building'">
      Please enter the address where you want to install the heat pump
    </v-card-subtitle>
    <v-card-subtitle v-if="props.keyType === 'contact'">
      Please enter your current address
    </v-card-subtitle>
    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="street"
          :error-messages="streetError"
          label="Street"
          variant="underlined"
          @blur="handleStreetBlur"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="city"
          :error-messages="cityError"
          label="City"
          variant="underlined"
          @blur="handleCityBlur"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="postalCode"
          :error-messages="PostalCodeError"
          label="Postal Code"
          type="email"
          variant="underlined"
          @blur="handlePostalCodeBlur"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="countryCode"
          :error-messages="CountryCodeError"
          label="Country Code"
          variant="underlined"
          @blur="handleCountryCodeBlur"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-spacer></v-spacer>
    <v-card-actions class="px-0 pb-0" justify="end" align-content="center">
      <v-spacer></v-spacer>
      <v-btn variant="outlined" size="large" @click="emit('back')">
        Back
      </v-btn>
      <v-btn variant="elevated" color="success" size="large" @click="nextStep">
        Next
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
