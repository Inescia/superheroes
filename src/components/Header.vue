<template>
  <div class="header">
    <router-link to="/"
      ><img
        class="header__img"
        :src="require('../assets/logo_header.png')"
        contain
        height="100"
    /></router-link>
    <v-btn v-show="btn" to="/List">Voir tous les superhéros</v-btn>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    btn: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 20px 20px 0px 20px;

  &__img {
    transition: transform 0.4s ease-in-out;

    &:hover {
      transform: translateX(20px);
    }
  }
}
</style>
