import Vue from 'vue';
import Vuex from 'vuex';
import { fetchHeroesAPI } from '../api/marvel.js';
import Hero from '../classes/hero.js';

Vue.use(Vuex);

const state = {
  heroes: [],
  load: false,
  notification: { display: false, success: true, text: '' },
};

const mutations = {
  ADD_HERO(state, { hero }) {
    state.heroes = [hero].concat(state.heroes);
  },

  SET_NOTIFICATION(state, { display, success, text }) {
    state.notification = { display, success, text };
  },

  REMOVE_HERO(state, { id }) {
    state.heroes = state.heroes.filter((h) => h.id != id);
  },

  RETRIEVE_HEROES(state, { heroes }) {
    state.heroes = state.heroes.concat(heroes);
  },
};

const actions = {
  async fetchHeroes({ commit }) {
    let request = 0;
    let isFinished = false;
    do {
      let result;
      // Get heroes 100 by 100
      await fetchHeroesAPI(request).then(function (data) {
        result = data;
      });
      if (result.length == 0) isFinished = true;
      commit('RETRIEVE_HEROES', {
        heroes: result.map((data) => {
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
        }),
      });
      request++;
    } while (!isFinished);
    console.log('Chargement des héros terminé');
    state.load = true;
  },
};

const getters = {
  getPaginatedHeroes: (state) => (number, offset, byName, crescent) => {
    let h = state.heroes;
    byName
      ? h.sort((a, b) => a.name.localeCompare(b.name))
      : h.sort((a, b) => a.id - b.id);
    if (!crescent) h.reverse();
    return h.slice(offset, number + offset);
  },

  getHeroById: (state) => (id) => {
    return state.heroes.find((h) => h.id == id);
  },

  getFilteredHeroes: (state) => (text, byName, crescent) => {
    let h = state.heroes.filter(
      (hero) =>
        hero.name.toLowerCase().includes(text.toLowerCase()) ||
        hero.id.toString().includes(text) ||
        hero.description.toLowerCase().includes(text.toLowerCase())
    );
    byName
      ? h.sort((a, b) => a.name.localeCompare(b.name))
      : h.sort((a, b) => a.id - b.id);
    if (!crescent) h.reverse();
    return h;
  },

  favoriteHeroes: (state) => {
    return state.heroes.filter((hero) => hero.favorite);
  },

  newId() {
    let id = 0;
    state.heroes.forEach((h) => {
      if (h.id > id) id = h.id;
    });
    id++;
    return id;
  },
};

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});

export default store;
