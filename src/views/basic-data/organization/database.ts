import Mock from "mockjs";
import {Department} from "@/types/basic-data";

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
			'hireType': '@pick("普通", "年薪")',
			'psum': '',
			'postSequenceLevel': '@pick("二级", "四级")',
		},
	],
});
const employees = data.list;

export default {
	departments,
  employees,
	organizationId,
};