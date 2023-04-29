import Mock from "mockjs";

const data = Mock.mock({
	'list|30': [
		{
			'eid|+1': 20000,
			'name': '@pick(["教师", "研究员", "实验员", "工程师"])',
			'positionLevel': '@pick(["正高级", "副高级", "中级", "初级"])',
			'professionalTitle':
				'@pick(["教授", "讲师", "助教", "研究员", "助理研究员", "高级工程师"])',
			'positionGrade': '@pick(["十级", "九级", "四级", "六级"])',
			'remark': '@csentence',
		},
	],
});
const positions = data.list;
export default {
	positions,
}