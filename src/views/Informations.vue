<template>
  <div class="page">
    <Header :btn="true" />
    <h1 class="title2">INFORMATIONS.</h1>
    <div class="informations">
      <div class="informations__containerImg">
        <img
          class="informations__containerImg__img"
          :src="require('../assets/test.jpeg')"
        />
      </div>
      <v-col>
        <h3>Id : 124483</h3>
        <v-form ref="form">
          <v-row justify="space-between" align="center">
            <v-col cols="5"
              ><v-text-field
                class="informations__name"
                v-model="name"
                :rules="nameRules"
                counter="30"
                label="Name"
              ></v-text-field
            ></v-col>
            <v-col cols="2">
              <v-btn fab text color="red" @click="toggleFavorie"
                ><v-icon color="red" x-large>{{
                  this.favorie ? "mdi-heart" : "mdi-heart-outline"
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
                label="Comics"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                outlined
                background-color="rgb(255, 255, 255, 0.5)"
                type="number"
                v-model="stories"
                label="Stories"
              ></v-text-field
            ></v-col>
            <v-col cols="2">
              <v-text-field
                outlined
                background-color="rgb(255, 255, 255, 0.5)"
                type="number"
                v-model="series"
                label="Series"
              ></v-text-field
            ></v-col>
            <v-col cols="2">
              <v-text-field
                background-color="rgb(255, 255, 255, 0.5)"
                outlined
                type="number"
                v-model="events"
                label="Events"
              ></v-text-field
            ></v-col>
          </v-row>
          <v-col cols="auto" class="informations__description">
            <v-textarea
              outlined
              background-color="rgb(255, 255, 255, 0.5)"
              v-model="description"
              label="Description"
              counter="600"
              rows="6"
            ></v-textarea>
          </v-col>
          <v-row class="informations__btns">
            <div><v-btn>Supprimer</v-btn><v-btn>Reinitialiser</v-btn></div>
            <v-btn @click="submitForm">Enregistrer</v-btn></v-row
          >
        </v-form>
      </v-col>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  components: { Header },
  name: "Informations",
  data: () => ({
    description: "",
    name: "",
    comics: 0,
    stories: 0,
    series: 0,
    events: 0,
    favorie: false,
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 30) || "Name must be less than 30 characters",
    ],
  }),
  methods: {
    submitForm() {
      this.$refs.form.validate();
    },
    toggleFavorie() {
      this.favorie = !this.favorie;
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
      box-shadow: 0px 0px 10px 5px #e5e5e5;
      background: white;
      padding: 30px;
      height: auto;
      max-height: 500px;
      max-width: 500px;
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
    margin: 0px 20px -10px 10px;
  }

  &__description {
    margin: 0px 10px 20px 20px;
  }

  &__btns {
    justify-content: space-between;
    align-items: flex-end;
    margin: 0px 15px 0px 25px;
  }
}
</style>
