import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import List from '../views/List.vue';
import Informations from '../views/Informations.vue';
import New from '../views/New.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: 'Favoris - Superheroes',
    },
  },
  {
    path: '/List',
    name: 'List',
    component: List,
    meta: {
      title: 'Liste - Superheroes',
    },
  },
  {
    path: '/Informations/:id',
    name: 'Informations',
    props: true,
    component: Informations,
    meta: {
      title: 'Informations - Superheroes',
    },
  },
  {
    path: '/New',
    name: 'New',
    component: New,
    meta: {
      title: 'Nouveau - Superheroes',
    },
  },
];

const router = new VueRouter({
  routes,
});

router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || 'Superheroes';
  });
});

export default router;
