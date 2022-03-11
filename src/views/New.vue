<template>
  <div class="new page d-flex flex-column">
    <Header :modal="true" />
    <h1 style="text-align: right">{{ $t('views.new.titre') }}</h1>
    <div class="d-flex">
      <v-col
        class="d-flex flex justify-center"
        cols="6"
        @dragenter.prevent
        @dragover.prevent
        @drop.stop.prevent="onDrop"
      >
        <img class="new__img pa-8" cover :src="image" />
      </v-col>
      <v-col class="px-6" cols="6">
        <h3>{{ $t('hero.id') }} : {{ id }}</h3>
        <v-form ref="form">
          <v-row justify="space-between" no-gutters>
            <v-col cols="6"
              ><v-text-field
                v-model="name"
                :label="$t('hero.nom')"
                :rules="nameRules"
                counter="30"
              ></v-text-field
            ></v-col>
            <v-col cols="1">
              <v-btn color="red" fab text @click="toggleFavorite"
                ><v-icon color="red" x-large>{{
                  this.favorite ? 'mdi-heart' : 'mdi-heart-outline'
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
          <v-row class="my-4" no-gutters
            ><v-btn class="ml-auto" color="#ff554fee" dark @click="addHero">{{
              $t('views.new.enregistrer')
            }}</v-btn></v-row
          >
        </v-form>
      </v-col>
    </div>
    <Alert v-if="alertDisplay" :success="false" :text="alertText" />
  </div>
</template>

<script>
import Hero from '../classes/Hero';
import Alert from '../components/Alert.vue';
import Dialog from '../components/Dialog.vue';
import Header from '../components/Header.vue';

export default {
  components: { Header, Dialog, Alert },
  name: 'New',

  data: () => ({
    alertDisplay: false,
    alertText: '',

    name: '',
    description: '',
    comics: 0,
    stories: 0,
    series: 0,
    events: 0,
    image: require('../assets/test.jpeg'),
    favorite: false,
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 30) || 'Name must be less than 30 characters',
    ],
  }),

  computed: {
    id() {
      return this.$store.getters.newId;
    },
  },

  methods: {
    /** Add the hero in the database. */
    addHero() {
      if (!this.$store.getters.load) {
        this.alertText = 'Veuillez attendre la fin du chargement des héros';
        this.alertDisplay = true;
      } else if (this.$refs.form.validate()) {
        try {
          let hero = new Hero(
            this.id,
            this.name,
            this.description,
            this.comics,
            this.stories,
            this.series,
            this.events,
            this.image,
            this.favorite
          );
          this.$store.commit('addHero', { hero });
          this.$router.push('/List');
        } catch (error) {
          this.alertText = 'Superhéro non créé, erreur : ' + error.toString();
          this.alertDisplay = true;
        }
      }
    },

    /** Toggle the favorite status of the hero. */
    toggleFavorite() {
      this.favorite = !this.favorite;
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
      let img = new Image();
      let reader = new FileReader();
      let vm = this;

      reader.onload = function (e) {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style lang="scss">
.new {
  &__img {
    box-shadow: 0px 0px 10px 5px #d4d4d4;
    background: white;
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
