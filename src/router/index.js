import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import List from '../views/List.vue';
import Informations from '../views/Informations.vue';
import New from '../views/New.vue';
import i18n from '../i18n';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: i18n.t('SUPERHEROES', { page: i18n.t('PAGETITLES[0]') }),
      isClosable: false,
    },
  },
  {
    path: '/List',
    name: 'List',
    component: List,
    meta: {
      title: i18n.t('SUPERHEROES', { page: i18n.t('PAGETITLES[1]') }),
      isClosable: false,
    },
  },
  {
    path: '/Informations/:id',
    name: 'Informations',
    component: Informations,
    props: true,
    meta: {
      title: i18n.t('SUPERHEROES', { page: i18n.t('PAGETITLES[2]') }),
      isClosable: true,
    },
  },
  {
    path: '/New',
    name: 'New',
    component: New,
    meta: {
      title: i18n.t('SUPERHEROES', { page: i18n.t('PAGETITLES[3]') }),
      isClosable: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Superheroes';
  next();
});

router.afterEach((to, from) => {
  document.title = to.meta.title || 'Superheroes';
});

export default router;
