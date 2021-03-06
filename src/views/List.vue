<template>
  <div class="list d-flex flex-column">
    <h1>{{ $t('VIEWS.LIST.TITLE') }}</h1>
    <div class="align-center d-flex justify-space-around my-n3 mx-12">
      <v-col align-self="start" cols="4">
        <v-text-field
          v-model="searchInput"
          :hint="
            searchInput != ''
              ? $tc('HERO.HERO', displayedHeroes.length, {
                  count: displayedHeroes.length,
                })
              : ''
          "
          :label="$t('VIEWS.LIST.SEARCH')"
          prepend-icon="mdi-magnify"
      /></v-col>
      <v-col class="d-flex" cols="auto">
        <v-btn
          :color="cardsDisplay ? 'grey' : 'red'"
          fab
          text
          @click="cardsDisplay = false"
          ><v-icon :color="cardsDisplay ? 'grey' : 'red'" large
            >mdi-format-list-bulleted</v-icon
          ></v-btn
        ><v-btn
          :color="cardsDisplay ? 'red' : 'grey'"
          fab
          text
          @click="cardsDisplay = true"
          ><v-icon :color="cardsDisplay ? 'red' : 'grey'" large
            >mdi-dots-grid</v-icon
          ></v-btn
        >
      </v-col>
      <v-col cols="2">
        <v-select
          v-model="currentSortType"
          :append-outer-icon="
            crescent ? 'mdi-arrow-top-right' : 'mdi-arrow-bottom-right'
          "
          :items="sortTypes"
          :placeholder="$t('VIEWS.LIST.SORT')"
          @click:append-outer="crescent = !crescent"
        />
      </v-col>
      <v-col cols="3"
        ><v-slider
          v-model="sliderValue"
          :disabled="searchInput != '' ? true : false"
          :label="$t('VIEWS.LIST.HEROES_AMOUNT', { amount: heroesAmount })"
          hide-details
          max="4"
          thumb-label
          track-color="grey"
          ><template v-slot:thumb-label="{ value }">
            {{ amountMap[value] }}
          </template></v-slider
        ></v-col
      >
    </div>
    <v-data-table
      v-if="!cardsDisplay"
      :headers="headers"
      :items="displayedHeroes"
      :items-per-page="heroesAmount"
      :hide-default-footer="true"
      class="list__table mx-14"
      @dblclick:row="clickOnCard"
    >
      <template #item.image="{ item: { image } }">
        <img
          :src="
            image ==
              'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ||
            image ==
              'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif'
              ? require('../assets/test.jpeg')
              : image
          "
          contain
          height="50"
          width="50"
        />
      </template>
      <template #item.favorite="{ item }">
        <v-icon color="red" @click.stop="item.favorite = !item.favorite">{{
          item.favorite ? 'mdi-heart' : 'mdi-heart-outline'
        }}</v-icon>
      </template>
    </v-data-table>
    <div v-else class="list__heroes d-flex flex-wrap justify-center">
      <Card v-for="hero in displayedHeroes" :key="hero.id" :hero="hero" />
    </div>
    <ul
      class="align-center d-flex justify-center my-7 mx-16 px-14"
      style="list-style: none"
    >
      <li>
        <button
          v-show="currentPage != 1 && searchInput == ''"
          class="list__page mx-2"
          @click="currentPage--"
        >
          <v-icon color="#607d8b"> mdi-arrow-left</v-icon>
        </button>
      </li>
      <li>
        <button
          v-show="searchInput == ''"
          v-for="i in totalPages"
          :key="i"
          :style="currentPage == i ? 'color: #ff554fee' : 'color:  #607d8b'"
          class="list__page pa-1"
          type="button"
          @click="currentPage = i"
        >
          {{ i }}
        </button>
      </li>
      <li>
        <button
          v-show="currentPage < totalPages && searchInput == ''"
          class="list__page mx-2"
          @click="currentPage++"
        >
          <v-icon color="#607d8b">mdi-arrow-right</v-icon>
        </button>
      </li>
    </ul>
    <router-link to="/New"
      ><v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-on="on"
            class="list__new"
            color="red"
            elevation="2"
            fab
            x-large
            ><v-icon v-on="on" color="white" x-large>mdi-plus</v-icon></v-btn
          ></template
        >
        <span>{{ $t('VIEWS.LIST.NEW') }}</span>
      </v-tooltip></router-link
    >
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Card from '../components/Card.vue';
import Header from '../components/Header.vue';

export default {
  name: 'List',
  components: { Card, Header },

  data() {
    return {
      amountMap: [10, 25, 50, 75, 100],
      cardsDisplay: true,
      currentSortType: null,
      crescent: true,
      currentPage: 1,
      sliderValue: 3,
      searchInput: '',
    };
  },

  computed: {
    ...mapState(['heroes']),
    ...mapGetters(['getPaginatedHeroes', 'getFilteredHeroes']),

    displayedHeroes() {
      let byName, sortIndex, h;
      sortIndex = this.sortTypes.indexOf(this.currentSortType);
      sortIndex > 0 ? (byName = true) : (byName = false);

      // if search bar is empty
      if (this.searchInput == '') {
        h = this.getPaginatedHeroes(
          this.heroesAmount,
          this.heroesAmount * (this.currentPage - 1),
          byName,
          this.crescent
        );
      } else
        h = this.getFilteredHeroes(this.searchInput, byName, this.crescent);
      return h;
    },

    heroesAmount() {
      return this.amountMap[this.sliderValue];
    },

    totalPages() {
      if (this.heroes.length % this.heroesAmount == 0)
        return Math.floor(this.heroes.length / this.heroesAmount);
      else return Math.floor(this.heroes.length / this.heroesAmount) + 1;
    },

    sortTypes() {
      return this.$t('VIEWS.LIST.SORT_TYPES');
    },

    headers() {
      return [
        {
          text: this.$t('VIEWS.LIST.HEADERS[0]'),
          value: 'image',
          sortable: false,
        },
        {
          text: this.$t('VIEWS.LIST.HEADERS[1]'),
          value: 'id',
          width: '17%',
          sortable: false,
        },
        {
          text: this.$t('VIEWS.LIST.HEADERS[2]'),
          value: 'name',
          width: '28%',
          sortable: false,
        },
        {
          text: this.$t('VIEWS.LIST.HEADERS[3]'),
          value: 'comics',
          align: 'center',
          width: '10%',
          sortable: false,
        },
        {
          text: this.$t('VIEWS.LIST.HEADERS[4]'),
          value: 'stories',
          align: 'center',
          width: '10%',
          sortable: false,
        },
        {
          text: this.$t('VIEWS.LIST.HEADERS[5]'),
          value: 'series',
          align: 'center',
          width: '10%',
          sortable: false,
        },
        {
          text: this.$t('VIEWS.LIST.HEADERS[6]'),
          value: 'events',
          align: 'center',
          width: '10%',
          sortable: false,
        },
        {
          text: this.$t('VIEWS.LIST.HEADERS[7]'),
          value: 'favorite',
          align: 'center',
          width: '10%',
          sortable: false,
        },
      ];
    },
  },

  methods: {
    /** @method to go to the information page
     * @param {event} event The event associated to the click
     * @param {object} object The object associated to the click
     */
    clickOnCard(event, object) {
      this.$router.push('/Informations/' + object.item.id);
    },
  },
};
</script>

<style lang="scss">
.list {
  &__table {
    opacity: 0.8;
    animation: fadeInAnimation ease 2s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    cursor: pointer;
  }

  &__heroes {
    animation: fadeInAnimation ease 2s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  &__page {
    display: inline;
    font-size: 20px;
  }

  &__new {
    position: fixed;
    bottom: 6%;
    right: 5%;
  }
}
</style>
