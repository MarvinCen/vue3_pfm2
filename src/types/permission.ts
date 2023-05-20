import {BaseEntity} from "@/types/global";

export interface User extends BaseEntity {
	username: string;
	password: string;
	wechatId: string;
	qqId: string;
	email: string;
	phone: string;
	roles: [];
	permissions: string[];
	organizationId: number;
}

export interface Role extends BaseEntity {
	organizationId: number;
	status: '启用' | '禁用';
}

export interface Permission extends BaseEntity {
	menuId: number;
	menuName: string;
	urls: string[];
	dataRuleGroupId: number;
	dataRuleGroup: DataRuleGroup;
}

export interface Menu extends BaseEntity {
	organizationId?: number;
	parentId?: number;
	route?: string;
	icon?: string;
	type?: '菜单' | '按钮';
	routeParams?: any;
	componentPath?: string;
	order?: number;
	outLink?: boolean;
	hidden?: boolean;
	keepAlive?: boolean;
	status?: '启用' | '禁用';
}

export interface DataRule {
	eid?: number;
	name?: string;
	fields?: string;
	condition?: string;
	value?: string;
	dataRuleGroupId?: number;
}

export interface DataRuleGroup {
	eid?: number;
	name?: string;
	status?: string;
	organizationId?: number;
}