import Vue from "vue";
import Vuex from "vuex";
import { fetchHeroesAPI, searchHeroe } from "../api/marvel.js";
import Heroe from "../classes/Heroe.js";

Vue.use(Vuex);

const state = {
  heroes: [],
};

const mutations = {
  receiveHeroes(state, { heroes }) {
    state.heroes.length == 0
      ? (state.heroes = heroes)
      : (state.heroes = state.heroes.concat(heroes));
  },
  //direct ou dans actions d'abord ?
  addHeroe(state, heroe) {
    state.heroes.push(heroe);
  },
  removeHeroe(state, heroe) {
    state.heroes.splice(state.heroes.indexOf(heroe), 1);
  },
};

const actions = {
  async fetchHeroes({ commit }) {
    var request = 0,
      isFinished = true;

    do {
      var result;
      //Recupération des héros 100 par 100
      await fetchHeroesAPI(request).then(function (data) {
        result = data;
      });
      result.length == 0 ? (isFinished = true) : (isFinished = false);
      commit("receiveHeroes", {
        heroes: result.map((data) => {
          return new Heroe(
            data.id,
            data.name,
            data.description,
            data.comics.available,
            data.stories.available,
            data.series.available,
            data.events.available,
            `${data.thumbnail.path}.${data.thumbnail.extension}`
          );
        }),
      });

      request++;
    } while (!isFinished);
    console.log("Chargement des héros terminé");
  },
};

const getters = {
  //Retourne tous les héros
  heroes: (state) => (number, offset) => {
    return state.heroes.slice(offset, number + offset);
  },

  //Retourne tous les héros qui ont "text" dans leur nom
  heroeByName: (state) => (name) => {
    var h = [];
    state.heroes.forEach((heroe) => {
      if (heroe.name.includes(name)) h.push(heroe);
    });
    return h;
  },

  heroeById: (state) => (id) => {
    return state.heroes.find((h) => h.id == id);
  },

  newId() {
    var id = 0;
    state.heroes.forEach((h) => {
      if (h.id > id) id = h.id;
    });
    return id++;
  },
};

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});

export default store;
