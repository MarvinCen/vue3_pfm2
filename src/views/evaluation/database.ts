import Mock from "mockjs";
import orgData from "@/views/basic-data/organization/database"
import {EvaluationPlan, Indicator} from "@/types/evaluation";
import moment from "moment";

const plans: EvaluationPlan[] = Mock.mock({
	'list|6-8': [
		{
			'eid|+1': 20000,
			'organizationId': orgData.organizationId,
			'name|+1': 2018,
			'positions': '教师，' + '@pick(["实验员", "工程师", "研究员"])',
			'professionalTitles':
				'教授，' + '@pick(["高级工程师", "助理研究员", "讲师"])',
			'indicatorRoot': undefined,
			'customData': undefined,
			'remark': '@csentence',
		},
	],
}).list;
let date = moment(new Date());
plans.forEach((plan) => {
	date = date.add(1, "year")
	plan.createDatetime = date.format('YYYY-MM-DD HH:mm:ss')
	plan.updateDatetime = date.format('YYYY-MM-DD HH:mm:ss')
	plan.name += '年方案'
})

const indicators: Indicator[] = [];

export default {
  plans,
	indicators,
};