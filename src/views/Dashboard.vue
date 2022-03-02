<template>
  <div class="page">
    <Header />
    <h1 class="title1">FAVORIES.</h1>
    <Carousel v-if="heroes.length" :heroes="heroes" />
    <div v-else></div>
  </div>
</template>

<script>
import Carousel from '../components/Carousel.vue';
import Header from '../components/Header.vue';

export default {
  components: { Header, Carousel },
  name: 'Dashboard',
  data: () => ({
    heroes: [''],
  }),

  beforeMount() {
    this.heroes = this.$store.getters.heroesFavories;
  },
};
</script>

<style></style>
