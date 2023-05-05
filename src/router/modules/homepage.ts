export default {
  path: 'homepage',
  name: 'homepage',
  component: () => import('@/views/homepage/index.vue'),
  meta: {
    locale: 'menu.homepage',
    requiresAuth: true,
    icon: 'icon-dashboard',
    roles: ['*'],
    hideInMenu: true,
  },
  children: [
    {
      path: 'homepage',
      name: 'homepage',
      component: () => import('@/views/homepage/index.vue'),
      meta: {
        locale: 'menu.homepage',
        requiresAuth: true,
        icon: 'icon-dashboard',
        roles: ['*'],
        hidden: true,
        hideInMenu: true,
      },
    },
  ],
};
