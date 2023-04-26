export default {
  path: 'evaluation',
  name: 'evaluation',
  meta: {
    locale: 'menu.evaluation',
    requiresAuth: true,
    icon: 'icon-dashboard',
    roles: ['*'],
  },
  children: [
    {
      path: 'evaluationPlan',
      name: 'evaluationPlan',
      component: () =>
        import('@/views/evaluation/evaluation-plan/index.vue'),
      meta: {
        locale: 'menu.evaluation.evaluationPlan',
        requiresAuth: true,
        icon: 'icon-dashboard',
        roles: ['*'],
      },
    },
    {
      path: 'evaluationProject',
      name: 'evaluationProject',
      component: () =>
        import('@/views/evaluation/evaluation-plan/index.vue'),
      meta: {
        locale: 'menu.evaluation.evaluationProject',
        requiresAuth: true,
        icon: 'icon-dashboard',
        roles: ['*'],
      },
    },
    {
      path: 'evaluationPlanDetails',
      name: 'evaluationPlanDetails',
      component: () =>
        import(
          '@/views/evaluation/evaluation-plan/evaluation-plan-details.vue'
        ),
      meta: {
        locale: 'menu.evaluation.evaluationPlanCreation',
        requiresAuth: true,
        icon: 'icon-dashboard',
        roles: ['*'],
        hideInMenu: true,
      },
    },
  ],
};
