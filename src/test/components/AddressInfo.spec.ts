import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import { Form } from "vee-validate";
import { createVuetifyInstance } from "../../test/vuetifyHelper";
import AddressInfo from "../../components/AddressInfo.vue";
import { leadValidationSchema } from "../../schemas/validationSchema";

describe("AddressInfo", () => {
  let wrapper: VueWrapper<any>;
  const vuetify = createVuetifyInstance();

  const createWrapper = (keyType: "contact" | "building" = "contact") => {
    return mount(
      {
        components: { AddressInfo, Form },
        template: `
          <Form :validation-schema="schema" v-slot="{ errors }">
            <AddressInfo 
              :keyType="keyType"
              @next="handleNext"
              @back="handleBack"
            />
          </Form>
        `,
        setup() {
          const handleNext = vi.fn();
          const handleBack = vi.fn();
          return {
            schema: leadValidationSchema,
            keyType,
            handleNext,
            handleBack,
          };
        },
      },
      {
        global: {
          plugins: [vuetify],
        },
      }
    );
  };

  describe("Rendering with contact keyType", () => {
    beforeEach(() => {
      wrapper = createWrapper("contact");
    });

    it("renders the component correctly", () => {
      expect(wrapper.exists()).toBe(true);
    });

    it("displays correct title for contact address", () => {
      const title = wrapper.find(".v-card-title");
      expect(title.text()).toBe("Contact Address");
    });

    it("displays correct subtitle for contact address", () => {
      const subtitle = wrapper.findAll(".v-card-subtitle")[0];
      expect(subtitle.text()).toContain("Please enter your current address");
    });
  });

  describe("Rendering with building keyType", () => {
    beforeEach(() => {
      wrapper = createWrapper("building");
    });

    it("displays correct title for building address", () => {
      const title = wrapper.find(".v-card-title");
      expect(title.text()).toBe("Building Address");
    });

    it("displays correct subtitle for building address", () => {
      const subtitle = wrapper.findAll(".v-card-subtitle")[0];
      expect(subtitle.text()).toContain(
        "Please enter the address where you want to install the heat pump"
      );
    });
  });

  describe("Form Fields", () => {
    beforeEach(() => {
      wrapper = createWrapper("contact");
    });

    it("renders all required form fields", () => {
      const textFields = wrapper.findAllComponents({ name: "VTextField" });
      expect(textFields).toHaveLength(4);
    });

    it("renders street field with correct label", () => {
      const label = wrapper.findAll("label")[0];
      expect(label.text()).toContain("Street");
    });

    it("all fields have underlined variant", () => {
      const textFields = wrapper.findAllComponents({ name: "VTextField" });
      textFields.forEach((field) => {
        expect(field.props("variant")).toBe("underlined");
      });
    });
  });

  describe("Form Input and Validation", () => {
    beforeEach(() => {
      wrapper = createWrapper("contact");
    });

    it("updates street value on input", async () => {
      const streetInput = wrapper.findAll("input")[0];
      await streetInput.setValue("Heinrich 12");

      expect(streetInput.element.value).toBe("Heinrich 12");
    });

    it("updates city value on input", async () => {
      const cityInput = wrapper.findAll("input")[1];
      await cityInput.setValue("Mannheim");

      expect(cityInput.element.value).toBe("Mannheim");
    });

    it("updates postal code value on input", async () => {
      const postalCodeInput = wrapper.findAll("input")[2];
      await postalCodeInput.setValue("68165");

      expect(postalCodeInput.element.value).toBe("68165");
    });

    it("updates country code value on input", async () => {
      const countryCodeInput = wrapper.findAll("input")[3];
      await countryCodeInput.setValue("DE");

      expect(countryCodeInput.element.value).toBe("DE");
    });

    it("shows error for invalid postal code format", async () => {
      const postalCodeInput = wrapper.findAll("input")[2];

      await postalCodeInput.setValue("123");
      await postalCodeInput.trigger("blur");

      await wrapper.vm.$nextTick();
      await new Promise((resolve) => setTimeout(resolve, 100));

      const errorMessages = wrapper.findAll(".v-messages__message");
      const hasPostalCodeError = errorMessages.some((msg) =>
        msg.text().includes("Postal code must be 5 digits")
      );
      expect(hasPostalCodeError).toBe(true);
    });

    it("shows error for invalid country code length", async () => {
      const countryCodeInput = wrapper.findAll("input")[3];

      await countryCodeInput.setValue("DEU");
      await countryCodeInput.trigger("blur");

      await wrapper.vm.$nextTick();
      await new Promise((resolve) => setTimeout(resolve, 100));

      const errorMessages = wrapper.findAll(".v-messages__message");
      const hasCountryCodeError = errorMessages.some((msg) =>
        msg.text().includes("Country code must be 2 characters")
      );
      expect(hasCountryCodeError).toBe(true);
    });
  });

  describe("Button Actions", () => {
    beforeEach(() => {
      wrapper = createWrapper("contact");
    });

    it("renders Back and Next buttons", () => {
      const buttons = wrapper.findAllComponents({ name: "VBtn" });
      expect(buttons).toHaveLength(2);
      expect(buttons[0].text()).toContain("Back");
      expect(buttons[1].text()).toContain("Next");
    });

    it("Back button has correct styling", () => {
      const backButton = wrapper.findAllComponents({ name: "VBtn" })[0];
      expect(backButton.props("variant")).toBe("outlined");
      expect(backButton.props("size")).toBe("large");
    });

    it("Next button has correct styling", () => {
      const nextButton = wrapper.findAllComponents({ name: "VBtn" })[1];
      expect(nextButton.props("variant")).toBe("elevated");
      expect(nextButton.props("color")).toBe("success");
      expect(nextButton.props("size")).toBe("large");
    });

    it('emits "back" event when Back button is clicked', async () => {
      const backButton = wrapper.findAllComponents({ name: "VBtn" })[0];
      await backButton.trigger("click");

      const addressInfo = wrapper.findComponent(AddressInfo);
      expect(addressInfo.emitted("back")).toBeTruthy();
      expect(addressInfo.emitted("back")).toHaveLength(1);
    });

    it('emits "next" event when Next button is clicked', async () => {
      const nextButton = wrapper.findAllComponents({ name: "VBtn" })[1];
      await nextButton.trigger("click");

      const addressInfo = wrapper.findComponent(AddressInfo);
      expect(addressInfo.emitted("next")).toBeTruthy();
      expect(addressInfo.emitted("next")).toHaveLength(1);
    });
  });

  describe("Layout and Structure", () => {
    beforeEach(() => {
      wrapper = createWrapper("contact");
    });

    it("has correct card structure", () => {
      const card = wrapper.findComponent({ name: "VCard" });
      expect(card.exists()).toBe(true);
      expect(card.classes()).toContain("pa-4");
      expect(card.classes()).toContain("d-flex");
      expect(card.classes()).toContain("flex-column");
    });

    it("card has minimum height of 600px", () => {
      const card = wrapper.find(".v-card");
      expect(card.attributes("style")).toContain("min-height: 600px");
    });

    it("has correct row and column structure", () => {
      const rows = wrapper.findAll(".v-row");
      expect(rows.length).toBeGreaterThanOrEqual(2);
    });

    it("second row has 2 columns (postal code and country code)", () => {
      const secondRow = wrapper.findAll(".v-row")[1];
      const cols = secondRow.findAll(".v-col");
      expect(cols).toHaveLength(2);
    });

    it("includes v-spacer for button alignment", () => {
      const spacer = wrapper.findComponent({ name: "VSpacer" });
      expect(spacer.exists()).toBe(true);
    });
  });

  describe("Field Path Generation", () => {
    it("generates correct field paths for contact keyType", () => {
      wrapper = createWrapper("contact");
      const addressInfo = wrapper.findComponent(AddressInfo);

      expect(addressInfo.props("keyType")).toBe("contact");
    });

    it("generates correct field paths for building keyType", () => {
      wrapper = createWrapper("building");
      const addressInfo = wrapper.findComponent(AddressInfo);

      expect(addressInfo.props("keyType")).toBe("building");
    });
  });

  describe("Complete Form Submission Flow", () => {
    beforeEach(() => {
      wrapper = createWrapper("contact");
    });

    it("allows valid form data and emits next", async () => {
      const inputs = wrapper.findAll("input");

      await inputs[0].setValue("Heinrich 12");
      await inputs[1].setValue("Mannheim");
      await inputs[2].setValue("68165");
      await inputs[3].setValue("DE");

      for (const input of inputs) {
        await input.trigger("blur");
      }

      await wrapper.vm.$nextTick();

      const nextButton = wrapper.findAllComponents({ name: "VBtn" })[1];
      await nextButton.trigger("click");

      const addressInfo = wrapper.findComponent(AddressInfo);
      expect(addressInfo.emitted("next")).toBeTruthy();
    });
  });
});
