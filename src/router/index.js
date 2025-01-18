import { createRouter, createWebHistory } from 'vue-router';
import BlogList from '../views/BlogList.vue';
import BlogForm from '../views/BlogForm.vue';
import BlogDetail from '../views/BlogDetail.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  {
    path: '/',
    name: 'BlogList',
    component: BlogList,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      if (!token) {
        next('/login'); // Redirect to login if not authenticated
      } else {
        next();
      }
    },
  },
  {
    path: '/blog/create',
    name: 'BlogCreate',
    component: BlogForm,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      if (!token) {
        next('/login'); // Redirect to login if not authenticated
      } else {
        next();
      }
    },
  },
  {
    path: '/blog/:id',
    name: 'BlogDetail',
    component: BlogDetail,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      if (!token) {
        next('/login'); // Redirect to login if not authenticated
      } else {
        next();
      }
    },
  },
  {
    path: '/blog/:id/edit',
    name: 'BlogEdit',
    component: BlogForm,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      if (!token) {
        next('/login'); // Redirect to login if not authenticated
      } else {
        next();
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
