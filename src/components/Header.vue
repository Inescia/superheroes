<template>
  <div class="header">
    <router-link to="/"
      ><img
        class="header__img"
        contain
        height="100"
        :src="require('../assets/logo_header.png')"
    /></router-link>
    <v-btn to="/List" v-show="btn">Voir tous les superhéros</v-btn>
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
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 0px 20px;

  &__img {
    transition: transform 0.4s ease-in-out;

    &:hover {
      transform: translateX(20px);
    }
  }
}
</style>
