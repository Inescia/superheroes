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
      <v-col class="switch" cols="2">
        <p class="text">Affichage :</p>
        <p class="textSwitch">Liste</p>
        <v-switch v-model="affichage" label="Cartes"></v-switch>
      </v-col>
      <v-col class="switch" cols="2">
        <p class="text">Tri :</p>
        <p class="textSwitch">ID</p>
        <v-switch v-model="tri" label="Nom"></v-switch>
      </v-col>
      <v-col cols="3"></v-col>
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
    <div class="list">
      <v-data-table
        class="table"
        :headers="headers"
        :items="desserts"
        :items-per-page="5"
        :hide-default-footer="true"
      >
      </v-data-table>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  components: { Header },
  name: "List",
  data() {
    return {
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
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
        },
      ],
    };
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
</style>
