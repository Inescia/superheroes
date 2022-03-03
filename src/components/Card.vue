<template>
  <router-link
    style="color: inherit; text-decoration: none"
    :to="'/Informations/' + heroe.id"
  >
    <div class="card">
      <div class="card__recto">
        <img class="card__img" :src="image" />
        <div class="card__infos">
          <v-row>
            <v-col cols="10"
              ><h4 class="card__infos__name">
                {{ setSize(heroe.name, 21) }}
              </h4></v-col
            >
            <v-icon color="red">
              {{ this.heroe.favorie ? 'mdi-heart' : 'mdi-heart-outline' }}
            </v-icon></v-row
          >
          <h5 class="card__infos__id">{{ heroe.id }}</h5>
          <p class="card__infos__description">
            {{ setSize(heroe.description, 75) }}
          </p>
        </div>
      </div>
      <div class="card__verso">
        <h6>{{ $t('components.card.verso') }}</h6>
      </div>
    </div>
  </router-link>
</template>

<script>
import Heroe from '../classes/Heroe.js';

/** CARD COMPONENT */
export default {
  name: 'Card',

  computed: {
    image() {
      if (
        this.heroe.image !=
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
      ) {
        return this.heroe.image;
      } else return require('../assets/test.jpeg');
    },
  },

  props: {
    /** Heroe involved */
    heroe: {
      type: Heroe,
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
  },
};
</script>

<style lang="scss">
@keyframes move {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(0, 1);
  }
  100% {
    transform: scale(1, 1);
  }
}
$w: 220px;
$h: 322px;

.card {
  margin: 25px;
  width: $w;

  &:hover {
    animation: move ease-in-out 1.2s;

    & .card__recto {
      display: none;
    }
    & .card__verso {
      display: flex;
    }
  }

  &__recto {
    background: white;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 5px #d4d4d4;
    width: 100%;
    height: $h;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__verso {
    border-radius: 10px;
    box-shadow: 0px 0px 10px 5px #d4d4d4;
    display: none;
    width: 100%;
    height: $h;
    background: #ff554fee;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__img {
    border-radius: 10px 10px 0px 0px;
    height: $w;
    object-fit: cover;
    width: $w;
  }

  &__infos {
    margin: 5px 10px 0px 10px;

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
}
</style>
