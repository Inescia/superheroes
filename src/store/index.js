import Vue from 'vue';
import Vuex from 'vuex';
import { fetchHeroesAPI } from '../api/Marvel.js';
import Hero from '../classes/Hero.js';

Vue.use(Vuex);

const state = {
  heroes: [],
  load: false,
  modal: false,
  notification: { display: false, success: true, text: '' },
};

const mutations = {
  addHero(state, { hero }) {
    state.heroes = [hero].concat(state.heroes);
  },

  changeNotification(state, { display, success, text }) {
    state.notification = { display, success, text };
  },

  removeHero(state, { id }) {
    state.heroes = state.heroes.filter((h) => h.id != id);
  },

  retrieveHeroes(state, { heroes }) {
    state.heroes.length == 0
      ? (state.heroes = heroes)
      : (state.heroes = state.heroes.concat(heroes));
  },

  setModal(state, { modal }) {
    state.modal = modal;
  },
};

const actions = {
  async fetchHeroes({ commit }) {
    let request = 0;
    let isFinished = true;
    do {
      let result;
      // Get heroes 100 by 100
      await fetchHeroesAPI(request).then(function (data) {
        result = data;
      });
      result.length == 0 ? (isFinished = true) : (isFinished = false);
      commit('retrieveHeroes', {
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
  heroes: (state) => (number, offset, byName) => {
    let h = state.heroes;
    byName
      ? h.sort((a, b) => a.name.localeCompare(b.name))
      : h.sort((a, b) => a.id - b.id);
    return h.slice(offset, number + offset);
  },

  heroById: (state) => (id) => {
    return state.heroes.find((h) => h.id == id);
  },

  heroesByText: (state) => (text) => {
    let h = [];
    state.heroes.forEach((hero) => {
      if (
        hero.name.includes(text) ||
        hero.id.toString().includes(text) ||
        hero.description.includes(text)
      )
        h.push(hero);
    });
    return h;
  },

  heroesFavorites: (state) => {
    let h = [];
    state.heroes.forEach((hero) => {
      if (hero.favorite) h.push(hero);
    });
    return h;
  },

  load: (state) => {
    return state.load;
  },

  modal: (state) => {
    return state.modal;
  },

  newId() {
    let id = 0;
    state.heroes.forEach((h) => {
      if (h.id > id) id = h.id;
    });
    return id++;
  },

  notification: (state) => {
    return state.notification;
  },

  numberHeroes: (state) => {
    return state.heroes.length;
  },
};

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});

export default store;
