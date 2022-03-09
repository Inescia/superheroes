<template>
  <div class="new page d-flex flex-column">
    <Header :modal="true" />
    <h1 style="text-align: right">{{ $t('views.new.titre') }}</h1>
    <div class="d-flex">
      <v-col
        cols="6"
        class="d-flex flex justify-center"
        @dragenter.prevent
        @dragover.prevent
        @drop.stop.prevent="onDrop"
      >
        <img class="new__img pa-8" cover :src="image" />
      </v-col>
      <v-col cols="6" class="px-6">
        <h3>{{ $t('hero.id') }} : {{ id }}</h3>
        <v-form ref="form">
          <v-row no-gutters justify="space-between">
            <v-col cols="6"
              ><v-text-field
                v-model="name"
                :rules="nameRules"
                counter="30"
                :label="$t('hero.nom')"
              ></v-text-field
            ></v-col>
            <v-col cols="1">
              <v-btn fab text color="red" @click="toggleFavorite"
                ><v-icon color="red" x-large>{{
                  this.favorite ? 'mdi-heart' : 'mdi-heart-outline'
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
          <v-row no-gutters class="my-4"
            ><v-btn class="ml-auto" @click="addHero">{{
              $t('views.new.enregistrer')
            }}</v-btn></v-row
          >
        </v-form>
      </v-col>
    </div>
    <Footer />
  </div>
</template>

<script>
import Hero from '../classes/Hero';
import Header from '../components/Header.vue';

export default {
  components: { Header },
  name: 'New',
  data: () => ({
    id: '',
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
  beforeMount() {
    this.id = this.$store.getters.newId;
  },
  methods: {
    addHero() {
      if (this.$refs.form.validate()) {
        try {
          let hero = new Hero(
            '0000002',
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
          alert('Superhéro créé');
          this.$router.push('/List');
        } catch (error) {
          alert('Superhéro non créé\nErreur : ' + error);
        }
      }
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
