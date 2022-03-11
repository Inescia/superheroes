<template>
  <div class="list page d-flex flex-column">
    <Header />
    <h1>{{ $t('views.list.titre') }}</h1>
    <div class="d-flex align-center justify-space-around my-n3 mx-12">
      <v-col cols="4" align-self="start">
        <v-text-field
          prepend-icon="mdi-magnify"
          :label="$t('views.list.rechercher')"
          v-model="search"
        ></v-text-field
      ></v-col>
      <v-col class="d-flex" cols="auto">
        <v-btn
          fab
          text
          :color="display ? 'grey' : 'red'"
          @click="toggleDisplay(false)"
          ><v-icon :color="display ? 'grey' : 'red'" large
            >mdi-format-list-bulleted</v-icon
          ></v-btn
        ><v-btn
          fab
          text
          :color="display ? 'red' : 'grey'"
          @click="toggleDisplay(true)"
          ><v-icon :color="display ? 'red' : 'grey'" large
            >mdi-dots-grid</v-icon
          ></v-btn
        >
      </v-col>
      <v-col class="" cols="2">
        <v-select
          v-model="sort"
          :items="itemsSort"
          placeholder="Tri"
        ></v-select>
      </v-col>
      <v-col cols="3"
        ><v-slider
          v-model="number"
          :label="number + $t('views.list.nombre')"
          hide-details
          max="100"
          min="10"
          persistent-hint
          step="15"
          thumb-label
          track-color="grey"
        ></v-slider
      ></v-col>
    </div>
    <v-data-table
      v-if="!display"
      class="list__table mx-14"
      @click:row="onClick"
      :headers="headers"
      :items="heroesDisplayed"
      :items-per-page="number"
      :hide-default-footer="true"
    >
      <template #item.image="{ item: { image } }">
        <img
          class=""
          height="50"
          width="50"
          contain
          :src="
            image ==
            'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
              ? require('../assets/test.jpeg')
              : image
          "
        />
      </template>
      <template #item.favorite="{ item }">
        <v-icon @click.stop="toggleFavorite(item)" color="red">{{
          item.favorite ? 'mdi-heart' : 'mdi-heart-outline'
        }}</v-icon>
      </template>
    </v-data-table>
    <div v-else class="list__heroes d-flex flex-wrap justify-center">
      <Card v-for="hero in heroesDisplayed" :key="hero.id" :hero="hero" />
    </div>
    <ul class="d-flex justify-center my-7" style="list-style: none">
      <li>
        <button
          class="list__page"
          v-show="page != 1 && search == ''"
          @click="page--"
        >
          <v-icon color="#607d8b"> mdi-arrow-left</v-icon>
        </button>
      </li>
      <li>
        <button
          v-show="search == ''"
          type="button"
          :style="page == i ? 'color: #ff554fee' : 'color:  #607d8b'"
          class="list__page pa-1"
          v-for="i in pages"
          @click="page = i"
          :key="i"
        >
          {{ i }}
        </button>
      </li>
      <li>
        <button
          @click="page++"
          v-show="page < pages && search == ''"
          class="list__page"
        >
          <v-icon color="#607d8b">mdi-arrow-right</v-icon>
        </button>
      </li>
    </ul>
    <router-link to="/New">
      <v-btn class="list__new" color="red" elevation="2" fab x-large
        ><v-icon color="white" x-large>mdi-plus</v-icon></v-btn
      ></router-link
    >
  </div>
</template>

<script>
import Card from '../components/Card.vue';
import Header from '../components/Header.vue';

export default {
  components: { Card, Header },
  name: 'List',

  data() {
    return {
      display: true,
      sort: 'Name ↑',
      itemsSort: ['ID ↑', 'ID ↓', 'Name ↑', 'Name ↓'],
      number: 50,
      page: 1,
      search: '',
      headers: [
        { text: 'Avatar', value: 'image', sortable: false },
        { text: 'ID', value: 'id', width: '17%', sortable: false },
        { text: 'Nom', value: 'name', width: '28%', sortable: false },
        {
          text: 'Comics',
          value: 'comics',
          align: 'center',
          width: '10%',
          sortable: false,
        },
        {
          text: 'Stories',
          value: 'stories',
          align: 'center',
          width: '10%',
          sortable: false,
        },
        {
          text: 'Series',
          value: 'series',
          align: 'center',
          width: '10%',
          sortable: false,
        },
        {
          text: 'Events',
          value: 'events',
          align: 'center',
          width: '10%',
          sortable: false,
        },
        {
          text: 'Favorite',
          value: 'favorite',
          align: 'center',
          width: '10%',
          sortable: false,
        },
      ],
    };
  },

  computed: {
    heroesDisplayed() {
      let crescent, byName, index, h;
      index = this.itemsSort.indexOf(this.sort);
      index % 2 == 0 ? (crescent = true) : (crescent = false);
      index > 1 ? (byName = true) : (byName = false);

      // if search bar is empty
      if (this.search == '') {
        h = this.$store.getters.heroes(
          this.number,
          this.number * (this.page - 1),
          byName
        );
      } else h = this.$store.getters.heroesByText(this.search);
      if (!crescent) h.reverse();
      return h;
    },

    pages() {
      let n = this.$store.getters.numberHeroes;
      if (n % this.number == 0) return Math.floor(n / this.number);
      else return Math.floor(n / this.number) + 1;
    },
  },

  methods: {
    onClick(e) {
      this.$router.push('/Informations/' + e.id);
    },

    toggleDisplay(value) {
      this.display = value;
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
    bottom: 5%;
    right: 5%;
  }
}
</style>
