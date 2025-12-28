<script setup lang="ts">
import { useRouter } from "vue-router";
interface Props {
  id: string;
  stage: string;
}
const router = useRouter();
const props = defineProps<Props>();

const handleGoHome = () => {
  router.push("/");
};
</script>
<template>
  <!-- Genereated this UI using AI -->
  <v-card
    class="pa-8 text-center d-flex flex-column justify-center align-center"
    :style="{ minHeight: '600px' }"
    variant="flat"
  >
    <v-avatar color="success" size="100" class="mb-6 elevation-4">
      <v-icon size="60" color="white">mdi-check-all</v-icon>
    </v-avatar>

    <v-card-title class="text-h4 font-weight-bold text-success mb-2">
      Submission Successful!
    </v-card-title>

    <v-card-subtitle class="text-h6 mb-6">
      Your lead ID:
      <span class="text-primary font-weight-black">{{ id || "12345" }}</span>
      <span> Your lead is current in stage: {{ stage }}</span>
    </v-card-subtitle>

    <v-card-text
      class="text-body-1 text-grey-darken-1 mb-8"
      style="max-width: 500px"
    >
      Thank you for your trust. Sit back and relax while our experts review your
      building information. We will notify you via email once your application
      moves to the next stage.
    </v-card-text>

    <v-divider class="w-100 mb-8"></v-divider>

    <div class="d-flex flex-column flex-sm-row ga-4">
      <v-btn
        variant="outlined"
        size="large"
        prepend-icon="mdi-home"
        rounded="pill"
        @click="handleGoHome"
      >
        Go to Home
      </v-btn>
    </div>
  </v-card>
</template>
