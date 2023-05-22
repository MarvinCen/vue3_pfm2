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
      component: () => import('@/views/evaluation/evaluation-plan/index.vue'),
      meta: {
        locale: 'menu.evaluation.evaluationPlan',
        requiresAuth: true,
        icon: 'icon-dashboard',
        roles: ['*'],
      },
    },
    {
      path: 'evaluationPlanCreation',
      name: 'evaluationPlanCreation',
      component: () =>
        import(
          '@/views/evaluation/evaluation-plan/evaluation-plan-creation.vue'
        ),
      meta: {
        locale: 'menu.evaluation.evaluationPlanCreation',
        requiresAuth: true,
        icon: 'icon-dashboard',
        roles: ['*'],
        hideInMenu: true,
      },
    },
    {
      path: 'evaluationProject',
      name: 'evaluationProject',
      component: () =>
        import('@/views/evaluation/evaluation-project/index.vue'),
      meta: {
        locale: 'menu.evaluation.evaluationProject',
        requiresAuth: true,
        icon: 'icon-dashboard',
        roles: ['*'],
      },
    },
    {
      path: 'evaluationProjectDetail',
      name: 'evaluationProjectDetail',
      component: () =>
        import('@/views/evaluation/evaluation-project/project-detail.vue'),
      meta: {
        locale: 'menu.evaluation.evaluationProjectCreation',
        requiresAuth: true,
        icon: 'icon-dashboard',
        roles: ['*'],
        hideInMenu: true,
      },
    },
    {
      path: 'evaluationPlanEdit',
      name: 'evaluationPlanEdit',
      component: () =>
        import('@/views/evaluation/evaluation-plan/evaluation-plan-edit.vue'),
      meta: {
        locale: 'menu.evaluation.evaluationPlanEdit',
        requiresAuth: true,
        icon: 'icon-dashboard',
        roles: ['*'],
        hideInMenu: true,
      },
    },
    {
      path: 'pfmCalculation',
      name: 'pfmCalculation',
      component: () =>
        import('@/views/evaluation/evaluation-project/plan-of-project.vue'),
      meta: {
        locale: 'menu.evaluation.evaluationPlanEdit',
        requiresAuth: true,
        icon: 'icon-dashboard',
        roles: ['*'],
        hideInMenu: true,
      },
    },
    {
      path: 'resultDistribution',
      name: 'resultDistribution',
      component: () =>
        import('@/views/evaluation/results/distribution.vue'),
      meta: {
        locale: 'menu.evaluation.resultDistribution',
        requiresAuth: true,
        icon: 'icon-dashboard',
        roles: ['*'],
      },
    },
  ],
};
