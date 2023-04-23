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
      path: 'resultTableCreation',
      name: 'resultTableCreation',
      component: () =>
        import(
          '@/views/results/result-type/component/result-type-creation.vue'
        ),
      meta: {
        locale: '成果类型创建',
        requiresAuth: true,
        icon: 'icon-dashboard',
        roles: ['*'],
      },
    },
  ],
};
