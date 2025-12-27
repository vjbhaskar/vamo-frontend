<script setup lang="ts">
import { useField } from "vee-validate";

interface Props {
  fieldName: string;
  label: string;
}

interface FileUploadProps {
  fieldName: string;
  files: File[];
}
interface Emits {
  (e: "next"): void;
  (e: "back"): void;
  (e: "fileUploaded", { fieldName, files }: FileUploadProps): void;
}
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const {
  value: files,
  errorMessage,
  handleBlur,
} = useField<File[]>(props.fieldName);

const onFileChange = (newFiles: File | File[]) => {
  files.value = Array.isArray(newFiles) ? newFiles : [newFiles];
  emit("fileUploaded", { fieldName: props.fieldName, files: files.value });
};
</script>

<template>
  <div class="d-flex flex-column">
    <v-form
      class="d-flex flex-column flex-grow-1"
      @submit.prevent="emit('next')"
    >
      <v-row>
        <v-col cols="12">
          <v-file-input
            v-model="files"
            :label="label"
            variant="outlined"
            multiple
            accept="image/*"
            :error-messages="errorMessage"
            @update:model-value="onFileChange"
            @blur="handleBlur"
            show-size
            counter
          >
            <template v-slot:selection="{ fileNames }">
              <template v-for="fileName in fileNames" :key="fileName">
                <v-chip size="small" label color="primary" class="me-2">
                  {{ fileName }}
                </v-chip>
              </template>
            </template>
          </v-file-input>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
