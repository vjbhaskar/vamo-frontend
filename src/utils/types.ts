export const IMMOTYPE_DATA = [
  {
    text: "Single-family house / Two-family house",
    image: "single-family-house.png",
  },
  {
    text: "Semi-detached house / Terraced house",
    image: "semi-detached-house.png",
  },
  { text: "Apartment", image: "apartment-house.png" },
  { text: "Commercial property", image: "commercial-property.png" },
  { text: "Multi-family house", image: "multi-family-house.png" },
  { text: "Other", image: "other-house.png" },
];
export const IMMOTYPE = [
  "Single-family house / Two-family house",
  "Semi-detached house / Terraced house",
  "Apartment",
  "Commercial property",
  "Multi-family house",
  "Other",
];
export const YES_NO = ["Yes", "No"];
export const FLOORTYPES = ["Basement", "Ground Floor", "Upstairs", "Attic"];
export const DISPOSAL_TYPES_TEXT = [
  {
    slug: "oil_tank_plastic_up_to_5000l",
    text: "Oil tank plastic up to 5000 l",
  },
  {
    slug: "oil_tank_plastic_more_than_5000l",
    text: "Oil tank plastic more than 5000 l",
  },
  { slug: "oil_tank_steel_up_to_5000l", text: "Oil tank steel up to 5000 l" },
  {
    slug: "oil_tank_steel_more_than_5000l",
    text: "Oil tank steel more than 5000 l",
  },
  { slug: "heatpump", text: "Heatpump" },
  { slug: "liquid_gas_tank", text: "Liquid gas tank" },
];
export const DISPOSAL_TYPES = [
  "oil_tank_plastic_up_to_5000l",
  "oil_tank_plastic_more_than_5000l",
  "oil_tank_steel_up_to_5000l",
  "oil_tank_steel_more_than_5000l",
  "heatpump",
  "liquid_gas_tank",
];
export const LOCATION_HEATING = [
  "Under the roof",
  "1st floor",
  "Attic",
  "Upper floor",
  "Basement",
  "Ground floor",
];
export const TYPE_OF_HEATING = [
  "Radiators",
  "Underfloor heating",
  "Radiators + underfloor heating",
  "Night storage heater",
  "Other",
];
export const TIMELINE = [
  "Immediately",
  "1-3 months",
  "3-6 months",
  ">6 months",
];
export const TYPE_OF_SHOWER_HEADS = [
  "Shower head",
  "Raindance shower head",
  "Waterfall shower",
];
export const INSTALLATION_HEIGHT = [
  "lower than 180 cm",
  "180 - 199 cm",
  "higher than 199 cm",
];
export const ROOMS_BETWEEN_HEATING_OUTDOOR = [
  "no_room",
  "one_room",
  "two_rooms_or_more",
];
export const ROOMS_BETWEEN_HEATING_OUTDOOR_TEXT = [
  { slug: "one_room", text: "One Room" },

  { slug: "two_rooms_or_more", text: "Two rooms or more" },

  { slug: "no_room", text: "No Room" },
];
export const STATUS_OF_FOUNDATION_CONSTRUCTION = [
  "Vamo",
  "Customer",
  "No foundation necessary",
];
export const GROUNDING_TYPE = [
  "water_or_gas_pipe",
  "grounding_spike_or_foundation",
  "no_grounding",
  "unknown",
];
export const GROUNDING_TYPE_TEXT = [
  { slug: "water_or_gas_pipe", text: "Water or Gas pipe" },

  {
    slug: "grounding_spike_or_foundation",
    text: "Grounding spike or Foundation",
  },

  { slug: "unknown", text: "Unknown" },

  { slug: "no_grounding", text: "No Grounding" },
];

export const SYSTEM_TYPE = [
  "District heating",
  "Gas-fired central heating",
  "Coal",
  "Heating oil",
  "Heat pump",
  "Natural gas",
  "Liquefied petroleum gas",
  "Pellet/wood heating",
  "Other",
];

export const DOMESTIC_PUMP = [
  "no",
  "unknown",
  "yes_but_inactive",
  "yes_and_active",
];

export const DOMESTIC_PUMP_TEXT = [
  { slug: "no", text: "No" },
  { slug: "unknown", text: "Unknown" },
  { slug: "yes_but_inactive", text: "Yes but Inactive" },
  { slug: "yes_and_active", text: "Yes and Active" },
];

export const CONSUMPTION_UNITS = ["Liters (l)", "Kilowatt hours (kWh)"];
export const HOUSE_HOLD_INCOME_TEXT = [
  { slug: "more_than_40k_gross", text: "More than 40k gross" },
  { slug: "less_than_40k_gross", text: "Less than 40k gross" },
  { slug: "no_answer", text: "No Answer" },
];

export const HOUSE_HOLD_INCOME = [
  "more_than_40k_gross",
  "less_than_40k_gross",
  "no_answer",
];

export const OWNER_TYPE = ["one_owner", "two_owners", "community_of_owners"];
export const OWNER_TYPE_TEXT = [
  { slug: "one_owner", text: "One owner" },
  { slug: "two_owners", text: "Two owners" },
  { slug: "community_of_owners", text: "Community of owners" },
];
export const BOILER_ROOM_SIZE = [
  "less than 4 square meters",
  "more than 4 square meters",
];
export const DOMESTIC_WATER_STATION_TEXT = [
  { slug: "no", text: "No" },
  { slug: "unknown", text: "Unknown" },
  { slug: "yes", text: "Yes" },
  {
    slug: "water_filter_and_pressure_reducer",
    text: "Water Filter and Pressure Reducer",
  },
];

export const DOMESTIC_WATER_STATION = [
  "no",
  "unknown",
  "yes",
  "water_filter_and_pressure_reducer",
];

export interface FileUploadProps {
  fieldName: string;
  files: File[];
}
