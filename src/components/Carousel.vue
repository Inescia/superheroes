<template>
  <div>
    <div class="carousel">
      <div
        class="carousel__left"
        @click="move('left')"
        :disabled="borderLeft"
      ></div>
      <div class="carousel__cards">
        <div
          v-for="heroe in heroes"
          :style="{
            transform: 'translateX' + '(' + offset + 'px' + ')',
            transition: 'transform 0.8s ease-in-out',
          }"
        >
          <Card :heroe="heroe" />
        </div>
      </div>
      <div
        class="carousel__right"
        @click="move('right')"
        :disabled="borderRight"
      ></div>
    </div>
    <div>
      <ul class="carousel__pages">
        <li>
          <button
            type="button"
            class="carousel__page"
            v-for="i in heroes.length"
            :key="i"
            @click="moveTo(i)"
          >
            <v-icon v-if="i - 1 == index" small color="#ff554fee"
              >mdi-circle</v-icon
            >
            <v-icon v-else small color="#00000055">mdi-circle</v-icon>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Card from './Card.vue';

export default {
  components: { Card },
  name: 'Carousel',

  data() {
    return {
      offset: 0,
      offsetMax: 0,
      step: 270,
    };
  },

  props: {
    heroes: {
      type: Array,
      default: [],
    },
  },

  beforeMount() {
    this.offsetMax = Math.floor(this.heroes.length / 2) * this.step;
    if (this.heroes.length % 2 == 0) this.offsetMax -= this.step;
  },

  computed: {
    borderLeft() {
      return this.offset <= -1 * this.offsetMax;
    },

    borderRight() {
      return this.offset >= this.offsetMax;
    },

    index() {
      //index de heroes correspondant à la card centrale
      var nbrStep = this.offset / this.step;
      var indexStep0 = Math.floor(this.heroes.length / 2);
      return indexStep0 - nbrStep;
    },
  },

  methods: {
    move(direction) {
      if ((direction == 'left') & !this.borderLeft) this.offset -= this.step;
      else if ((direction == 'right') & !this.borderRight)
        this.offset += this.step;
    },

    moveTo(i) {
      i--;
      if (this.heroes.length > 2) {
        var i2 = this.index;
        this.heroes.length % 2 == 0
          ? (this.offset += (i2 - i - 1) * this.step)
          : (this.offset += (i2 - i) * this.step);
      }
    },
  },
};
</script>

<style lang="scss">
.carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0px;

  &__left,
  &__right {
    display: inline-block;
    width: 25px;
    height: 25px;
    padding: 10px;
    box-sizing: border-box;
    border-top: 3px solid #ff554fee;
    border-right: 3px solid #ff554fee;
    cursor: pointer;
    margin: 0 20px;
    transition: transform 150ms linear;
    &[disabled] {
      opacity: 0.3;
      border-color: black;
    }
    z-index: 1;
  }

  &__left {
    transform: rotate(-135deg);
    &:active {
      transform: rotate(-135deg) scale(0.9);
    }
  }

  &__right {
    transform: rotate(45deg);
    &:active {
      transform: rotate(45deg) scale(0.9);
    }
  }

  &__cards {
    display: flex;
    justify-content: center;
    width: 90%;
  }

  &__pages {
    display: flex;
    justify-content: center;
    list-style: none;
    margin: 30px 0px;
  }

  &__page {
    display: inline;
    font-size: 20px;
    padding: 5px;
    height: auto;
    width: auto;
    color: #607d8b;
  }
}
</style>
