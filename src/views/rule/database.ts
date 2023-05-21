import {Rule, RuleVersion} from "@/types/rule";
import Mock from "mockjs";
import orgData from "@/views/organization/database"

const rules: Rule[] = [
	{
		eid: Mock.Random.increment(),
		name: '时间抓取',
		remark: '抓取录入时间在考核项目开始时间与结束时间之间的成果数据',
		organizationId: -1,
		organizationName: '公共',
		category: '成果数据抓取',
		version: '2.0'
	},
	{
		eid: Mock.Random.increment(),
		name: '限3项',
		remark: '限3项',
		organizationId: -1,
		organizationName: '公共',
		category: '考核指标脚本',
		version: '1.0'
	},
	{
		eid: Mock.Random.increment(),
		name: '绩效计算',
		remark: '',
		organizationId: orgData.organizationId,
		organizationName: '公共',
		category: '绩效计算',
		version: '1.0'
	},
]

const ruleVersions: RuleVersion[] = [
	{
		ruleId: rules[0].eid,
		value: '1.0',
		script: '',
		activated: false,
	},
	{
		ruleId: rules[0].eid,
		value: '1.4',
		script: '',
		activated: false,
	},
	{
		ruleId: rules[0].eid,
		value: '2.0',
		script: '',
		activated: true,
	},
	{
		ruleId: rules[1].eid,
		value: '1.0',
		script: '',
		activated: true,
	},
	{
		ruleId: rules[2].eid,
		value: '1.0',
		script: '',
		activated: true,
	}
]

export default {
	rules,
	ruleVersions,
}