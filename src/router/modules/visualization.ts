export default {
  path: 'visualization',
  name: 'visualization',
  component: () => import('@/views/visualization/index.vue'),
  meta: {
    locale: 'menu.visualization',
    requiresAuth: true,
    icon: 'icon-apps',
    hideInMenu: true,
  },
  children: [
    {
      path: 'data-analysis',
      name: 'dataAnalysis',
      component: () => import('@/views/visualization/data-analysis/index.vue'),
      meta: {
        locale: 'menu.visualization.dataAnalysis',
        requiresAuth: true,
        roles: ['admin'],
        hideInMenu: true,
      },
    },
    {
      path: 'multi-dimension-data-analysis',
      name: 'multiDimensionDataAnalysis',
      component: () =>
        import('@/views/visualization/multi-dimension-data-analysis/index.vue'),
      meta: {
        locale: 'menu.visualization.multiDimensionDataAnalysis',
        requiresAuth: true,
        roles: ['admin'],
        hideInMenu: true,
      },
    },
  ],
};
