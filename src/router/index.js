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
  },
  {
    path: '/List',
    name: 'List',
    component: List,
  },
  {
    path: '/Informations/:id',
    name: 'Informations',
    props: true,
    component: Informations,
  },
  {
    path: '/New',
    name: 'New',
    component: New,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
