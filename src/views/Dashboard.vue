<template>
  <div class="d-flex flex-column">
    <h1>{{ $t('VIEWS.DASHBOARD.TITLE') }}</h1>
    <Carousel v-if="heroes.length" :heroes="heroes" />
    <div v-else class="ma-auto mt-16 d-flex flex-column" no-gutters>
      <h3>{{ $t('VIEWS.DASHBOARD.EMPTY') }}</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Carousel from '../components/Carousel.vue';
import Header from '../components/Header.vue';

export default {
  name: 'Dashboard',
  components: { Carousel, Header },

  computed: {
    ...mapGetters({
      heroes: 'favoriteHeroes',
    }),
  },
};
</script>
