import Mock from "mockjs";
import {Position} from "@/types/basic-data";

const random = Mock.Random;

const positions = [];
positions.push(...[
	{
		'eid': random.increment(),
		'name': '教师',
		'positionLevel': '正高级',
		'professionalTitle': '教授',
		'positionGrade': '一级',
	},
	{
		'eid': random.increment(),
		'name': '教师',
		'positionLevel': '正高级',
		'professionalTitle': '教授',
		'positionGrade': '二级',
	},
	{
		'eid': random.increment(),
		'name': '教师',
		'positionLevel': '正高级',
		'professionalTitle': '教授',
		'positionGrade': '三级',
	},
	{
		'eid': random.increment(),
		'name': '教师',
		'positionLevel': '正高级',
		'professionalTitle': '教授',
		'positionGrade': '四级',
	},
	{
		'eid': random.increment(),
		'name': '教师',
		'positionLevel': '副高级',
		'professionalTitle': '副教授',
		'positionGrade': '五级',
	},
	{
		'eid': random.increment(),
		'name': '教师',
		'positionLevel': '副高级',
		'professionalTitle': '副教授',
		'positionGrade': '六级',
	},
	{
		'eid': random.increment(),
		'name': '教师',
		'positionLevel': '副高级',
		'professionalTitle': '副教授',
		'positionGrade': '七级',
	},
	{
		'eid': random.increment(),
		'name': '教师',
		'positionLevel': '中级',
		'professionalTitle': '讲师',
		'positionGrade': '八级',
	},
	{
		'eid': random.increment(),
		'name': '教师',
		'positionLevel': '中级',
		'professionalTitle': '讲师',
		'positionGrade': '九级',
	},
	{
		'eid': random.increment(),
		'name': '教师',
		'positionLevel': '中级',
		'professionalTitle': '讲师',
		'positionGrade': '十级',
	},
	{
		'eid': random.increment(),
		'name': '教师',
		'positionLevel': '初级',
		'professionalTitle': '助教',
		'positionGrade': '十一级',
	},
	{
		'eid': random.increment(),
		'name': '教师',
		'positionLevel': '初级',
		'professionalTitle': '助教',
		'positionGrade': '十二级',
	},

]);
positions.push(...[
	{
		'eid': random.increment(),
    'name': '研究员',
    'positionLevel': '正高级',
    'professionalTitle': '研究员',
    'positionGrade': '一级',
	},
	{
		'eid': random.increment(),
    'name': '研究员',
    'positionLevel': '正高级',
    'professionalTitle': '研究员',
    'positionGrade': '二级'
	},
	{
		'eid': random.increment(),
		'name': '研究员',
		'positionLevel': '正高级',
		'professionalTitle': '研究员',
		'positionGrade': '三级'
	},
	{
		'eid': random.increment(),
		'name': '研究员',
		'positionLevel': '正高级',
		'professionalTitle': '研究员',
		'positionGrade': '四级'
	},
	{
		'eid': random.increment(),
		'name': '研究员',
		'positionLevel': '副高级',
		'professionalTitle': '副研究员',
		'positionGrade': '五级'
	},
	{
		'eid': random.increment(),
		'name': '研究员',
		'positionLevel': '副高级',
		'professionalTitle': '副研究员',
		'positionGrade': '六级'
	},
	{
		'eid': random.increment(),
		'name': '研究员',
		'positionLevel': '副高级',
		'professionalTitle': '副研究员',
		'positionGrade': '七级'
	},
	{
		'eid': random.increment(),
		'name': '研究员',
		'positionLevel': '中级',
		'professionalTitle': '助理研究员',
		'positionGrade': '八级'
	},
	{
		'eid': random.increment(),
		'name': '研究员',
		'positionLevel': '中级',
		'professionalTitle': '助理研究员',
		'positionGrade': '九级'
	},
	{
		'eid': random.increment(),
		'name': '研究员',
		'positionLevel': '中级',
		'professionalTitle': '助理研究员',
		'positionGrade': '十级'
	},
	{
		'eid': random.increment(),
		'name': '研究员',
		'positionLevel': '初级',
		'professionalTitle': '研究实习员',
		'positionGrade': '十一级'
	},
	{
		'eid': random.increment(),
		'name': '研究员',
		'positionLevel': '初级',
		'professionalTitle': '研究实习员',
		'positionGrade': '十二级'
	},
]);
positions.push(...[
	{
		'eid': random.increment(),
    'name': '工程',
    'positionLevel': '正高级',
    'professionalTitle': '正高级工程师',
    'positionGrade': '一级'
	},
	{
		'eid': random.increment(),
		'name': '工程',
		'positionLevel': '正高级',
		'professionalTitle': '正高级工程师',
		'positionGrade': '二级'
	},
	{
		'eid': random.increment(),
		'name': '工程',
		'positionLevel': '正高级',
		'professionalTitle': '正高级工程师',
		'positionGrade': '三级'
	},
	{
		'eid': random.increment(),
		'name': '工程',
		'positionLevel': '正高级',
		'professionalTitle': '正高级工程师',
		'positionGrade': '四级'
	},
	{
		'eid': random.increment(),
		'name': '工程',
		'positionLevel': '副高级',
		'professionalTitle': '高级工程师',
		'positionGrade': '五级'
	},
	{
		'eid': random.increment(),
		'name': '工程',
		'positionLevel': '副高级',
		'professionalTitle': '高级工程师',
		'positionGrade': '六级'
	},
	{
		'eid': random.increment(),
		'name': '工程',
		'positionLevel': '副高级',
		'professionalTitle': '高级工程师',
		'positionGrade': '七级'
	},
	{
		'eid': random.increment(),
		'name': '工程',
		'positionLevel': '中级',
		'professionalTitle': '工程师',
		'positionGrade': '八级'
	},
	{
		'eid': random.increment(),
		'name': '工程',
		'positionLevel': '中级',
		'professionalTitle': '工程师',
		'positionGrade': '九级'
	},
	{
		'eid': random.increment(),
		'name': '工程',
		'positionLevel': '中级',
		'professionalTitle': '工程师',
		'positionGrade': '十级'
	},
	{
		'eid': random.increment(),
		'name': '工程',
		'positionLevel': '初级',
		'professionalTitle': '助理工程师',
		'positionGrade': '十一级'
	},
	{
		'eid': random.increment(),
		'name': '工程',
		'positionLevel': '初级',
		'professionalTitle': '助理工程师',
		'positionGrade': '十二级'
	},
	{
		'eid': random.increment(),
		'name': '工程',
		'positionLevel': '其他',
		'professionalTitle': '技术员',
		'positionGrade': '十三级'
	},
]);
positions.push(...[
	{
		'eid': random.increment(),
    'name': '实验员',
    'positionLevel': '副高级',
    'professionalTitle': '高级实验师',
    'positionGrade': '五级',
	},
	{
		'eid': random.increment(),
		'name': '实验员',
		'positionLevel': '副高级',
		'professionalTitle': '高级实验师',
		'positionGrade': '六级',
	},
	{
		'eid': random.increment(),
		'name': '实验员',
		'positionLevel': '副高级',
		'professionalTitle': '高级实验师',
		'positionGrade': '七级',
	},
	{
		'eid': random.increment(),
		'name': '实验员',
		'positionLevel': '中级',
		'professionalTitle': '实验师',
		'positionGrade': '八级',
	},
	{
		'eid': random.increment(),
		'name': '实验员',
		'positionLevel': '中级',
		'professionalTitle': '实验师',
		'positionGrade': '九级',
	},
	{
		'eid': random.increment(),
		'name': '实验员',
		'positionLevel': '中级',
		'professionalTitle': '实验师',
		'positionGrade': '十级',
	},
	{
		'eid': random.increment(),
		'name': '实验员',
		'positionLevel': '初级',
		'professionalTitle': '助理实验师',
		'positionGrade': '十一级',
	},
	{
		'eid': random.increment(),
		'name': '实验员',
		'positionLevel': '初级',
		'professionalTitle': '助理实验师',
		'positionGrade': '十二级',
	},
	{
		'eid': random.increment(),
		'name': '实验员',
		'positionLevel': '其他',
		'professionalTitle': '实验员',
		'positionGrade': '十三级',
	},
]);

export default {
	positions,
}