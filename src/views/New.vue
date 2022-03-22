<template>
  <div class="new d-flex flex-column">
    <h1 style="text-align: right">{{ $t('VIEWS.NEW.TITLE') }}</h1>
    <input
      ref="file"
      style="display: none"
      type="file"
      @change="onSelectImage"
    />
    <div class="d-flex">
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
            <img v-on="on" :src="image" class="new__img pa-8" cover /> </v-col
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
            /></v-col>
            <v-col cols="1">
              <v-btn color="red" fab text @click="favorite = !favorite"
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
          <v-row class="my-4" no-gutters
            ><v-btn class="ml-auto" color="#ff554fee" dark @click="addHero">{{
              $t('VIEWS.NEW.SAVE')
            }}</v-btn></v-row
          >
        </v-form>
      </v-col>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Hero from '../classes/hero';
import Header from '../components/Header.vue';

export default {
  name: 'New',
  components: { Header },

  data: () => ({
    file: '',
    name: '',
    description: '',
    comics: 0,
    stories: 0,
    series: 0,
    events: 0,
    image: require('../assets/test.jpeg'),
    favorite: false,
  }),

  computed: {
    ...mapState(['load']),
    ...mapGetters({ id: 'newId' }),
  },

  methods: {
    /** @method to add the hero in the database. */
    addHero() {
      if (!this.load)
        this.showAlert(this.$t('NOTIFICATION.ERROR.LOADING'), false);
      else if (this.name.split() == '')
        this.showAlert(this.$t('NOTIFICATION.ERROR.NAME'), false);
      else if (this.$refs.form.validate()) {
        try {
          const hero = new Hero(
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
          this.$store.commit('ADD_HERO', { hero });
          this.$router.push('/List');
          this.showAlert(this.$t('NOTIFICATION.SUCCESS.CREATION'), true);
        } catch (error) {
          this.showAlert(
            this.$t('NOTIFICATION.ERROR.CREATION') + error.toString(),
            false
          );
        }
      }
    },

    /**
     * @method to create the file for the new image.
     * @param {file} file The i dropped
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
     * @param {event} e The event associated
     */
    onDropImage(e) {
      this.createImageFile(e.dataTransfer.files[0]);
    },

    /**
     * @method to retrieve the file selected.
     * @param {event} e The event associated
     */
    onSelectImage(e) {
      this.createImageFile(e.target.files[0]);
    },

    /**
     * @method to show an alert during 4s.
     * @param {string} text The alert's text
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
