<template>
  <div class="list d-flex flex-column">
    <h1>{{ $t('views.list.titre') }}</h1>
    <div class="d-flex align-center justify-space-around my-n3 mx-12">
      <v-col align-self="start" cols="4">
        <v-text-field
          v-model="searchInput"
          :label="$t('views.list.rechercher')"
          prepend-icon="mdi-magnify"
        ></v-text-field
      ></v-col>
      <v-col class="d-flex" cols="auto">
        <v-btn
          :color="cardsDisplay ? 'grey' : 'red'"
          fab
          text
          @click="toggleDisplay(false)"
          ><v-icon :color="cardsDisplay ? 'grey' : 'red'" large
            >mdi-format-list-bulleted</v-icon
          ></v-btn
        ><v-btn
          :color="cardsDisplay ? 'red' : 'grey'"
          fab
          text
          @click="toggleDisplay(true)"
          ><v-icon :color="cardsDisplay ? 'red' : 'grey'" large
            >mdi-dots-grid</v-icon
          ></v-btn
        >
      </v-col>
      <v-col class="" cols="2">
        <v-select
          v-model="currentSortType"
          :items="sortTypes"
          placeholder="Tri"
        ></v-select>
      </v-col>
      <v-col cols="3"
        ><v-slider
          v-model="sliderValue"
          :label="$t('views.list.nombre', { amount: heroAmount })"
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
      :items-per-page="heroAmount"
      :hide-default-footer="true"
      class="list__table mx-14"
      @dblclick:row="clickOnCard"
    >
      <template #item.image="{ item: { image } }">
        <img
          :src="
            image ==
            'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
              ? require('../assets/test.jpeg')
              : image
          "
          contain
          height="50"
          width="50"
        />
      </template>
      <template #item.favorite="{ item }">
        <v-icon color="red" @click.stop="toggleFavorite(item)">{{
          item.favorite ? 'mdi-heart' : 'mdi-heart-outline'
        }}</v-icon>
      </template>
    </v-data-table>
    <div v-else class="list__heroes d-flex flex-wrap justify-center">
      <Card v-for="hero in displayedHeroes" :key="hero.id" :hero="hero" />
    </div>
    <ul class="d-flex justify-center my-7" style="list-style: none">
      <li>
        <button
          v-show="currentPage != 1 && searchInput == ''"
          class="list__page"
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
          class="list__page"
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
        <span>{{ $t('views.list.nouveau') }}</span>
      </v-tooltip></router-link
    >
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Card from '../components/Card.vue';
import Header from '../components/Header.vue';

export default {
  components: { Card, Header },
  name: 'List',

  data() {
    return {
      amountMap: [10, 25, 50, 75, 100],
      cardsDisplay: true,
      currentSortType: this.$t('views.list.itemsTri[2]'),
      sortTypes: this.$t('views.list.itemsTri'),
      sliderValue: 3,
      currentPage: 1,
      searchInput: '',
      headers: [
        {
          text: this.$t('views.list.header[0]'),
          value: 'image',
          sortable: false,
        },
        {
          text: this.$t('views.list.header[1]'),
          value: 'id',
          width: '17%',
          sortable: false,
        },
        {
          text: this.$t('views.list.header[2]'),
          value: 'name',
          width: '28%',
          sortable: false,
        },
        {
          text: this.$t('views.list.header[3]'),
          value: 'comics',
          align: 'center',
          width: '10%',
          sortable: false,
        },
        {
          text: this.$t('views.list.header[4]'),
          value: 'stories',
          align: 'center',
          width: '10%',
          sortable: false,
        },
        {
          text: this.$t('views.list.header[5]'),
          value: 'series',
          align: 'center',
          width: '10%',
          sortable: false,
        },
        {
          text: this.$t('views.list.header[6]'),
          value: 'events',
          align: 'center',
          width: '10%',
          sortable: false,
        },
        {
          text: this.$t('views.list.header[7]'),
          value: 'favorite',
          align: 'center',
          width: '10%',
          sortable: false,
        },
      ],
    };
  },

  computed: {
    ...mapState(['heroes']),
    ...mapGetters(['paginatedHeroes', 'getFilteredHeroes']),

    heroAmount() {
      return this.amountMap[this.sliderValue];
    },

    displayedHeroes() {
      let crescent, byName, sortIndex, h;
      sortIndex = this.sortTypes.indexOf(this.currentSortType);
      sortIndex % 2 == 0 ? (crescent = true) : (crescent = false);
      sortIndex > 1 ? (byName = true) : (byName = false);

      // if search bar is empty
      if (this.searchInput == '') {
        h = this.paginatedHeroes(
          this.heroAmount,
          this.heroAmount * (this.currentPage - 1),
          byName
        );
      } else h = this.getFilteredHeroes(this.searchInput);
      if (!crescent) h.reverse();
      return h;
    },

    totalPages() {
      if (this.heroes.length % this.heroAmount == 0)
        return Math.floor(this.heroes.length / this.heroAmount);
      else return Math.floor(this.heroes.length / this.heroAmount) + 1;
    },
  },

  beforeMount() {
    this.$store.commit('setModal', { modal: false });
  },

  methods: {
    clickOnCard(e) {
      this.$router.push('/Informations/' + e.id);
    },

    toggleDisplay(value) {
      this.cardsDisplay = value;
    },

    toggleFavorite(hero) {
      hero.favorite = !hero.favorite;
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
