import Mock from "mockjs";
import orgData from "@/views/organization/database"
import {EvaEmployee, EvaluationPlan, EvaluationProject, Indicator, Result} from "@/types/evaluation";
import moment from "moment";
import {Employee, Position} from "@/types/basic-data";
import {findEmployees2} from "@/api/basic-data/organization";
import mockUtil from "@/utils/mock-util";

const plans: EvaluationPlan[] = Mock.mock({
	'list|6': [
		{
			'eid|+1': 20000,
			'organizationId': orgData.organizationId,
			'name|+1': 2017,
			'positions': '教师,' + '@pick(["实验员", "工程师", "研究员"])',
			'professionalTitles':
				'教授,' + '@pick(["高级工程师", "助理研究员", "讲师"])',
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

const evaEmployees: EvaEmployee[] = [];
function createEvaEmployees() {
	const plan = plans[plans.length - 1];

	const positions = plan.positions as string[];
	const pTitles = plan.professionalTitles as string[];

	let employees: Employee[] = [];
	findEmployees2({
		conditions: [
			{
				prop: 'position.name',
				type: 'in',
				value: positions,
			},
			{
				prop: 'position.professionalTitle',
				type: 'in',
				value: pTitles,
			}
		],
		withs: ['position']
	}).then(res => {
		employees = res.data.data.list
		const evaEmployeeList: EvaEmployee[] = []
		for (let employee of employees) {
			const evaEmployee: EvaEmployee = {};
			mockUtil.setBaseEntityAttrs(evaEmployee);
			evaEmployee.name = employee.name;
			evaEmployee.hireType = employee.hireType;
			evaEmployee.jobNumber = employee.jobNumber;
			evaEmployee.needToCalc = true;
			evaEmployee.position = (employee.position as Position).name;
			evaEmployee.positionLevel = (employee.position as Position).positionLevel;
			evaEmployee.planId = plan.eid;
			evaEmployee.projectId = projects[projects.length - 1].eid;
			evaEmployeeList.push(evaEmployee);
		}
		evaEmployees.push(...evaEmployeeList);
	})
}
createEvaEmployees();


const results: Result[] = [];

export default {
  plans,
	indicators,
	projects,
	evaEmployees,
	results,
};