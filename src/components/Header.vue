<template>
  <v-row
    class="pt-3 px-5"
    justify="space-between"
    no-gutters
    style="height: 120px"
  >
    <v-col justify-center cols="auto"
      ><img
        :src="require('../assets/logo_header.png')"
        class="mt-4"
        contain
        height="80"
    /></v-col>
    <v-col v-if="!isClosable" align-self="end" class="d-flex" cols="auto">
      <v-tabs background-color="transparent" centered ref="tabs">
        <v-tab to="/">{{ $t('COMPONENTS.HEADER.TAB1') }}</v-tab>
        <v-tab to="/List">{{ $t('COMPONENTS.HEADER.TAB2') }}</v-tab> </v-tabs
      ><img
        :src="require('../assets/' + lang + '.png')"
        class="mx-4 mt-auto"
        height="45"
        style="cursor: pointer"
        @click="changeCurrentLangage(lang)"
      />
    </v-col>
    <v-col v-else class="d-flex" justify-end cols="1">
      <v-btn class="ml-auto" fab icon x-large @click="backToPreviousPage"
        ><v-icon x-large> mdi-close </v-icon></v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
import i18n from '../i18n';

export default {
  name: 'Header',

  computed: {
    isClosable() {
      return this.$route.meta.isClosable;
    },

    lang() {
      return i18n.locale;
    },
  },

  methods: {
    /**
     * @method to change the langage used (according to this order : fr => en => es => ...)
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

    /** @method to back to the previous page if it exists, otherwise goes to List. */
    backToPreviousPage() {
      window.history.length >= 2
        ? this.$router.go(-1)
        : this.$router.push('/List');
    },
  },
};
</script>
