import * as yup from "yup";
import {
  IMMOTYPE,
  YES_NO,
  FLOORTYPES,
  DISPOSAL_TYPES,
  LOCATION_HEATING,
  TYPE_OF_HEATING,
  TIMELINE,
  TYPE_OF_SHOWER_HEADS,
  INSTALLATION_HEIGHT,
  ROOMS_BETWEEN_HEATING_OUTDOOR,
  STATUS_OF_FOUNDATION_CONSTRUCTION,
  GROUNDING_TYPE,
  SYSTEM_TYPE,
  DOMESTIC_PUMP,
  CONSUMPTION_UNITS,
  HOUSE_HOLD_INCOME,
  OWNER_TYPE,
  BOILER_ROOM_SIZE,
  DOMESTIC_WATER_STATION,
} from "../utils/types";
// Took help of AI to refactor this file as its a manual process to define validation to each field
// Contact Information Schema (Required fields based on Mongoose model)
const contactInformationSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),

  lastName: yup
    .string()
    .trim()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),

  phone: yup
    .string()
    .trim()
    .required("Phone number is required")
    .matches(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
      "Invalid phone number"
    ),

  email: yup
    .string()
    .trim()
    .lowercase()
    .email("Invalid email address")
    .required("Email is required"),

  newsletterSingleOptIn: yup.boolean().notRequired(),
});

// Address Schema
const addressSchema = yup.object({
  street: yup.string().trim().notRequired(),
  city: yup.string().trim().notRequired(),
  postalCode: yup
    .string()
    .trim()
    .transform((value) => (value === "" ? undefined : value))
    .matches(/^[0-9]{5}$/, "Postal code must be 5 digits")
    .notRequired(),
  countryCode: yup
    .string()
    .trim()
    .transform((value) => (value === "" ? undefined : value))
    .length(2, "Country code must be 2 characters")
    .notRequired(),
  addressAddition: yup.string().trim().notRequired(),
});

// Marketing Schema
const marketingSchema = yup.object({
  customerLoyaltyProgramType: yup.string().notRequired(),
  customerLoyaltyProgramId: yup.string().notRequired(),
});

// Contact Schema
const contactSchema = yup.object({
  contactInformation: contactInformationSchema.required(),
  address: addressSchema.notRequired(),
  marketing: marketingSchema.notRequired(),
});

// Building Information Schema
const buildingInformationSchema = yup.object({
  immoType: yup.string().oneOf(IMMOTYPE).optional(),
  heritageProtection: yup.string().oneOf(YES_NO, "Invalid value").optional(),
  constructionYear: yup
    .string()
    .matches(/^[0-9]{4}$/, "Construction year must be a valid year")
    .notRequired(),
  livingSpace: yup
    .number()
    .positive("Living space must be positive")
    .min(10, "Living space must be at least 10 m²")
    .max(10000, "Living space cannot exceed 10,000 m²")
    .notRequired(),
  constructionYearString: yup.string().notRequired(),
  residentialUnits: yup
    .number()
    .positive("Residential units must be positive")
    .integer("Residential units must be an integer")
    .notRequired(),
  boilerRoomSize: yup
    .string()
    .oneOf(BOILER_ROOM_SIZE, "Invalid boiler room size")
    .optional(),
  installationLocationCeilingHeight: yup
    .string()
    .oneOf(INSTALLATION_HEIGHT, "Invalid installation height")
    .optional(),
  widthPathway: yup.string().oneOf(YES_NO, "Invalid value").optional(),
  heightPathway: yup.string().oneOf(YES_NO, "Invalid value").optional(),
  roomsBetweenHeatingRoomAndOutdoorUnit: yup
    .string()
    .oneOf(ROOMS_BETWEEN_HEATING_OUTDOOR, "Invalid value")
    .optional(),
  meterClosetLocation: yup
    .string()
    .oneOf(FLOORTYPES, "Invalid floor type")
    .optional(),
  electricityConnectionLocation: yup
    .string()
    .oneOf(FLOORTYPES, "Invalid floor type")
    .optional(),
  groundingType: yup
    .string()
    .oneOf(GROUNDING_TYPE, "Invalid grounding type")
    .optional(),
  hasSolarThermalSystem: yup.boolean().notRequired(),
  personsHousehold: yup
    .number()
    .positive("Number of persons must be positive")
    .integer("Number of persons must be an integer")
    .notRequired(),
});

// Ownership Relationships Schema
const ownershipRelationshipsSchema = yup.object({
  ownerOccupiedHousing: yup.boolean().notRequired(),
  type: yup
    .string()
    .oneOf(OWNER_TYPE, "Invalid owner type")
    .when("$immoType", {
      is: (val: string) => val !== "Apartment",
      then: (schema) => schema.notRequired(),
      otherwise: (schema) => schema.notRequired(),
    }),
});

// Energy Relevant Information Schema
const energyRelevantInformationSchema = yup.object({
  heatedArea: yup
    .number()
    .positive("Heated area must be positive")
    .notRequired(),
  heatedAreaString: yup.string().notRequired(),
  typeOfHeating: yup
    .string()
    .oneOf(TYPE_OF_HEATING, "Invalid heating type")
    .optional(),
  locationHeating: yup
    .string()
    .oneOf(LOCATION_HEATING, "Invalid heating location")
    .optional(),
  apartmentHeatingSystem: yup
    .string()
    .oneOf(YES_NO, "Invalid value")
    .optional(),
});

// Hot Water Schema
const hotWaterSchema = yup.object({
  numberOfBathtubs: yup
    .number()
    .integer("Number of bathtubs must be an integer")
    .min(0, "Cannot be negative")
    .notRequired(),
  numberOfShowers: yup
    .number()
    .integer("Number of showers must be an integer")
    .min(0, "Cannot be negative")
    .notRequired(),
  typeOfShowers: yup
    .string()
    .oneOf(TYPE_OF_SHOWER_HEADS, "Invalid shower head type")
    .optional(),
});

// Building Schema
const buildingSchema = yup.object({
  address: addressSchema.notRequired(),
  buildingInformation: buildingInformationSchema.notRequired(),
  ownershipRelationships: ownershipRelationshipsSchema.notRequired(),
  energyRelevantInformation: energyRelevantInformationSchema.notRequired(),
  hotWater: hotWaterSchema.notRequired(),
});

// Heating System Schema
const heatingSystemSchema = yup.object({
  consumption: yup
    .number()
    .positive("Consumption must be positive")
    .notRequired(),
  consumptionUnit: yup
    .string()
    .oneOf(CONSUMPTION_UNITS, "Invalid consumption unit")
    .optional(),
  systemType: yup.string().oneOf(SYSTEM_TYPE, "Invalid system type").optional(),
  constructionYearHeatingSystem: yup
    .number()
    .integer("Construction year must be an integer")
    .min(1900, "Year must be after 1900")
    .max(new Date().getFullYear(), "Year cannot be in the future")
    .notRequired(),
  constructionYearHeatingSystemString: yup.string().notRequired(),
  model: yup.string().notRequired(),
  floorHeatingConnectedToReturnPipe: yup.boolean().notRequired(),
  floorHeatingOwnHeatingCircuit: yup.boolean().notRequired(),
  floorHeatingOnlyInSmallRooms: yup.boolean().notRequired(),
  numberOfFloorHeatingDistributors: yup
    .number()
    .integer("Must be an integer")
    .min(0, "Cannot be negative")
    .notRequired(),
  numberOfRadiators: yup
    .number()
    .integer("Must be an integer")
    .min(0, "Cannot be negative")
    .notRequired(),
  domesticHotWaterByHeatpump: yup.boolean().notRequired(),
  domesticHotWaterCirculationPump: yup
    .string()
    .oneOf(DOMESTIC_PUMP, "Invalid value")
    .optional(),
  domestic_water_station: yup
    .string()
    .oneOf(DOMESTIC_WATER_STATION, "Invalid value")
    .optional(),
});

// Picture Schema
const pictureSchema = yup.object({
  url: yup.string().url("Invalid URL").notRequired(),
});

// Pictures Schema
const picturesSchema = yup.object({
  outdoorUnitLocation: yup.mixed().nullable().optional(),
  outdoorUnitLocationWithArea: yup.array().of(pictureSchema).notRequired(),
  heatingRoom: yup.array().of(pictureSchema).notRequired(),
  meterClosetWithDoorOpen: yup.array().of(pictureSchema).notRequired(),
  meterClosetSlsSwitchDetailed: yup.array().of(pictureSchema).notRequired(),
  floorHeatingDistributionWithDoorOpen: yup
    .array()
    .of(pictureSchema)
    .notRequired(),
});

// Project Schema
const projectSchema = yup.object({
  timeline: yup.string().oneOf(TIMELINE, "Invalid timeline").optional(),
  householdIncome: yup
    .string()
    .oneOf(HOUSE_HOLD_INCOME, "Invalid household income")
    .optional(),
  statusOfFoundationConstruction: yup
    .string()
    .oneOf(STATUS_OF_FOUNDATION_CONSTRUCTION, "Invalid status")
    .optional(),
  infosLeadsource: yup.string().optional(),
  fullReplacementOfHeatingSystemPlanned: yup.boolean().notRequired(),
  additionalDisposal: yup
    .array()
    .of(yup.string().oneOf(DISPOSAL_TYPES, "Invalid disposal type"))
    .optional(),
  shouldKeepSolarThermalSystem: yup.boolean().notRequired(),
  pictures: picturesSchema.notRequired(),
});

// Vamo Data Schema
const vamoDataSchema = yup.object({
  leadStage: yup.string().notRequired(),
  dataAcquisitionLink: yup.string().url("Invalid URL").notRequired(),
  appointmentBookingLink: yup.string().url("Invalid URL").notRequired(),
});

// Main Lead Schema
export const leadValidationSchema = yup.object({
  version: yup.string().required("Version is required").default("1.2.0"),
  id: yup.string().notRequired(),
  contact: contactSchema.required("Contact information is required"),
  building: buildingSchema.notRequired(),
  heatingSystem: heatingSystemSchema.notRequired(),
  project: projectSchema.notRequired(),
  vamoData: vamoDataSchema.notRequired(),
});

// Export individual schemas for partial validation
export {
  contactInformationSchema,
  addressSchema,
  contactSchema,
  buildingInformationSchema,
  ownershipRelationshipsSchema,
  energyRelevantInformationSchema,
  hotWaterSchema,
  buildingSchema,
  heatingSystemSchema,
  picturesSchema,
  projectSchema,
  vamoDataSchema,
};

// Type inference from schema
export type LeadFormData = yup.InferType<typeof leadValidationSchema>;
