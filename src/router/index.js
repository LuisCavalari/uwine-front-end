import Vue from 'vue';
import store from "../store";
import Router from 'vue-router';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import Dashboard from "@/pages/Dashboard";
Vue.use(Router);

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path:'/signup',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component : Dashboard,
      meta: {
        requiredAuth :true,
      }
    }
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${to.name} | UWine `
  if(to.matched.some(record => record.meta.requiredAuth)) {
    if (!store.getters.isAuthenticated) {
      next({ 
        path: '/', 
      }) 
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router