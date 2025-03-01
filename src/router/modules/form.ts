export default {
  path: 'form',
  name: 'form',
  component: () => import('@/views/form/index.vue'),
  meta: {
    locale: 'menu.form',
    icon: 'icon-settings',
    requiresAuth: true,
    hideInMenu: true,
  },
  children: [
    {
      path: 'step',
      name: 'step',
      component: () => import('@/views/form/step/index.vue'),
      meta: {
        locale: 'menu.form.step',
        requiresAuth: true,
        roles: ['admin'],
        hideInMenu: true,
      },
    },
    {
      path: 'group',
      name: 'group',
      component: () => import('@/views/form/group/index.vue'),
      meta: {
        locale: 'menu.form.group',
        requiresAuth: true,
        roles: ['admin'],
        hideInMenu: true,
      },
    },
  ],
};
