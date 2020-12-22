import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import Dashboard from '@/pages/Dashboard';
import NewWine from '@/pages/NewWine';
import EditWine from '@/pages/EditWine';
import NotFound from '@/pages/404';
import store from '../store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        loginLayout: true,
      },
    },
    {
      path: '/signup',
      name: 'Cadastro',
      component: SignUp,
      meta: {
        loginLayout: true,
      },
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiredAuth: true,
        dashboardLayout: true,
      },
    },
    {
      path: '/new-wine',
      name: 'Adicionar vinho',
      component: NewWine,
      meta: {
        requiredAuth: true,
        dashboardLayout: true,
      },
    },
    {
      path: '/edit-wine/:id',
      name: 'Editar vinho',
      component: EditWine,
      meta: {
        requiredAuth: true,
        dashboardLayout: true,
      },
    },
    {
      path: '*',
      name: 'Pagina não encontrada',
      component: NotFound,
    },

  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${to.name} | UWine `;
  if (to.matched.some(record => record.meta.requiredAuth)) {
    if (!store.getters.isAuthenticated) {
      next({
        path: '/',
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
