<template>
  <List v-if="this.id == ''" />
  <div v-else class="page">
    <Header />
    <h1 class="title2">{{ $t('views.informations.titre') }}</h1>
    <div class="informations">
      <div
        class="informations__containerImg"
        @dragenter.prevent
        @dragover.prevent
        @drop.stop.prevent="onDrop"
      >
        <img class="informations__containerImg__img" :src="image" />
      </div>
      <v-col>
        <h3>{{ $t('heroe.id') }} : {{ this.id }}</h3>
        <v-form ref="form">
          <v-row justify="space-between" align="center">
            <v-col cols="5"
              ><v-text-field
                class="informations__name"
                v-model="name"
                :rules="rules"
                counter="30"
                :label="$t('heroe.nom')"
              ></v-text-field
            ></v-col>
            <v-col cols="2">
              <v-btn fab text color="red" @click="toggleFavorie"
                ><v-icon color="red" x-large>{{
                  this.favorie ? 'mdi-heart' : 'mdi-heart-outline'
                }}</v-icon></v-btn
              ></v-col
            >
          </v-row>
          <v-row class="informations__groupNumber">
            <v-col cols="2">
              <v-text-field
                outlined
                type="number"
                background-color="rgb(255, 255, 255, 0.5)"
                v-model="comics"
                :label="$t('heroe.comics')"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                outlined
                background-color="rgb(255, 255, 255, 0.5)"
                type="number"
                v-model="stories"
                :label="$t('heroe.stories')"
              ></v-text-field
            ></v-col>
            <v-col cols="2">
              <v-text-field
                outlined
                background-color="rgb(255, 255, 255, 0.5)"
                type="number"
                v-model="series"
                :label="$t('heroe.series')"
              ></v-text-field
            ></v-col>
            <v-col cols="2">
              <v-text-field
                background-color="rgb(255, 255, 255, 0.5)"
                outlined
                type="number"
                v-model="events"
                :label="$t('heroe.events')"
              ></v-text-field
            ></v-col>
          </v-row>
          <v-col cols="auto" class="informations__description">
            <v-textarea
              outlined
              background-color="rgb(255, 255, 255, 0.5)"
              v-model="description"
              :label="$t('heroe.description')"
              counter="600"
              rows="5"
            ></v-textarea>
          </v-col>
          <v-row class="informations__btns">
            <div>
              <v-btn @click="removeHeroe">{{
                $t('views.informations.supprimer')
              }}</v-btn
              ><v-btn @click="resetHeroe">{{
                $t('views.informations.reinitialiser')
              }}</v-btn>
            </div>
            <v-btn @click="updateHeroe">{{
              $t('views.informations.enregistrer')
            }}</v-btn></v-row
          >
        </v-form>
      </v-col>
    </div>
    <Footer />
  </div>
</template>

<script>
import List from '../views/List.vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
  components: { Header, List, Footer },
  name: 'Informations',
  data: () => ({
    heroe: null,
    name: '',
    description: '',
    comics: 0,
    stories: 0,
    series: 0,
    events: 0,
    favorie: false,
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
    this.heroe = this.$store.getters.heroeById(this.id);
    this.name = this.heroe.name;
    this.description = this.heroe.description;
    this.comics = this.heroe.comics;
    this.stories = this.heroe.stories;
    this.series = this.heroe.series;
    this.events = this.heroe.events;
    this.favorie = this.heroe.favorie;
    if (
      this.heroe.image !=
      'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    )
      this.image = this.heroe.image;
  },

  methods: {
    updateHeroe() {
      if (this.$refs.form.validate()) {
        try {
          this.heroe.name = this.name;
          this.heroe.description = this.description;
          this.heroe.comics = this.comics;
          this.heroe.stories = this.stories;
          this.heroe.series = this.series;
          this.heroe.events = this.events;
          this.heroe.favorie = this.favorie;
          this.heroe.image = this.image;
          alert('Modifications enregistrées');
          window.history.length >= 2
            ? this.$router.go(-1)
            : this.$router.push('/List');
        } catch (error) {
          alert('Modifications non enregistrées\nErreur : ' + error);
        }
      }
    },

    removeHeroe() {
      var id = this.id;
      if (confirm('Voulez-vous vraiment supprimer ce superhéro ?'))
        try {
          this.$store.commit('removeHeroe', { id });
          window.history.length >= 2
            ? this.$router.go(-1)
            : this.$router.push('/List');
          alert('Superhéro supprimé');
        } catch (error) {
          alert('Superhéro non supprimé \nErreur : ' + error);
        }
    },

    resetHeroe() {
      this.name = this.heroe.name;
      this.description = this.heroe.description;
      this.comics = this.heroe.comics;
      this.stories = this.heroe.stories;
      this.series = this.heroe.series;
      this.events = this.heroe.events;
      this.favorie = this.heroe.favorie;
      this.image = this.heroe.image;
    },

    toggleFavorie() {
      this.favorie = !this.favorie;
    },

    onDrop: function (e) {
      e.stopPropagation();
      e.preventDefault();
      var files = e.dataTransfer.files;
      this.createFile(files[0]);
    },

    createFile(file) {
      if (!file.type.match('image.*')) {
        alert('Select an image');
        return;
      }
      var reader = new FileReader();
      var vm = this;

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
  display: flex;
  flex-direction: row;
  width: 100%;

  &__containerImg {
    flex: 1;
    display: flex;
    justify-content: center;

    &__img {
      box-shadow: 0px 0px 10px 5px #d4d4d4;
      background: white;
      padding: 30px;
      height: auto;
      max-height: 470px;
      max-width: 470px;
      object-fit: cover;
      transform: scale(1);
      transition: transform 0.5s;

      &:hover {
        transform: scale(1.15);
      }
    }
  }

  &__name {
    margin-left: 40px;
  }

  &__groupNumber {
    justify-content: space-around;
    margin: 0px 20px -20px 10px;
  }

  &__description {
    margin: 0px 10px 0px 20px;
  }

  &__btns {
    justify-content: space-between;
    align-items: center;
    margin: 0px 15px 0px 25px;
  }
}
</style>
