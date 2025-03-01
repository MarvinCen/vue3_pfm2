export default {
  path: 'exception',
  name: 'exception',
  component: () => import('@/views/exception/index.vue'),
  meta: {
    locale: 'menu.exception',
    requiresAuth: true,
    icon: 'icon-exclamation-circle',
    hideInMenu: true,
  },
  children: [
    {
      path: '403',
      name: '403',
      component: () => import('@/views/exception/403/index.vue'),
      meta: {
        locale: 'menu.exception.403',
        requiresAuth: true,
        roles: ['admin'],
        hideInMenu: true,
      },
    },
    {
      path: '404',
      name: '404',
      component: () => import('@/views/exception/404/index.vue'),
      meta: {
        locale: 'menu.exception.404',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: true,
      },
    },
    {
      path: '500',
      name: '500',
      component: () => import('@/views/exception/500/index.vue'),
      meta: {
        locale: 'menu.exception.500',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: true,
      },
    },
  ],
};
