import {BaseEntity} from "@/types/global";

export interface Rule extends BaseEntity {
	category?: string;
	organizationId?: number;
	organizationName?: string;
	script?: string;
	version?: string;
}

export interface RuleVersion {
	ruleId?: number;
	value?: string;
	script?: string;
	activated?: boolean;
}