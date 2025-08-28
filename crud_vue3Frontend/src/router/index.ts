import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Login from '../loginpage/login.vue';
import Homepage from '../page/home/Homepage.vue';
import { useUserStore } from '../stores/userStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }, 
    },
    {
      path: '/Homepage',
      name: 'Homepage',
      component: Homepage,
      meta: { requiresAuth: true }, 
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore(); 

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
