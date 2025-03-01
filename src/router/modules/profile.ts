export default {
  path: 'profile',
  name: 'profile',
  component: () => import('@/views/profile/index.vue'),
  meta: {
    locale: 'menu.profile',
    requiresAuth: true,
    icon: 'icon-file',
    hideInMenu: true,
  },
  children: [
    {
      path: 'basic',
      name: 'basic',
      component: () => import('@/views/profile/basic/index.vue'),
      meta: {
        locale: 'menu.profile.basic',
        requiresAuth: true,
        roles: ['admin'],
        hideInMenu: true,
      },
    },
  ],
};
