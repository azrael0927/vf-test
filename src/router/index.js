import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginPage from '../views/LoginPage.vue';
import DashBoard from '../views/DashBoard.vue';
import ProductPage from '../views/ProductPage.vue';
import OrderPage from '../views/OrderPage.vue';
import CouponPage from '../views/CouponPage.vue';
import UserBoard from '../views/UserBoard.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashBoard,
    children: [
      {
        path: 'products',
        component: ProductPage,
      },
      {
        path: 'coupons',
        component: CouponPage,
      },
      {
        path: 'orders',
        component: OrderPage,
      },
    ],
  },
  {
    path: '/userboard',
    name: 'UserBoard',
    component: UserBoard,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
