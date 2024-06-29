import Vue from 'vue';
import Router from 'vue-router';
import DashBoard from '../components/DashBoard/DashBoard.vue';
import Login from '../components/Login/LoginPage.vue';
import NotFound from '../components/NotFound/NotFound.vue';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    name: 'index',
    path: '/admin',
    component: DashBoard
  },
  {
    name: 'notfound',
    path: '/:notFound(.*)',
    component: NotFound
  }
];

const router = new Router({
  mode: 'history',
  routes,
  linkActiveClass: 'active'
});

export default router;
