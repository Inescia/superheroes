<template>
  <div class="page">
    <Header :btn="false" />
    <h1 class="title1">SUPERHEROES.</h1>

    <div class="bar">
      <v-col cols="1"></v-col
      ><v-col cols="7"
        ><v-text-field
          hide-details="false"
          prepend-icon="mdi-magnify"
          append-icon="mdi-close"
          label="Rechercher"
        ></v-text-field></v-col
      ><v-btn to="/New">Nouveau Superhéro</v-btn>
    </div>
    <div class="bar">
      <v-col class="switch" cols="3">
        <p class="text">Affichage :</p>
        <p class="textSwitch">Liste</p>
        <v-switch v-model="display" label="Cartes"></v-switch>
      </v-col>
      <v-col class="switch" cols="3">
        <p class="text">Tri :</p>
        <p class="textSwitch">ID</p>
        <v-switch v-model="sort" label="Nom"></v-switch>
      </v-col>
      <v-col cols="2"></v-col>
      <v-col cols="4"
        ><v-slider
          label="5 héros/pages"
          hide-details
          max="100"
          min="5"
          persistent-hint
          track-color="grey"
        ></v-slider
      ></v-col>
    </div>
    <v-data-table
      v-if="!display"
      class="table"
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      :hide-default-footer="true"
    >
    </v-data-table>
    <div v-else class="list">
      <Card
        v-for="heroe in heroes(number, number * (page - 1))"
        :key="heroe.id"
        :heroe="heroe"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "../components/Header.vue";
import Card from "../components/Card.vue";

export default {
  components: { Header, Card },
  name: "List",
  data() {
    return {
      display: true,
      sort: false,
      number: 20,
      page: 1,
      headers: [
        { text: "ID", value: "name", width: "20%" },
        { text: "Nom", value: "calories", width: "30%" },
        { text: "Comics", value: "carbs", align: "center", width: "12.5%" },
        { text: "Stories", value: "protein", align: "center", width: "12.5%" },
        { text: "Series", value: "iron", align: "center", width: "12.5%" },
        { text: "Events", value: "fat", align: "center", width: "12.5%" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
      ],
    };
  },

  computed: mapGetters(["heroes"]),
  methods: {
    toggleDisplay() {
      this.display = !this.display;
    },
    toggleSort() {
      this.sort = !this.sort;
    },
  },
};
</script>

<style lang="scss">
.table {
  margin: 0px 30px;
  opacity: 0.8;
}

.bar {
  display: flex;
  align-items: center;
  margin: -10px 20px;
  justify-content: space-around;
}

.text {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  padding-top: 22px;
  padding-right: 8px;
}
.textSwitch {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
  padding-top: 20px;
  padding-right: 8px;
}

.switch {
  display: flex;
  align-items: flex-start;
}

.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
