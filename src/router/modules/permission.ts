export default {
	path: 'permission',
	name: 'permission',
	meta: {
		locale: 'menu.permission',
		requiresAuth: true,
		icon: 'icon-dashboard',
		roles: ['*'],
	},
	children: [
		{
			path: 'menu',
			name: 'menu',
			component: () => import('@/views/permission/menu/index.vue'),
			meta: {
				locale: 'menu.permission.menu',
				requiresAuth: true,
				icon: 'icon-dashboard',
				roles: ['*'],
			},
		},
		{
			path: 'User',
			name: 'User',
			component: () => import('@/views/permission/user/index.vue'),
			meta: {
				locale: 'menu.permission.user',
				requiresAuth: true,
				icon: 'icon-dashboard',
				roles: ['*'],
			},
		},
		{
			path: 'role',
			name: 'role',
			component: () => import('@/views/permission/role/index.vue'),
			meta: {
				locale: 'menu.permission.role',
				requiresAuth: true,
				icon: 'icon-dashboard',
				roles: ['*'],
			},
		},
		{
			path: 'myPermission',
			name: 'myPermission',
			component: () => import('@/views/permission/permission/index.vue'),
			meta: {
				locale: 'menu.permission.permission',
				requiresAuth: true,
				icon: 'icon-dashboard',
				roles: ['*'],
			},
		},
	]
}