<template>
  <div class="card ma-5 d-flex flex-column justify-space-between">
    <router-link :to="'/Informations/' + hero.id"
      ><div style="position: relative">
        <img class="card__img1" :src="image" />
        <div class="card__img2"><h6>Voir plus</h6></div>
      </div>
    </router-link>
    <div class="mx-3 mt-1">
      <v-row>
        <v-col cols="10"
          ><h4 class="card__name">
            {{ setSize(hero.name, 21) }}
          </h4></v-col
        >
        <v-icon @click="toggleFavorite(hero.favorite)" color="red">
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
import Hero from '../classes/Hero.js';

export default {
  name: 'Card',

  computed: {
    image() {
      if (
        this.hero.image !=
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
      ) {
        return this.hero.image;
      } else return require('../assets/test.jpeg');
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
     * Set text's size, to avoid overflow
     *
     * @param {string} text The original text
     * @param {number} size The size required
     * @return {string} The resized text
     */
    setSize(text, size) {
      if (text.length > size + 1) return text.substring(0, size - 2) + '...';
      else return text;
    },

    toggleFavorite(fav) {
      this.hero.favorite = !fav;
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
  width: $w;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 5px #d4d4d4;
  height: $h;

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
    border-radius: 10px 10px 0px 0px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: $w;
    height: $w;
    background: #ff554fee;
    opacity: 0;
    margin-bottom: 6px;
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
