import Mock from "mockjs";
import orgData from "@/views/basic-data/organization/database"
import {EvaluationPlan, EvaluationProject, Indicator} from "@/types/evaluation";
import moment from "moment";

const plans: EvaluationPlan[] = Mock.mock({
	'list|6': [
		{
			'eid|+1': 20000,
			'organizationId': orgData.organizationId,
			'name|+1': 2017,
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



const projects: EvaluationProject[] = Mock.mock({'list|6': [{}],}).list;
for (let i = 0, year = 2017,
			 date = moment(year + '-05-02 13:45:27');
		 i < projects.length; i++, year++, date = date.add(1, "year")) {
	const project = projects[i];
	project.eid = Mock.Random.increment();
	project.name = year + '年度考核';
	project.organizationId = orgData.organizationId;
	project.type = '年度考核';
	project.year = date.year();
	project.startTime = moment(year, "year").format('YYYY-MM-DD HH:mm:ss')
	project.endTime = moment(year + 1, "year").subtract(1, "seconds").format('YYYY-MM-DD HH:mm:ss')
	project.resultCheckedExpireTime = moment(year + 1, "year").subtract(2, "month").format('YYYY-MM-DD HH:mm:ss')
	project.pfmCheckedExpireTime = moment(year + 1, "year").subtract(1, "month").format('YYYY-MM-DD HH:mm:ss')
	project.createDatetime = date.format('YYYY-MM-DD HH:mm:ss');
	project.updateDatetime = date.format('YYYY-MM-DD HH:mm:ss');
	project.status = year < 2022 ? '已结束' : '绩效分配';
	project.evaluationPlanIds = []
	project.evaluationPlanIds.push(plans[i].eid as number)
}

export default {
  plans,
	indicators,
	projects,
};