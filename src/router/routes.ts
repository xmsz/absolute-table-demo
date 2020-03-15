const commonRoutes = [
  {
    name: 'Home',
    path: '/',
    meta: {
      mounted_once: true,
    },
    component: () => import(/* webpackChunkName: "home" */ '../view/home/index'),
  },
  {
    path: '/auth',
    name: 'Auth',
    meta: {
      noNeedAuth: true,
    },
    component: () => import(/* webpackChunkName: "auth" */ '../view/auth/index'),
  },
  {
    path: '/auth/clear',
    name: 'AuthClear',
    meta: {
      noNeedAuth: true,
    },
    component: () => import(/* webpackChunkName: "auth" */ '../view/auth/clear'),
  },
  {
    path: '/*',
    redirect: {
      name: 'Home',
    },
  },
];

export default [...commonRoutes];
