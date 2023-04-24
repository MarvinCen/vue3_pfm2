export default {
  path: 'basicData',
  name: 'basicData',
  meta: {
    locale: 'menu.basicData',
    requiresAuth: true,
    icon: 'icon-dashboard',
    roles: ['*'],
  },
  children: [
    {
      path: 'department',
      name: 'department',
      component: () => import('@/views/basic-data/organization/department.vue'),
      meta: {
        locale: 'menu.basicData.department',
        requiresAuth: true,
        icon: 'icon-dashboard',
        roles: ['*'],
      },
    },
    {
      path: 'employee',
      name: 'employee',
      component: () => import('@/views/basic-data/organization/employee.vue'),
      meta: {
        locale: 'menu.basicData.employee',
        requiresAuth: true,
        icon: 'icon-dashboard',
        roles: ['*'],
      },
    },
  ],
};
