<template>
  <div class="page dasboard">
    <Header />
    <h1 class="title1">FAVORIES.</h1>
    <div class="dasboard__carousel">
      <div
        class="dasboard__carousel__card dasboard__carousel__card--left3"
        v-if="heroesDisplayed.length >= 7"
      >
        <img :src="image" />
      </div>

      <div
        class="dasboard__carousel__card dasboard__carousel__card--left2"
        v-if="heroesDisplayed.length >= 5"
        @click="index - 2"
      >
        <img :src="image" />
      </div>

      <div
        class="dasboard__carousel__card dasboard__carousel__card--left"
        v-if="heroesDisplayed.length >= 3"
        @click="index--"
      >
        <img :src="image" />
      </div>

      <div
        class="dasboard__carousel__card dasboard__carousel__card--center"
        v-if="heroesDisplayed.length >= 1"
      >
        <img :src="image" />
      </div>

      <div
        class="dasboard__carousel__card dasboard__carousel__card--right"
        v-if="heroesDisplayed.length >= 2"
        @click="index++"
      >
        <img :src="image" />
      </div>

      <div
        class="dasboard__carousel__card dasboard__carousel__card--right2"
        v-if="heroesDisplayed.length >= 4"
        @click="index + 2"
      >
        <img :src="image" />
      </div>

      <div
        class="dasboard__carousel__card dasboard__carousel__card--right3"
        v-if="heroesDisplayed.length >= 6"
      >
        <img :src="image" />
      </div>
    </div>

    <ul class="dasboard__pages">
      <li>
        <button class="dasboard__page" v-show="index != 1" @click="index--">
          <v-icon color="#607d8b"> mdi-arrow-left</v-icon>
        </button>
      </li>
      <li>
        <button
          type="button"
          class="dasboard__page"
          v-for="i in heroes"
          @click="index = i"
          :key="i"
        >
          <v-icon small color="#607d8b">mdi-circle-outline</v-icon>
        </button>
      </li>
      <li>
        <button
          @click="index++"
          v-show="index < heroes.length"
          class="dasboard__page"
        >
          <v-icon color="#607d8b">mdi-arrow-right</v-icon>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import Header from '../components/Header.vue';

export default {
  components: { Header },
  name: 'Dashboard',

  data: () => ({
    heroes: [1, 2, 3, 4],
    index: 0,
    image: require('@/assets/test.jpeg'),
  }),

  computed: {
    heroesDisplayed() {
      switch (this.index) {
        case 0:
          return this.heroes.slice(this.index, this.index + 4);
        case 1:
          return this.heroes.slice(this.index - 1, this.index + 4);
        case 2:
          return this.heroes.slice(this.index - 2, this.index + 4);
        case this.heroes.length - 3:
          return this.heroes.slice(this.index - 3, this.index + 3);
        case this.heroes.length - 2:
          return this.heroes.slice(this.index - 3, this.index + 2);
        case this.heroes.length - 1:
          return this.heroes.slice(this.index - 3, this.index + 1);

        default:
          return this.heroes.slice(this.index - 3, this.index + 4);
      }
    },
  },

  methods: {
    // moveTo(element) {
    //   var selected;
    //   if (element == 'next') {
    //     selected = Document.getElementByClassName('.selected').next();
    //   } else if (element == 'prev') {
    //     selected = Document.getElementByClassName('.selected').prev();
    //   } else {
    //     selected = element;
    //   }
    //   var next = Document.getElementByClassName('selected').next();
    //   var prev = Document.getElementByClassName('selected').prev();
    //   var prevSecond = Document.getElementByClassName('prev').prev();
    //   var nextSecond = Document.getElementByClassName('next').next();
    //   Document.getElementByClassName('selected')
    //     .removeClass()
    //     .addClass('selected');
    //   Document.getElementByClassName('prev').removeClass().addClass('prev');
    //   Document.getElementByClassName('next').removeClass().addClass('next');
    //   Document.getElementByClassName('nextSecond')
    //     .removeClass()
    //     .addClass('nextRightSecond');
    //   Document.getElementByClassName('prevSecond')
    //     .removeClass()
    //     .addClass('prevLeftSecond');
    //   Document.getElementByClassName('nextSecond')
    //     .nextAll()
    //     .removeClass()
    //     .addClass('hideRight');
    //   Document.getElementByClassName('prevSecond')
    //     .prevAll()
    //     .removeClass()
    //     .addClass('hideLeft');
    // },
  },

  beforeCreate() {
    this.heroes = this.$store.getters.heroesFavories;
    this.heroes.length <= 7
      ? this.heroes.length % 2 == 0
        ? (this.index = Math.floor(this.heroes.length / 2) - 1)
        : (this.index = Math.floor(this.heroes.length / 2))
      : (this.index = 3);
  },
};
</script>

<style lang="scss">
.dasboard {
  &__carousel {
    position: relative;
    top: 40%;
    height: 400px;
    transform: translateY(-50%);
    overflow: hidden;

    &__card {
      position: absolute;
      transition: transform 1s, left 1s, opacity 1s, z-index 0s;
      opacity: 1;

      img {
        width: 400px;
        transition: width 1s;
      }

      &--left3 {
        left: 0%;
        opacity: 0;
        transform: translateY(50%) translateX(-50%);

        img {
          width: 200px;
        }
      }

      &--left2 {
        z-index: 4;
        left: 15%;
        transform: translateY(50%) translateX(-50%);
        opacity: 0.7;
        img {
          width: 200px;
        }
      }

      &--left {
        z-index: 5;
        left: 30%;
        transform: translateY(50px) translateX(-50%);

        img {
          width: 300px;
        }
      }

      &--center {
        z-index: 10;
        left: 50%;
        transform: translateY(0px) translateX(-50%);
      }

      &--right {
        z-index: 5;
        left: 70%;
        transform: translateY(50px) translateX(-50%);

        img {
          width: 300px;
        }
      }

      &--right2 {
        z-index: 4;
        left: 85%;
        transform: translateY(50%) translateX(-50%);
        opacity: 0.7;

        img {
          width: 200px;
        }
      }

      &--right3 {
        left: 100%;
        opacity: 0;
        transform: translateY(50%) translateX(-50%);

        img {
          width: 200px;
        }
      }
    }
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
