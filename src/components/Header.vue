<template>
  <v-row
    class="pa-5"
    justify="space-between"
    no-gutters
    style="max-height: 120px"
  >
    <v-col cols="auto"
      ><router-link to="/"
        ><img
          :src="require('../assets/logo_header.png')"
          contain
          height="100" /></router-link
    ></v-col>
    <v-col v-if="!dismissible" align-self="end" class="d-flex" cols="auto">
      <v-tabs background-color="transparent" centered>
        <v-tab to="/">{{ $t('components.header.tab1') }}</v-tab>
        <v-tab to="/List">{{ $t('components.header.tab2') }}</v-tab> </v-tabs
      ><img
        :src="require('../assets/' + lang + '.png')"
        class="mx-4"
        height="45"
        style="cursor: pointer"
        @click="changeLangage(lang)"
      />
    </v-col>
    <v-col v-else class="d-flex" justify-end cols="1">
      <v-btn class="ml-auto" fab icon x-large @click="close"
        ><v-icon x-large> mdi-close </v-icon></v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
import i18n from '../i18n';

export default {
  name: 'Header',

  data: () => ({
    lang: 'fr',
    dismissible: false,
  }),

  props: {
    modal: {
      type: Boolean,
      default: false,
    },
  },

  beforeMount() {
    this.lang = i18n.locale;
    this.dismissible = this.modal;
  },

  methods: {
    /**
     * Change the langage used.
     *
     * @param {string} lang the current langage
     */
    changeLangage(lang) {
      lang == 'fr'
        ? (this.lang = 'en')
        : lang == 'en'
        ? (this.lang = 'es')
        : (this.lang = 'fr');
      i18n.locale = this.lang;
    },

    /** Close the page (new or information). */
    close() {
      window.history.length >= 2
        ? this.$router.go(-1)
        : this.$router.push('/List');
      this.dismissible = false;
    },
  },
};
</script>
