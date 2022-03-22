import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import List from '../views/List.vue';
import Informations from '../views/Informations.vue';
import New from '../views/New.vue';
import i18n from '../i18n';
//import { setDocumentTitle } from '@/util/i18n/document';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: 'DASHBOARD',
      isClosable: false,
    },
  },
  {
    path: '/List',
    name: 'List',
    component: List,
    meta: {
      title: 'LIST',
      isClosable: false,
    },
  },
  {
    path: '/Informations/:id',
    name: 'Informations',
    component: Informations,
    props: true,
    meta: {
      title: 'INFORMATIONS',
      isClosable: true,
    },
  },
  {
    path: '/New',
    name: 'New',
    component: New,
    meta: {
      title: 'NEW',
      isClosable: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = i18n.t('VIEWS.' + to.meta.title + '.TITLE') || 'Superheroes';
  next();
});

export default router;
