<template>
  <div class="d-flex flex-column">
    <h1>{{ $t('views.dashboard.titre') }}</h1>
    <Carousel v-if="heroes.length" :heroes="heroes" />
    <div v-else class="ma-auto mt-16 d-flex flex-column" no-gutters>
      <h3>{{ $t('views.dashboard.vide') }}</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Carousel from '../components/Carousel.vue';
import Header from '../components/Header.vue';

export default {
  components: { Carousel, Header },
  name: 'Dashboard',

  computed: {
    ...mapGetters({
      heroes: 'favoriteHeroes',
    }),
  },

  beforeMount() {
    this.$store.commit('setModal', { modal: false });
  },
};
</script>
