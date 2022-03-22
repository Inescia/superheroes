<template>
  <div class="informations d-flex flex-column">
    <h1 style="text-align: right">{{ $t('VIEWS.INFORMATIONS.TITLE') }}</h1>
    <input
      ref="file"
      style="display: none"
      type="file"
      @change="onSelectImage"
    />
    <div v-if="hero != null" class="d-flex">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }"
          ><v-col
            class="d-flex flex justify-center"
            cols="6"
            @click="$refs.file.click()"
            @dragenter.prevent
            @dragover.prevent
            @drop.stop.prevent="onDropImage"
          >
            <img
              v-on="on"
              :src="image"
              class="informations__img pa-8"
              cover
            /> </v-col
        ></template>
        <span>{{ $t('HERO.TOOLTIP') }}</span>
      </v-tooltip>
      <v-col class="px-6" cols="6">
        <h3>{{ $t('HERO.ID') }} : {{ id }}</h3>
        <v-form ref="form">
          <v-row justify="space-between" no-gutters>
            <v-col cols="6"
              ><v-text-field
                v-model="name"
                :label="$t('HERO.NAME')"
                counter="30"
              />
            </v-col>
            <v-col cols="1">
              <v-btn color="red" fab text @click="favorite = !favorite"
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
                :label="$t('HERO.COMICS')"
                background-color="rgb(255, 255, 255, 0.5)"
                outlined
                type="number"
              />
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="stories"
                :label="$t('HERO.STORIES')"
                background-color="rgb(255, 255, 255, 0.5)"
                outlined
                type="number"
            /></v-col>
            <v-col cols="2">
              <v-text-field
                v-model="series"
                :label="$t('HERO.SERIES')"
                background-color="rgb(255, 255, 255, 0.5)"
                outlined
                type="number"
            /></v-col>
            <v-col cols="2">
              <v-text-field
                v-model="events"
                :label="$t('HERO.EVENTS')"
                background-color="rgb(255, 255, 255, 0.5)"
                outlined
                type="number"
            /></v-col>
          </v-row>
          <v-textarea
            v-model="description"
            :label="$t('HERO.DESCRIPTION')"
            background-color="rgb(255, 255, 255, 0.5)"
            counter="600"
            outlined
            rows="6"
          />
          <v-row class="my-4" no-gutters>
            <v-btn color="#ff554fee" dark @click="dialog = true">{{
              $t('VIEWS.INFORMATIONS.REMOVE')
            }}</v-btn
            ><v-btn
              class="mx-5"
              color="#ff554fee"
              dark
              @click="synchronizeInformations(true)"
              >{{ $t('VIEWS.INFORMATIONS.RESET') }}</v-btn
            >
            <v-btn class="ml-auto" color="#ff554fee" dark @click="updateHero">{{
              $t('VIEWS.INFORMATIONS.SAVE')
            }}</v-btn>
          </v-row>
        </v-form>
      </v-col>
    </div>
    <v-dialog v-model="dialog" persistent width="auto">
      <v-card>
        <v-card-title>
          {{ $t('NOTIFICATION.CONFIRMATION') }}
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialog = false">
            {{ $t('NOTIFICATION.NO') }}
          </v-btn>
          <v-btn color="#ff554fee" text @click="removeHero">
            {{ $t('NOTIFICATION.YES') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { fetchHeroByIdAPI } from '../api/marvel.js';
import Hero from '../classes/hero';
import Header from '../components/Header.vue';
import List from '../views/List.vue';

export default {
  name: 'Informations',
  components: { Header, List },

  props: {
    id: {
      require,
    },
  },

  data: () => ({
    dialog: false,
    hero: null,
    name: '',
    description: '',
    comics: 0,
    stories: 0,
    series: 0,
    events: 0,
    favorite: false,
    image: require('../assets/test.jpeg'),
  }),

  computed: {
    ...mapState(['load']),
    ...mapGetters(['getHeroById']),
  },

  async created() {
    if (this.getHeroById(this.id) == null) {
      let result = [];
      await fetchHeroByIdAPI(this.id).then((value) =>
        value != null ? (result = value) : this.$router.push('/List')
      );
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
    } else this.hero = this.getHeroById(this.id);
    this.synchronizeInformations(true);
  },

  methods: {
    /**
     * @method to create the file for the new image.
     * @param {file} file The file dropped
     */
    createImageFile(file) {
      if (!file.type.match('image.*')) {
        alert('Select an image');
        return;
      }
      const reader = new FileReader();
      const vm = this;
      reader.onload = function (e) {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    /**
     * @method to retrieve the file dropped.
     * @param {object} dataTransfer The event associated
     */
    onDropImage({ dataTransfer }) {
      this.createImageFile(dataTransfer.files[0]);
    },

    /**
     * @method to retrieve the file selected.
     * @param {object} target The event associated
     */
    onSelectImage({ target }) {
      this.createImageFile(target.files[0]);
    },

    /** @method to remove the hero in the database. */
    removeHero() {
      this.dialog = false;
      const id = this.id;
      if (!this.load)
        this.showAlert(this.$t('NOTIFICATION.ERROR.LOADING'), false);
      else
        try {
          this.$store.commit('REMOVE_HERO', { id });
          this.showAlert(this.$t('NOTIFICATION.SUCCESS.DELETION'), true);
          window.history.length >= 2
            ? this.$router.go(-1)
            : this.$router.push('/List');
        } catch (error) {
          this.showAlert(this.$t('NOTIFICATION.ERROR.DELETION') + error, false);
        }
    },

    /**
     * @method to show an alert during 4s.
     * @param {string} text The alert's text
     * @param {string} success The alert's type (true = success/ false = error)
     */
    showAlert(text, success) {
      this.$store.commit('SET_NOTIFICATION', {
        display: true,
        success: success,
        text: text,
      });
      setTimeout(() => {
        this.$store.commit('SET_NOTIFICATION', {
          display: false,
          success: true,
          text: '',
        });
      }, 5000);
    },

    /**
     * @method to synchronize the heroe's informations (get informations from the database or push informations to the database).
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
          'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' &&
        this.hero.image !=
          'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif'
      )
        this.image = this.hero.image;
    },

    /** @method to save the modifications in the database. */
    updateHero() {
      if (!this.load)
        this.showAlert(this.$t('NOTIFICATION.ERROR.LOADING'), false);
      else if (this.name.split() == '')
        this.showAlert(this.$t('NOTIFICATION.ERROR.NAME'), false);
      else if (this.$refs.form.validate()) {
        this.hero = this.getHeroById(this.id);
        try {
          this.synchronizeInformations(false);
          this.showAlert(this.$t('NOTIFICATION.SUCCESS.MODIFICATION'), true);
          window.history.length >= 2
            ? this.$router.go(-1)
            : this.$router.push('/List');
        } catch (error) {
          this.showAlert(
            this.$t('NOTIFICATION.ERROR.MODIFICATION') + error,
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
