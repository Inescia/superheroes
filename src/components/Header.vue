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
        @click="changeCurrentLangage"
      />
    </v-col>
    <v-col v-else class="d-flex" cols="1" justify-end>
      <v-btn class="ml-auto" fab icon x-large @click="backToPreviousPage"
        ><v-icon x-large> mdi-close </v-icon></v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Header',

  computed: {
    isClosable() {
      return this.$route.meta.isClosable;
    },

    lang() {
      return this.$i18n.locale;
    },
  },

  methods: {
    /**
     * @method to change the langage used (according to this order : fr => en => es => ...)
     */
    changeCurrentLangage() {
      switch (this.lang) {
        case 'fr':
          this.$i18n.locale = 'en';
          break;
        case 'en':
          this.$i18n.locale = 'es';
          break;
        default:
          this.$i18n.locale = 'fr';
          break;
      }
      if (this.$refs.tabs) this.$refs.tabs.callSlider();
      document.title = this.$t('VIEWS.' + this.$route.meta.title + '.TITLE');
    },

    /**
     * @method to back to the previous page if it exists, otherwise goes to List.
     */
    backToPreviousPage() {
      window.history.length >= 2
        ? this.$router.go(-1)
        : this.$router.push('/List');
    },
  },
};
</script>
