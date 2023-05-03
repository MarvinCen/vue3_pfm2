export default {
  path: 'results',
  name: 'results',
  meta: {
    locale: 'menu.results',
    requiresAuth: true,
    icon: 'icon-dashboard',
    roles: ['*'],
  },
  children: [
    {
      path: 'inputResult',
      name: 'inputResult',
      component: () => import('@/views/results/input/index.vue'),
      meta: {
        locale: 'menu.results.inputResult',
        requiresAuth: true,
        icon: 'icon-dashboard',
        roles: ['*'],
      },
    },
    {
      path: 'auditResult',
      name: 'auditResult',
      component: () => import('@/views/results/audit/index.vue'),
      meta: {
        locale: 'menu.results.auditResult',
        requiresAuth: true,
        icon: 'icon-dashboard',
        roles: ['*'],
      },
    },
    {
      path: 'myResult',
      name: 'myResult',
      component: () => import('@/views/results/my/index.vue'),
      meta: {
        locale: 'menu.results.myResult',
        requiresAuth: true,
        icon: 'icon-dashboard',
        roles: ['*'],
      },
    },
    {
      path: 'resultType',
      name: 'resultType',
      component: () => import('@/views/results/result-type/index.vue'),
      meta: {
        locale: 'menu.results.resultType',
        requiresAuth: true,
        icon: 'icon-dashboard',
        roles: ['*'],
      },
    },
    {
      path: 'resultTypeCreation',
      name: 'resultTypeCreation',
      component: () =>
        import(
          '@/views/results/result-type/component/result-type-creation.vue'
        ),
      meta: {
        locale: 'menu.results.resultTypeCreation',
        requiresAuth: true,
        icon: 'icon-dashboard',
        roles: ['*'],
        hideInMenu: true,
      },
    },
    {
      path: 'resultTableDataEdit',
      name: 'resultTableDataEdit',
      component: () =>
        import('@/views/results/component/result-data-edit.vue'),
      meta: {
        locale: 'menu.results.resultTypeCreation',
        requiresAuth: true,
        icon: 'icon-dashboard',
        roles: ['*'],
        hideInMenu: true,
      },
    },
  ],
};
