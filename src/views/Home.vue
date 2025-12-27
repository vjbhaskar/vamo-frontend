<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goToFormEligibility = () => {
  router.push({ name: "Eligibility" });
};
</script>

<template>
  <div class="landing-page-content d-flex justify-center align-center">
    <v-row>
      <v-col class="align-content-center" cols="6">
        <h2 class="text-h5 mt-15">
          Heat Homes not the Planet! Fill a short form and check for heat pump
          installation eligibility
        </h2>
        <div class="d-flex align-center">
          <v-btn
            class="mr-auto ml-auto mt-7"
            variant="tonal"
            size="large"
            elevation="2"
            prepend-icon="mdi-check-circle"
            @click="goToFormEligibility"
          >
            <template v-slot:prepend>
              <v-icon color="success"></v-icon>
            </template>
            Check Eligibility
          </v-btn>
        </div>
      </v-col>
      <v-col cols="6">
        <img class="landing-image" src="/property-images/landing-image.png" />
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.landing-page-content {
  margin: 0 10rem;
  height: 100%;
  .landing-image {
    height: 450px;
  }
}
</style>
