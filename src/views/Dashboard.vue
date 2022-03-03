<template>
  <div class="page">
    <Header />
    <h1 class="title1">{{ $t('views.dashboard.titre') }}</h1>
    <Carousel v-if="heroes.length" :heroes="heroes" />
    <div v-else></div>
    <Footer />
  </div>
</template>

<script>
import Carousel from '../components/Carousel.vue';
import Footer from '../components/Footer.vue';
import Header from '../components/Header.vue';

export default {
  components: { Header, Carousel, Footer },
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
