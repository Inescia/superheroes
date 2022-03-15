<template>
  <div class="d-flex flex-column">
    <h1>{{ $t('views.dashboard.titre') }}</h1>
    <Carousel v-if="heroes.length" :heroes="heroes" />
    <div v-else class="ma-auto pb-16" no-gutters>
      <h3>{{ $t('views.dashboard.vide') }}</h3>
    </div>
  </div>
</template>

<script>
import Carousel from '../components/Carousel.vue';
import Header from '../components/Header.vue';
import { mapGetters } from 'vuex';

export default {
  components: { Carousel, Header },
  name: 'Dashboard',

  computed: {
    ...mapGetters({
      heroes: 'heroesFavorites',
    }),
  },

  beforeMount() {
    this.$store.commit('setModal', { modal: false });
  },
};
</script>
