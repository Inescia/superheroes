<template>
  <div>
    <v-row align="center" class="carousel my-8" justify="center" no-gutters>
      <v-col
        class="carousel__left"
        cols="auto"
        :disabled="borderLeft"
        @click="moveCarousel('left')"
      />
      <v-col
        class="carousel__cards d-flex justify-center mx-5 pa-3"
        cols="auto"
      >
        <div
          v-for="hero in heroes"
          :style="{
            transform: 'translateX' + '(' + offset + 'px' + ')',
            transition: 'transform 0.8s ease-in-out',
          }"
        >
          <Card :hero="hero" />
        </div>
      </v-col>
      <v-col
        class="carousel__right"
        cols="auto"
        :disabled="borderRight"
        @click="moveCarousel('right')"
      />
    </v-row>
    <div>
      <ul class="carousel__pages d-flex justify-center my-8">
        <li>
          <button
            v-for="i in heroes.length"
            class="carousel__page pa-1"
            type="button"
            :key="i"
            @click="moveCarouselTo(i)"
          >
            <v-icon :color="i - 1 == index ? '#ff554fee' : '#00000055'" small
              >mdi-circle</v-icon
            >
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Card from './Card.vue';

export default {
  name: 'Carousel',
  components: { Card },

  props: {
    heroes: {
      type: Array,
      default: [],
    },
  },

  data() {
    return {
      offset: 0,
      step: 270,
    };
  },

  computed: {
    borderLeft() {
      return this.offset <= -1 * this.offsetMax;
    },

    borderRight() {
      return this.offset >= this.offsetMax;
    },

    index() {
      const nbrStep = this.offset / this.step;
      const indexStep0 = Math.floor(this.heroes.length / 2);
      return indexStep0 - nbrStep;
    },

    offsetMax() {
      return Math.floor(this.heroes.length / 2) * this.step;
    },
  },

  methods: {
    /**
     * @method to moves the carousel one step to the right or left if movement is allowed.
     * @param {string} direction The desired direction (left or right)
     */
    moveCarousel(direction) {
      if ((direction == 'left') & !this.borderLeft) this.offset -= this.step;
      else if ((direction == 'right') & !this.borderRight)
        this.offset += this.step;
    },

    /**
     * @method to moves the carousel to a given index.
     * @param {number} index The desired index
     */
    moveCarouselTo(index) {
      index--;
      if (this.heroes.length > 2) {
        const index2 = this.index;
        this.offset += (index2 - index) * this.step;
      }
    },
  },
};
</script>

<style lang="scss">
.carousel {
  &__left,
  &__right {
    display: inline-block;
    width: 25px;
    height: 25px;
    box-sizing: border-box;
    border-top: 3px solid #ff554fee;
    border-right: 3px solid #ff554fee;
    cursor: pointer;
    transition: transform 150ms linear;
    &[disabled] {
      opacity: 0.3;
      border-color: black;
    }
    z-index: 1;
  }

  &__left {
    transform: rotate(-135deg);
  }

  &__right {
    transform: rotate(45deg);
  }

  &__cards {
    width: 90%;
  }

  &__pages {
    list-style: none;
  }

  &__page {
    display: inline;
    font-size: 20px;
    height: auto;
    width: auto;
    color: #607d8b;
  }
}
</style>
