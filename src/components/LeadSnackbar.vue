<script setup lang="ts">
interface ErrorDataProps {
  reason: string;
  issues: string[];
}
interface Props {
  errorData: ErrorDataProps;
  snackBarFlag: boolean;
}
interface Emits {
  (e: "toggleSnackBar", flag: boolean): void;
}
const props = defineProps<Props>();
const toggleSnackBar = () => {
  emit("toggleSnackBar", props.snackBarFlag);
};

const emit = defineEmits<Emits>();
</script>
<template>
  <div class="text-center ma-2">
    <v-snackbar v-model="props.snackBarFlag">
      {{ props.errorData.reason }}

      <template v-slot:actions>
        <!-- Show a button to open a modal and show all the errors -->
        <!-- <v-btn color="pink" variant="text" @click="openModal"> Close </v-btn> -->
        <v-btn color="pink" variant="text" @click="toggleSnackBar">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
