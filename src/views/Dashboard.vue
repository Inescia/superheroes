<template>
  <div class="page d-flex flex-column">
    <Header />
    <h1>{{ $t('views.dashboard.titre') }}</h1>
    <Carousel v-if="heroes.length" :heroes="heroes" />
    <div v-else></div>
  </div>
</template>

<script>
import Carousel from '../components/Carousel.vue';
import Header from '../components/Header.vue';

export default {
  components: { Carousel, Header },
  name: 'Dashboard',

  computed: {
    heroes() {
      return this.$store.getters.heroesFavorites;
    },
  },
};
</script>
