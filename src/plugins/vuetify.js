import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#FF554F",
        secondary: "#607d8b",
        accent: "#3f51b5",
        error: "#ff5722",
        warning: "#ffc107",
        info: "#00bcd4",
        success: "#8bc34a",
      },
    },
  },
});

export default vuetify;
