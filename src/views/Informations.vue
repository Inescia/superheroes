<template>
  <div class="informations page d-flex flex-column">
    <Header :modal="true" />
    <h1 style="text-align: right">{{ $t('views.informations.titre') }}</h1>
    <div class="d-flex">
      <v-col
        cols="6"
        class="d-flex flex justify-center"
        @dragenter.prevent
        @dragover.prevent
        @drop.stop.prevent="onDrop"
      >
        <img class="informations__img pa-8" cover :src="image" />
      </v-col>
      <v-col cols="6" class="px-6">
        <h3>{{ $t('hero.id') }} : {{ id }}</h3>
        <v-form ref="form">
          <v-row no-gutters justify="space-between">
            <v-col cols="6"
              ><v-text-field
                v-model="name"
                :rules="rules"
                counter="30"
                :label="$t('hero.nom')"
              ></v-text-field
            ></v-col>
            <v-col cols="1">
              <v-btn fab text color="red" @click="toggleFavorite"
                ><v-icon color="red" x-large>{{
                  favorite ? 'mdi-heart' : 'mdi-heart-outline'
                }}</v-icon></v-btn
              ></v-col
            >
          </v-row>
          <v-row no-gutters class="pt-5" justify="space-between">
            <v-col cols="2">
              <v-text-field
                outlined
                type="number"
                background-color="rgb(255, 255, 255, 0.5)"
                v-model="comics"
                :label="$t('hero.comics')"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                outlined
                background-color="rgb(255, 255, 255, 0.5)"
                type="number"
                v-model="stories"
                :label="$t('hero.stories')"
              ></v-text-field
            ></v-col>
            <v-col cols="2">
              <v-text-field
                outlined
                background-color="rgb(255, 255, 255, 0.5)"
                type="number"
                v-model="series"
                :label="$t('hero.series')"
              ></v-text-field
            ></v-col>
            <v-col cols="2">
              <v-text-field
                background-color="rgb(255, 255, 255, 0.5)"
                outlined
                type="number"
                v-model="events"
                :label="$t('hero.events')"
              ></v-text-field
            ></v-col>
          </v-row>
          <v-textarea
            outlined
            background-color="rgb(255, 255, 255, 0.5)"
            v-model="description"
            :label="$t('hero.description')"
            counter="600"
            rows="6"
          ></v-textarea>
          <v-row no-gutters class="my-4">
            <v-btn @click="removeHero">{{
              $t('views.informations.supprimer')
            }}</v-btn
            ><v-btn class="mx-5" @click="resetHero">{{
              $t('views.informations.reinitialiser')
            }}</v-btn>
            <v-btn class="ml-auto" @click="updateHero">{{
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

export default {
  components: { Header, List },
  name: 'Informations',
  data: () => ({
    hero: null,
    name: '',
    description: '',
    comics: 0,
    stories: 0,
    series: 0,
    events: 0,
    favorite: false,
    image: require('../assets/test.jpeg'),
    rules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 30) || 'Name must be less than 30 characters',
    ],
  }),

  props: {
    id: {
      require,
    },
  },

  created() {
    this.hero = this.$store.getters.heroById(this.id);
    this.name = this.hero.name;
    this.description = this.hero.description;
    this.comics = this.hero.comics;
    this.stories = this.hero.stories;
    this.series = this.hero.series;
    this.events = this.hero.events;
    this.favorite = this.hero.favorite;
    if (
      this.hero.image !=
      'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    )
      this.image = this.hero.image;
  },

  methods: {
    updateHero() {
      if (this.$refs.form.validate()) {
        try {
          const {
            name,
            description,
            comics,
            stories,
            series,
            events,
            favorite,
            image,
          } = this.hero;
          const values = [
            'name',
            'description',
            'comics',
            'stories',
            'series',
            'events',
            'favorite',
            'image',
          ];
          values.forEach((value) => {
            this.hero[value] = this[value];
          });

          alert('Modifications enregistrées');
          window.history.length >= 2
            ? this.$router.go(-1)
            : this.$router.push('/List');
        } catch (error) {
          alert('Modifications non enregistrées\nErreur : ' + error);
        }
      }
    },

    removeHero() {
      let id = this.id;
      if (confirm('Voulez-vous vraiment supprimer ce superhéro ?'))
        try {
          this.$store.commit('removeHero', { id });
          window.history.length >= 2
            ? this.$router.go(-1)
            : this.$router.push('/List');
          alert('Superhéro supprimé');
        } catch (error) {
          alert('Superhéro non supprimé \nErreur : ' + error);
        }
    },

    resetHero() {
      const {
        name,
        description,
        comics,
        stories,
        series,
        events,
        favorite,
        image,
      } = this.hero;
      const values = [
        'name',
        'description',
        'comics',
        'stories',
        'series',
        'events',
        'favorite',
        'image',
      ];
      values.forEach((value) => {
        this[value] = this.hero[value];
      });
    },

    toggleFavorite() {
      this.favorite = !this.favorite;
    },

    onDrop: function (e) {
      e.stopPropagation();
      e.preventDefault();
      let files = e.dataTransfer.files;
      this.createFile(files[0]);
    },

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
