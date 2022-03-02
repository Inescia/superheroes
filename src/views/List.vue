<template>
  <div class="page list">
    <Header :btn="false" />
    <h1 class="title1">SUPERHEROES.</h1>
    <div class="list__bar">
      <v-col cols="1"></v-col
      ><v-col cols="7">
        <v-text-field
          prepend-icon="mdi-magnify"
          label="Rechercher"
          v-model="search"
          hide-details
        ></v-text-field></v-col
      ><v-btn to="/New">Nouveau Superhéro</v-btn>
    </div>
    <div class="list__bar">
      <v-col class="list__bar__switch" cols="3">
        <p class="list__bar__text">Affichage :</p>
        <p class="list__bar__textSwitch">Liste</p>
        <v-switch v-model="display" label="Cartes"></v-switch>
      </v-col>
      <v-col class="list__bar__switch" cols="3">
        <p class="list__bar__text">Tri :</p>
        <p class="list__bar__textSwitch">ID</p>
        <v-switch v-model="sort" label="Nom"></v-switch>
      </v-col>
      <v-col cols="2"></v-col>
      <v-col cols="4"
        ><v-slider
          v-model="number"
          :label="number + ' héros/pages'"
          hide-details
          max="200"
          min="10"
          persistent-hint
          step="20"
          thumb-label
          track-color="grey"
        ></v-slider
      ></v-col>
    </div>
    <v-data-table
      v-if="!display"
      class="list__table"
      @click:row="onClick"
      :headers="headers"
      :items="heroesDisplayed"
      :items-per-page="number"
      :hide-default-footer="true"
    >
      <!-- <template v-slot:item.favorie={ ""}>
        <div></div>
        <v-icon color="red"> mdi-heart </v-icon>
      </template> -->
    </v-data-table>
    <div v-else class="list__heroes">
      <Card v-for="heroe in heroesDisplayed" :key="heroe.id" :heroe="heroe" />
    </div>
    <ul class="list__pages">
      <li>
        <button class="list__page" v-show="page != 1" @click="page--">
          <v-icon color="#607d8b"> mdi-arrow-left</v-icon>
        </button>
      </li>
      <li>
        <button
          type="button"
          class="list__page"
          v-for="i in pages"
          @click="page = i"
          :key="i"
        >
          {{ i }}
        </button>
      </li>
      <li>
        <button @click="page++" v-show="page < pages" class="list__page">
          <v-icon color="#607d8b">mdi-arrow-right</v-icon>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Card from '../components/Card.vue'

export default {
  components: { Header, Card },
  name: 'List',
  data () {
    return {
      display: true,
      sort: true,
      number: 50,
      page: 1,
      search: '',
      headers: [
        { text: 'ID', value: 'id', width: '20%', sortable: false },
        { text: 'Nom', value: 'name', width: '30%', sortable: false },
        {
          text: 'Comics',
          value: 'comics',
          align: 'center',
          width: '10%',
          sortable: false
        },
        {
          text: 'Stories',
          value: 'stories',
          align: 'center',
          width: '10%',
          sortable: false
        },
        {
          text: 'Series',
          value: 'series',
          align: 'center',
          width: '10%',
          sortable: false
        },
        {
          text: 'Events',
          value: 'events',
          align: 'center',
          width: '10%',
          sortable: false
        },
        {
          text: 'Favorie',
          value: 'favorie',
          align: 'center',
          width: '10%',
          sortable: false
        }
      ]
    }
  },

  computed: {
    heroesDisplayed () {
      var h
      // si recherche vide => affichage de tous les heros
      if (this.search == '') {
        h = this.$store.getters.heroes(
          this.number,
          this.number * (this.page - 1),
          this.sort
        )
      } else h = this.$store.getters.heroeByName(this.search)
      return h
    },

    pages () {
      var n = this.$store.getters.numberHeroes
      if (n % this.number == 0) return Math.floor(n / this.number)
      else return Math.floor(n / this.number) + 1
    }
  },

  methods: {
    onClick: function (e) {
      this.$router.push('/Informations/' + e.id)
    }
  }
}
</script>

<style lang="scss">
.list {
  &__bar {
    display: flex;
    align-items: center;
    margin: -10px 20px;
    justify-content: space-around;

    &__switch {
      display: flex;
      align-items: flex-start;
    }

    &__text {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.6);
      padding-top: 22px;
      padding-right: 8px;
    }

    &__textSwitch {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.6);
      padding-top: 20px;
      padding-right: 8px;
    }
  }

  &__table {
    margin: 0px 30px;
    opacity: 0.8;
    animation: fadeInAnimation ease 2s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  &__heroes {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    animation: fadeInAnimation ease 2s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
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
