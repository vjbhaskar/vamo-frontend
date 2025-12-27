import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import { createRouter, createMemoryHistory } from "vue-router";
import { createVuetifyInstance } from "../../test/vuetifyHelper";
import LandingPage from "../../views/Home.vue";

const mockPush = vi.fn();

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: { template: "<div>Home</div>" },
    },
    {
      path: "/eligibility",
      name: "Eligibility",
      component: { template: "<div>Eligibility</div>" },
    },
  ],
});

vi.spyOn(router, "push").mockImplementation(mockPush);

describe("LandingPage", () => {
  let wrapper: VueWrapper<any>;
  const vuetify = createVuetifyInstance();

  beforeEach(() => {
    mockPush.mockClear();

    wrapper = mount(LandingPage, {
      global: {
        plugins: [vuetify, router],
      },
    });
  });

  it("renders the component correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("displays the correct heading text", () => {
    const heading = wrapper.find("h2");

    expect(heading.exists()).toBe(true);
    expect(heading.text()).toContain("Heat Homes not the Planet!");
    expect(heading.text()).toContain(
      "Fill a short form and check for heat pump installation eligibility"
    );
  });

  it("renders the landing image", () => {
    const image = wrapper.find(".landing-image");

    expect(image.exists()).toBe(true);
    expect(image.attributes("src")).toContain("landing-image.png");
  });

  it('renders the "Check Eligibility" button', () => {
    const button = wrapper.find("button");

    expect(button.exists()).toBe(true);
    expect(button.text()).toContain("Check Eligibility");
  });

  it("button has correct icon", () => {
    const icon = wrapper.find(".v-icon");

    expect(icon.exists()).toBe(true);
    expect(icon.classes()).toContain("mdi-check-circle");
  });

  it("navigates to Eligibility page when button is clicked", async () => {
    const button = wrapper.find("button");

    await button.trigger("click");

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith({ name: "Eligibility" });
  });

  it("has correct layout structure", () => {
    const row = wrapper.find(".v-row");
    const cols = wrapper.findAll(".v-col");

    expect(row.exists()).toBe(true);
    expect(cols).toHaveLength(2);
  });

  it("applies correct CSS classes", () => {
    const container = wrapper.find(".landing-page-content");

    expect(container.exists()).toBe(true);
    expect(container.classes()).toContain("d-flex");
    expect(container.classes()).toContain("justify-center");
    expect(container.classes()).toContain("align-center");
  });

  it("button has correct Vuetify props", () => {
    const button = wrapper.findComponent({ name: "VBtn" });

    expect(button.props("variant")).toBe("tonal");
    expect(button.props("size")).toBe("large");
    expect(button.props("elevation")).toBe("2");
    expect(button.props("prependIcon")).toBe("mdi-check-circle");
  });
});
