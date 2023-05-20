export default {
	path: 'rule',
	name: 'rule',
	meta: {
		locale: 'menu.rule',
		requiresAuth: true,
		icon: 'icon-dashboard',
		roles: ['*'],
	},
	children: [
		{
			path: 'ruleManagement',
			name: 'ruleManagement',
			component: () => import('@/views/rule/index.vue'),
			meta: {
				locale: 'menu.ruleManagement',
				requiresAuth: true,
				icon: 'icon-dashboard',
				roles: ['*'],
			},
		}
	]
}