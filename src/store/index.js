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
    state.heroes = heroes;
  },
};

const actions = {
  async fetchHeroes({ commit }, name) {
    fetchHeroesAPI().then((value) => {
      var h = value.map((data) => {
        console.log("bonsoir");
        /*return new Heroe(
          data.id,
          data.name,
          data.description,
          data.comics.available,
          data.stories.available,
          data.series.available,
          data.events.available,
          `${data.thumbnail.path}.${data.thumbnail.extension}`
        );*/
      });
      commit("receiveHeroes", {
        heroes: h,
      });
    });
  },
};

const getters = {
  heroes: (state) => {
    return state.heroes.map((data) => {
      return {
        name: data.name,
        url: data.urls[1] ? data.urls[1].url : data.urls[0].url,
        image: `${data.thumbnail.path}.${data.thumbnail.extension}`,
        description:
          data.description === ""
            ? "No description listed for this character."
            : data.description,
      };
    });
  },
};

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});

export default store;
