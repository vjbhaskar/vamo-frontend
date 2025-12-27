<script setup lang="ts">
import { useField } from "vee-validate";

interface Emits {
  (e: "next"): void;
  (e: "back"): void;
}

const emit = defineEmits<Emits>();

const {
  value: firstName,
  errorMessage: firstNameError,
  handleBlur: handleFirstNameBlur,
} = useField<string>("contact.contactInformation.firstName");

const {
  value: lastName,
  errorMessage: lastNameError,
  handleBlur: handleLastNameBlur,
} = useField<string>("contact.contactInformation.lastName");

const {
  value: email,
  errorMessage: emailError,
  handleBlur: handleEmailBlur,
} = useField<string>("contact.contactInformation.email");

const {
  value: phone,
  errorMessage: phoneError,
  handleBlur: handlePhoneBlur,
} = useField<string>("contact.contactInformation.phone");

const { value: newsletterSingleOptIn } = useField<boolean>(
  "contact.contactInformation.newsletterSingleOptIn",
  undefined,
  { initialValue: false }
);

const nextStep = () => {
  emit("next");
};
</script>

<template>
  <v-card class="pa-4 d-flex flex-column" :style="{ minHeight: '600px' }">
    <v-card-title class="text-h6 mb-4 px-0">Contact Information</v-card-title>
    <v-form class="d-flex flex-column flex-grow-1" @submit.prevent="nextStep">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="firstName"
            :error-messages="firstNameError"
            variant="underlined"
            label="First Name *"
            @blur="handleFirstNameBlur"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="lastName"
            :error-messages="lastNameError"
            label="Last Name *"
            variant="underlined"
            @blur="handleLastNameBlur"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :error-messages="emailError"
            label="Email *"
            type="email"
            variant="underlined"
            @blur="handleEmailBlur"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="phone"
            :error-messages="phoneError"
            label="Phone *"
            type="tel"
            variant="underlined"
            placeholder="+49123456789"
            @blur="handlePhoneBlur"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-checkbox
            v-model="newsletterSingleOptIn"
            label="Subscribe to newsletter"
            color="primary"
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
