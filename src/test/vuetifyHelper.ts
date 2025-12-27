import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export function createVuetifyInstance() {
  return createVuetify({
    components,
    directives,
    defaults: {
      VTextField: {
        variant: "outlined",
      },
    },
  });
}
