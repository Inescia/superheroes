<template>
  <div class="informations d-flex flex-column page">
    <Header :modal="true" />
    <h1 style="text-align: right">{{ $t('views.informations.titre') }}</h1>
    <div v-if="hero != null" class="d-flex">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }"
          ><v-col
            class="d-flex flex justify-center"
            cols="6"
            @dragenter.prevent
            @dragover.prevent
            @drop.stop.prevent="onDrop"
          >
            <img
              v-on="on"
              :src="image"
              class="informations__img pa-8"
              cover
            /> </v-col
        ></template>
        <span>{{ $t('hero.tooltip') }}</span>
      </v-tooltip>
      <v-col class="px-6" cols="6">
        <h3>{{ $t('hero.id') }} : {{ id }}</h3>
        <v-form ref="form">
          <v-row justify="space-between" no-gutters>
            <v-col cols="6"
              ><v-text-field
                v-model="name"
                :label="$t('hero.nom')"
                :rules="rules"
                counter="30"
              ></v-text-field
            ></v-col>
            <v-col cols="1">
              <v-btn color="red" fab text @click="toggleFavorite"
                ><v-icon color="red" x-large>{{
                  favorite ? 'mdi-heart' : 'mdi-heart-outline'
                }}</v-icon></v-btn
              ></v-col
            >
          </v-row>
          <v-row class="pt-5" justify="space-between" no-gutters>
            <v-col cols="2">
              <v-text-field
                v-model="comics"
                :label="$t('hero.comics')"
                background-color="rgb(255, 255, 255, 0.5)"
                outlined
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="stories"
                :label="$t('hero.stories')"
                background-color="rgb(255, 255, 255, 0.5)"
                outlined
                type="number"
              ></v-text-field
            ></v-col>
            <v-col cols="2">
              <v-text-field
                v-model="series"
                :label="$t('hero.series')"
                background-color="rgb(255, 255, 255, 0.5)"
                outlined
                type="number"
              ></v-text-field
            ></v-col>
            <v-col cols="2">
              <v-text-field
                v-model="events"
                :label="$t('hero.events')"
                background-color="rgb(255, 255, 255, 0.5)"
                outlined
                type="number"
              ></v-text-field
            ></v-col>
          </v-row>
          <v-textarea
            v-model="description"
            :label="$t('hero.description')"
            background-color="rgb(255, 255, 255, 0.5)"
            counter="600"
            outlined
            rows="6"
          ></v-textarea>
          <v-row class="my-4" no-gutters>
            <v-btn color="#ff554fee" dark @click="removeHero">{{
              $t('views.informations.supprimer')
            }}</v-btn
            ><v-btn
              class="mx-5"
              color="#ff554fee"
              dark
              @click="synchronizeInformations(true)"
              >{{ $t('views.informations.reinitialiser') }}</v-btn
            >
            <v-btn class="ml-auto" color="#ff554fee" dark @click="updateHero">{{
              $t('views.informations.enregistrer')
            }}</v-btn>
          </v-row>
        </v-form>
      </v-col>
    </div>
  </div>
</template>

<script>
import List from '../views/List.vue';
import Header from '../components/Header.vue';
import Hero from '../classes/Hero';
import { fetchHeroByIdAPI } from '../api/Marvel.js';
import { mapGetters } from 'vuex';

export default {
  components: { Header, List },
  name: 'Informations',

  data: () => ({
    hero: new Hero('', '...', '...', '...', '...', '...', '...', '...', '...'),
    name: '',
    description: '',
    comics: 0,
    stories: 0,
    series: 0,
    events: 0,
    favorite: false,
    image: require('../assets/test.jpeg'),
    rules: [(v) => !!v || 'Name is required'],
  }),

  computed: {
    ...mapGetters(['load', 'heroById']),
  },

  props: {
    id: {
      require,
    },
  },

  async created() {
    if (this.heroById(this.id) == null) {
      let result = [];

      await fetchHeroByIdAPI(this.id).then(function (value) {
        result = value;
      });

      this.hero = result.map((data) => {
        return new Hero(
          data.id,
          data.name,
          data.description,
          data.comics.available,
          data.stories.available,
          data.series.available,
          data.events.available,
          `${data.thumbnail.path}.${data.thumbnail.extension}`
        );
      })[0];
    } else this.hero = this.heroById(this.id);
    this.synchronizeInformations(true);
  },

  methods: {
    /**
     * Create the file for the new image.
     *
     * @param {file} file The i dropped
     */
    createFile(file) {
      if (!file.type.match('image.*')) {
        alert('Select an image');
        return;
      }
      let reader = new FileReader();
      let vm = this;
      reader.onload = function (e) {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    /**
     * Retrieve the file dropped.
     *
     * @param {event} e The event associated
     */
    onDrop(e) {
      e.stopPropagation();
      e.preventDefault();
      let files = e.dataTransfer.files;
      this.createFile(files[0]);
    },

    /** Remove the hero in the database. */
    removeHero() {
      let id = this.id;
      if (!this.load)
        this.showAlert(this.$t('notification.erreur.chargement'), false);
      else if (confirm(this.$t('notification.confirmation')))
        try {
          this.$store.commit('removeHero', { id });
          this.showAlert(this.$t('notification.succes.suppression'), true);
          window.history.length >= 2
            ? this.$router.go(-1)
            : this.$router.push('/List');
        } catch (error) {
          this.showAlert(
            this.$t('notification.erreur.suppression') + error,
            false
          );
        }
    },

    /**
     * Show an alert during 4s.
     *
     * @param {string} text The alert's text
     * @param {string} success The alert's type (true = success/ false = error)
     */
    showAlert(text, success) {
      this.$store.commit('changeNotification', {
        display: true,
        success: success,
        text: text,
      });
      setTimeout(() => {
        this.$store.commit('changeNotification', {
          display: false,
          success: true,
          text: '',
        });
      }, 5000);
    },

    /**
     * Synchronize the heroe's informations (get informations from the database or push informations to the database).
     *
     * @param {boolean} getInfo The type of synchronisation (true = get / false = push)
     */
    synchronizeInformations(getInfo) {
      const { name, description, comics, stories, series, events, favorite } =
        this.hero;
      const values = [
        'name',
        'description',
        'comics',
        'stories',
        'series',
        'events',
        'favorite',
      ];
      values.forEach((value) => {
        getInfo
          ? (this[value] = this.hero[value])
          : (this.hero[value] = this[value]);
      });
      if (!getInfo) this.hero.image = this.image;
      else if (
        this.hero.image !=
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
      )
        this.image = this.hero.image;
    },

    /** Toggle the favorite status of the hero. */
    toggleFavorite() {
      this.favorite = !this.favorite;
    },

    /** Save the modifications in the database. */
    updateHero() {
      if (!this.load)
        this.showAlert(this.$t('notification.erreur.chargement'), false);
      else if (this.$refs.form.validate()) {
        this.hero = this.heroById(this.id);
        try {
          this.synchronizeInformations(false);
          this.showAlert(this.$t('notification.succes.modification'), true);
          window.history.length >= 2
            ? this.$router.go(-1)
            : this.$router.push('/List');
        } catch (error) {
          this.showAlert(
            this.$t('notification.erreur.modification') + error,
            false
          );
        }
      }
    },
  },
};
</script>

<style lang="scss">
.informations {
  &__img {
    background: white;
    box-shadow: 0px 0px 10px 5px #d4d4d4;
    height: auto;
    max-height: 470px;
    max-width: 470px;
    transform: scale(1);
    transition: transform 0.5s;

    &:hover {
      transform: scale(1.15);
    }
  }
}
</style>
