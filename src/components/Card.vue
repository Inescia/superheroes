<template>
  <div class="card d-flex flex-column justify-space-between ma-5">
    <router-link :to="'/Informations/' + hero.id"
      ><div style="position: relative">
        <img :src="image" class="card__img1" />
        <div class="card__img2">
          <h6>{{ $t('components.card.verso') }}</h6>
        </div>
      </div>
    </router-link>
    <div class="mt-1 mx-3">
      <v-row>
        <v-col cols="10"
          ><h4 class="card__name">
            {{ setSize(hero.name, 21) }}
          </h4></v-col
        >
        <v-icon color="red" @click="toggleFavorite">
          {{ hero.favorite ? 'mdi-heart' : 'mdi-heart-outline' }}
        </v-icon></v-row
      >
      <h5 class="card__id">{{ hero.id }}</h5>
      <p class="card__description">
        {{ setSize(hero.description, 75) }}
      </p>
    </div>
  </div>
</template>

<script>
import Hero from '../classes/hero.js';

export default {
  name: 'Card',

  computed: {
    image() {
      if (
        this.hero.image !=
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
      )
        return this.hero.image;
      else return require('../assets/test.jpeg');
    },
  },

  props: {
    hero: {
      type: Hero,
      require,
    },
  },

  methods: {
    /**
     * Set text's size, to avoid overflow.
     *
     * @param {string} text The original text
     * @param {number} size The size required
     * @return {string} The resized text
     */
    setSize(text, size) {
      if (text.length > size + 1) return text.substring(0, size - 2) + '...';
      else return text;
    },

    /** Toggle the favorite status of the hero. */
    toggleFavorite() {
      this.hero.favorite = !this.hero.favorite;
    },
  },
};
</script>

<style lang="scss">
@keyframes appear {
  0% {
    opacity: 0;
    height: 0%;
  }
  100% {
    opacity: 1;
    height: 98%;
  }
}
$w: 220px;
$h: 322px;

.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 5px #d4d4d4;
  height: $h;
  width: $w;

  &:hover {
    & .card__img2 {
      animation: appear ease-in-out 0.8s;
      animation-fill-mode: forwards;
    }
  }

  &__img1 {
    border-radius: 10px 10px 0px 0px;
    height: $w;
    object-fit: cover;
    width: $w;
  }

  &__img2 {
    background: #ff554fee;
    border-radius: 10px 10px 0px 0px;
    bottom: 0;
    height: $w;
    left: 0;
    margin-bottom: 6px;
    opacity: 0;
    position: absolute;
    width: $w;
  }

  &__name {
    font-size: 15px;
    height: 25px;
    overflow: hidden;
    word-wrap: break-word;
  }

  &__id {
    font-weight: 200;
  }

  &__description {
    font-size: 12px;
    height: 35px;
    opacity: 0.8;
    overflow: hidden;
    width: $w - 20;
    word-wrap: break-word;
  }
}
</style>
