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
    <v-col v-if="!modal" align-self="end" class="d-flex" cols="auto">
      <v-tabs background-color="transparent" centered ref="tabs">
        <v-tab to="/">{{ $t('components.header.tab1') }}</v-tab>
        <v-tab to="/List">{{ $t('components.header.tab2') }}</v-tab> </v-tabs
      ><img
        :src="require('../assets/' + lang + '.png')"
        class="mx-4"
        height="45"
        style="cursor: pointer"
        @click="changeCurrentLangage(lang)"
      />
    </v-col>
    <v-col v-else class="d-flex" justify-end cols="1">
      <v-btn class="ml-auto" fab icon x-large @click="returnPreviousPage"
        ><v-icon x-large> mdi-close </v-icon></v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';
import i18n from '../i18n';

export default {
  name: 'Header',

  computed: {
    ...mapState(['modal']),

    lang() {
      return i18n.locale;
    },
  },

  methods: {
    /**
     * Change the langage used (according to this order : fr => en => es => ...)
     *
     * @param {string} lang the current langage
     */
    changeCurrentLangage(lang) {
      switch (lang) {
        case 'fr':
          i18n.locale = 'en';
          break;
        case 'en':
          i18n.locale = 'es';
          break;
        default:
          i18n.locale = 'fr';
          break;
      }
      this.$refs.tabs.callSlider();
    },

    /** Return to the previous page if it exists, otherwise goes to List */
    returnPreviousPage() {
      window.history.length >= 2
        ? this.$router.go(-1)
        : this.$router.push('/List');
    },
  },
};
</script>
