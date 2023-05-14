export default {
  path: 'organization',
  name: 'organization',
  meta: {
    locale: 'menu.organization',
    requiresAuth: true,
    icon: 'icon-dashboard',
    roles: ['*'],
  },
  children: [
    {
      path: 'department',
      name: 'department',
      component: () => import('@/views/organization/department.vue'),
      meta: {
        locale: 'menu.organization.department',
        requiresAuth: true,
        icon: 'icon-dashboard',
        roles: ['*'],
      },
    },
    {
      path: 'employee',
      name: 'employee',
      component: () => import('@/views/organization/employee.vue'),
      meta: {
        locale: 'menu.organization.employee',
        requiresAuth: true,
        icon: 'icon-dashboard',
        roles: ['*'],
      },
    },
    {
      path: 'position',
      name: 'position',
      component: () => import('@/views/basic-data/position/index.vue'),
      meta: {
        locale: 'menu.organization.position',
        requiresAuth: true,
        icon: 'icon-dashboard',
        roles: ['*'],
      },
    },
  ],
};
