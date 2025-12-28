// Handles the stepper business logic
import { configure, useForm } from "vee-validate";
import { ref } from "vue";
import {
  addressSchema,
  buildingInformationSchema,
  leadValidationSchema,
} from "../schemas/validationSchema";
import { INIT_VALUES } from "../utils/types";

const stepperHelper = () => {
  const step = ref(1);
  const backupStep = ref(1);
  const SUPPORTED_HOUSE_TYPES = [
    "Single-family house / Two-family house",
    "Semi-detached house / Terraced house",
    "Apartment",
  ];

  configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: false,
    validateOnModelUpdate: true,
  });

  const { handleSubmit, setFieldValue, values, validateField } = useForm({
    validationSchema: leadValidationSchema,
    initialValues: INIT_VALUES,
  });

  const handlePropertyTypeNext = (value: string) => {
    const isSupported = SUPPORTED_HOUSE_TYPES.includes(value);

    if (!isSupported) {
      backupStep.value = step.value;
      step.value = -1;
      return;
    }
    setFieldValue("building.buildingInformation.immoType", value);
    step.value = 2;
  };

  const checkForStepValidity = async (): Promise<boolean> => {
    try {
      if (step.value === 2) {
        await buildingInformationSchema.validate(
          values.building.buildingInformation,
          {
            abortEarly: false,
          }
        );
        return true;
      } else if (step.value === 3) {
        await addressSchema.validate(values.building.address, {
          abortEarly: false,
        });
        return true;
      } else if (step.value === 8) {
        const results = await Promise.all([
          //   possible improvement is to extract these fields to keys so
          //   that in future if fields change in API we dont have to manually
          //   change these everywhere
          validateField("contact.contactInformation.firstName"),
          validateField("contact.contactInformation.lastName"),
          validateField("contact.contactInformation.email"),
          validateField("contact.contactInformation.phone"),
        ]);
        return results.every((result) => result.valid);
      } else if (step.value === 9) {
        await addressSchema.validate(values.contact.address, {
          abortEarly: false,
        });
        return true;
      } else {
        return true;
      }
    } catch (err: any) {
      throw err;
    }
  };

  return {
    step,
    backupStep,
    handleSubmit,
    setFieldValue,
    handlePropertyTypeNext,
    values,
    validateField,
    checkForStepValidity,
  };
};

export default stepperHelper;
