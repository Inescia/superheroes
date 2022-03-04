<template>
  <div class="footer">
    <div>
      <img
        class="footer__img"
        @click="changeLangage('fr')"
        :src="require('../assets/fr.png')"
      />
      <img
        class="footer__img"
        @click="changeLangage('en')"
        :src="require('../assets/en.png')"
      />
      <img
        class="footer__img"
        @click="changeLangage('es')"
        :src="require('../assets/es.png')"
      />
    </div>
    <p class="footer__credits">Data©2022 MARVEL</p>
  </div>
</template>

<script>
import i18n from '../i18n';

/** FOOTER COMPONENT */
export default {
  name: 'Footer',

  props: {
    /** Button's status (displayed or not) */
    btn: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    changeLangage(lang) {
      this.$root.$i18n.locale = lang;
    },
  },
};
</script>

<style lang="scss">
.footer {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  background: rgba(#ffffff, 0.9);

  &__img {
    margin-right: 15px;
    object-fit: contain;
    height: 45px;
    cursor: pointer;
  }

  &__credits {
    margin-bottom: 0px;
    opacity: 0.7;
    letter-spacing: 1px;
  }
}
</style>
