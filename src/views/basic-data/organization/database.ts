import Mock from "mockjs";
import {Department, Employee} from "@/types/basic-data";
import positionData from '../position/database'

const random = Mock.Random;

const organizationId = 1;

const departments: Department[] = [
	{
		eid: random.increment(),
		name: '本科教学',
		isLeaf: true,
		officePhoneNumber: '88-123456',
	},
	{
		eid: random.increment(),
		name: '研究生教学',
		isLeaf: true,
		officePhoneNumber: '88-234567'
	},
	{
		eid: random.increment(),
		name: '科研',
		isLeaf: true,
		officePhoneNumber: '88-345678'
	},
	{
		eid: random.increment(),
			name: '人事',
		isLeaf: true,
		officePhoneNumber: '88-456789'
	},
]
departments.forEach(department => {
	department.key = department.eid;
	department.title = department.name;
	department.organizationId = organizationId;
	department.faxNumber = String(random.integer(100000, 999999));
	department.remark = department.name;
})

const employees: Employee[] = [];
const data = Mock.mock({
	'list|100-300': [
		{
			'eid|+1': 20000,
			'name': '@cname()',
			'status': '@pick(["就职", "离职"])',
			'remark': '@csentence(3, 5)',
			'jobNumber': '@string("NY1234567890", 5, 5)',
			'birthDate': '@datetime()',
			'email': '@email',
			'linkTel': '@phone',
			'sex': '@pick("男", "女")',
			'hireType': '@pick("普通", "年薪")'
		},
	],
});
employees.push(...data.list);

const positions = positionData.positions.slice();
let idx = 0;
employees.forEach(ep => {
	ep.positionId = positions[idx].eid;
	idx = (idx + 1) % positions.length;
})
employees.push({
	eid: 9999,
	name: '管理员',
	remark: '管理员'
})



export default {
	departments,
  employees,
	organizationId,
};