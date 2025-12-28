<script setup lang="ts">
import { ref } from "vue";
import BuildingType from "../components/BuildingType.vue";
import UserInfo from "../components/userInfo.vue";
import AddressInfo from "../components/AddressInfo.vue";
import { addressSchema } from "../schemas/validationSchema";
import BuildingInformation from "../components/BuildingInformation.vue";
import HeatingSystem from "../components/HeatingSystem.vue";
import ProjectInformation from "../components/ProjectInformation.vue";
import OwnershipInforation from "../components/OwnershipInforation.vue";
import SuccessPage from "../components/SuccessPage.vue";
import HeatingRoom from "../components/HeatingRoom.vue";
import LeadSnackBar from "../components/LeadSnackbar.vue";
import { FileUploadProps } from "../utils/types";
import { AxiosError } from "axios";
import stepperHelper from "../helpers/stepperHelper";
import { submitLead } from "../helpers/submitLeadHelper";
import { ValidationError } from "yup";
interface ErrorDataProps {
  reason: string;
  issues: string[];
}

interface LeadData {
  id: string;
  stage: string;
}
const {
  step,
  backupStep,
  values,
  handlePropertyTypeNext,
  checkForStepValidity,
  setFieldValue,
  handleSubmit,
} = stepperHelper();
const showLeadSnackBar = ref(false);
const leadObject = ref<LeadData>({
  id: "",
  stage: "",
});

const isLoading = ref(false);

const errorData = ref<ErrorDataProps>({
  reason: "",
  issues: [],
});

const notSupportedFlow = () => {
  backupStep.value = step.value;
  step.value = -1;
};

const addToWaitList = () => {
  showLeadSnackBar.value = true;
  errorData.value = {
    reason: "Your interest has been registered!",
    issues: ["500"],
  };
};

const goBack = () => {
  if (step.value > 1) {
    step.value -= 1;
  }
};

const previousStep = () => {
  step.value = backupStep.value;
};

const next = async () => {
  let isStepValid = false;

  try {
    isStepValid = await checkForStepValidity();
    if (step.value === 9) {
      await addressSchema.validate(values.contact.address, {
        abortEarly: false,
      });
      isLoading.value = true;
      isStepValid = false;
      await onFinalSubmit();
    }
  } catch (error: unknown) {
    console.log("Validation Error in eligibility:", error);
    if (error instanceof ValidationError) {
      showLeadSnackBar.value = true;
      errorData.value = {
        reason: "Please fix validation errors",
        issues: [""],
      };
    }
    isStepValid = false;
  }

  if (isStepValid) {
    step.value++;
  }
};

const onFileUploaded = (value: FileUploadProps) => {
  type SchemaPaths = Parameters<typeof setFieldValue>[0];
  setFieldValue(value.fieldName as SchemaPaths, value.files);
};

const onFinalSubmit = handleSubmit(async (values) => {
  console.log("onfinal Submit", values);
  try {
    const response = await submitLead(values);

    if (response.status === 201 || response.status === 200) {
      console.log("Lead created successfully!", response.data);
      leadObject.value.id = response.data.data._id;
      leadObject.value.stage = response.data.data.vamoData.leadStage;

      step.value = 10;
    }
  } catch (error: unknown) {
    const axiosError = error as AxiosError;

    console.error("Submission error:", axiosError.message);
    showLeadSnackBar.value = true;
    errorData.value = (axiosError?.response?.data as ErrorDataProps) || {
      reason: "Something went wrong!",
      issues: ["500"],
    };
  } finally {
    isLoading.value = false;
  }
});

const toggleSnackBar = (value: boolean) => {
  showLeadSnackBar.value = !value;
};
</script>

<template>
  <div class="eligibility-page-content d-flex justify-center align-center">
    <v-stepper class="w-100" non-linear v-model="step">
      <v-stepper-header>
        <v-stepper-item :value="1" :editable="false" title="Property Type" />
        <v-divider />
        <v-stepper-item
          :value="2"
          :editable="false"
          title="Building Information"
        />
        <v-divider />
        <v-stepper-item :value="3" :editable="false" title="Building Address" />
        <v-divider />
        <v-stepper-item :value="4" :editable="false" title="Heating System" />
        <v-divider />
        <v-stepper-item :value="5" :editable="false" title="Ownership" />
        <v-divider />
        <v-stepper-item :value="6" :editable="false" title="Project Planning" />
        <v-divider />
        <v-stepper-item :value="7" :editable="false" title="Heating Room" />
        <v-divider />
        <v-stepper-item :value="8" :editable="false" title="Contact Details" />
        <v-divider />
        <v-stepper-item :value="9" :editable="false" title="Contact Address" />
      </v-stepper-header>
      <v-stepper-window :style="{ minHeight: '600px' }" v-model="step">
        <v-stepper-window-item :value="1">
          <BuildingType
            @next="handlePropertyTypeNext"
            @notSupportedFlow="notSupportedFlow"
          />
        </v-stepper-window-item>
        <v-stepper-window-item :value="2">
          <BuildingInformation @next="next" @back="goBack" />
        </v-stepper-window-item>
        <v-stepper-window-item :value="3">
          <AddressInfo
            keyType="building"
            :isLoading="isLoading"
            @next="next"
            @back="goBack"
          />
        </v-stepper-window-item>
        <v-stepper-window-item :value="4">
          <HeatingSystem @next="next" @back="goBack" />
        </v-stepper-window-item>
        <v-stepper-window-item :value="5">
          <OwnershipInforation
            @next="next"
            @back="goBack"
            @onFileUploaded="onFileUploaded"
          />
        </v-stepper-window-item>
        <v-stepper-window-item :value="6">
          <ProjectInformation @next="next" @back="goBack" />
        </v-stepper-window-item>
        <v-stepper-window-item :value="7">
          <HeatingRoom
            @next="next"
            @back="goBack"
            @notSupportedFlow="notSupportedFlow"
          />
        </v-stepper-window-item>
        <v-stepper-window-item :value="8">
          <UserInfo @next="next" @back="goBack" />
        </v-stepper-window-item>
        <v-stepper-window-item :value="9">
          <AddressInfo
            keyType="contact"
            :isLoading="isLoading"
            @next="next"
            @back="goBack"
          />
        </v-stepper-window-item>
        <v-stepper-window-item :value="10">
          <SuccessPage :id="leadObject.id" :stage="leadObject.stage" />
        </v-stepper-window-item>
        <v-stepper-window-item :value="-1">
          <v-card
            class="pa-6 text-center d-flex justify-center align-center"
            :style="{ minHeight: '600px' }"
          >
            <v-row>
              <v-col cols="12">
                <v-icon size="48" color="warning"> mdi-alert-circle </v-icon>

                <h3 class="text-h6 mt-4">We don’t support this yet</h3>
                <p class="mt-2">
                  Heat pump installation for this type of house is not available
                  yet. You can join our waitlist and we’ll notify you.
                </p>
                <v-btn color="primary" class="mt-4" @click="addToWaitList">
                  Join Waitlist
                </v-btn>

                <v-btn class="mt-4 ml-4" color="error" @click="previousStep">
                  Back
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-stepper-window-item>
      </v-stepper-window>
    </v-stepper>
    <LeadSnackBar
      v-if="showLeadSnackBar"
      :errorData="errorData"
      :snackBarFlag="showLeadSnackBar"
      @toggleSnackBar="toggleSnackBar"
    />
  </div>
</template>

<style scoped>
.eligibility-page-content {
  margin: 0 10rem;
  height: 100%;
}
.v-stepper-window {
  min-height: 600px;
  display: flex;
  flex-direction: column;
}
</style>
