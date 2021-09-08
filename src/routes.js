// default
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// Handle navigation duplication for router push (Globally)
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((error) => {
  });
};

// Pages
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

// Routering
const router = new Router({
    //mode: 'history',
    routes: [
        //home
        {
            path: '/',
            name: 'home',
            component: Home
        },
        //register
        {
            path: '/registration',
            name: 'register',
            component: Register
        },
        //login
        {
            path: '/login',
            name: 'login',
            component: Login
        },
    ]
});

// redirect to login page if not logged in and trying to access a restricted page
router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/registration'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('tevian-token');
    if (authRequired && !loggedIn) {
      return next('/login');
    }
    next();
});

export default router