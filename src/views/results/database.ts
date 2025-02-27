import {ResultTable, RColumn, ResultType, Metadata} from "@/types/results";
import Mock from "mockjs";
import orgData from '@/views/organization/database';
import {TreeFieldNames} from "@arco-design/web-vue";
import moment from "moment";
const random = Mock.Random;
const departments = orgData.departments;


const rootResultTypes: ResultType[] = [
	{
		eid: random.increment(),
		name: '本科教学',
		departmentId: departments.filter(dep => dep.name === '本科教学')[0].eid,
		departmentName: '本科教学',
		customData: undefined,
		isLeaf: false,
		status: 'enable',
		remark: '本科教学',
	},
	{
		eid: random.increment(),
		name: '科研',
		departmentId: departments.filter(dep => dep.name === '科研')[0].eid,
		departmentName: '科研',
		customData: undefined,
		isLeaf: false,
		status: 'enable',
		remark: '科研',
	},
	{
		eid: random.increment(),
		name: '公共服务',
		departmentId: departments.filter(dep => dep.name === '人事')[0].eid,
		departmentName: '人事',
		customData: undefined,
		isLeaf: false,
		status: 'enable',
		remark: '公共服务',
	},
]
const rt0Children: ResultType[] = [
	{
		eid: random.increment(),
		parentId: rootResultTypes[0].eid,
		name: '本科生课程',
		departmentId: departments.filter(dep => dep.name === '本科教学')[0].eid,
		departmentName: '本科教学',
		customData: undefined,
		isLeaf: true,
		status: 'enable',
		remark: '本科生课程',
	},
	{
		eid: random.increment(),
		parentId: rootResultTypes[0].eid,
		name: '教学会议报告',
		departmentId: departments.filter(dep => dep.name === '本科教学')[0].eid,
		departmentName: '本科教学',
		customData: undefined,
		isLeaf: true,
		status: 'enable',
		remark: '教学会议报告',
	},
	{
		eid: random.increment(),
		parentId: rootResultTypes[0].eid,
		name: '学科竞赛指导',
		departmentId: departments.filter(dep => dep.name === '本科教学')[0].eid,
		departmentName: '本科教学',
		customData: undefined,
		isLeaf: true,
		status: 'enable',
		remark: '本科生课程',
	},
]
const rt1Children: ResultType[] = [
	{
		eid: random.increment(),
		parentId: rootResultTypes[1].eid,
		name: '期刊论文',
		departmentId: departments.filter(dep => dep.name === '科研')[0].eid,
		departmentName: '科研',
		customData: undefined,
		isLeaf: true,
		status: 'enable',
		remark: '期刊论文',
	},
	{
		eid: random.increment(),
		parentId: rootResultTypes[1].eid,
		name: '学术论文',
		departmentId: departments.filter(dep => dep.name === '科研')[0].eid,
		departmentName: '科研',
		customData: undefined,
		isLeaf: true,
		status: 'enable',
		remark: '学术论文',
	},
	{
		eid: random.increment(),
		parentId: rootResultTypes[1].eid,
		name: '专著',
		departmentId: departments.filter(dep => dep.name === '科研')[0].eid,
		departmentName: '科研',
		customData: undefined,
		isLeaf: true,
		status: 'enable',
		remark: '专著',
	},
]
const rt2Children: ResultType[] = [
	{
		eid: random.increment(),
		parentId: rootResultTypes[2].eid,
		name: 'D1类公共服务',
		departmentId: departments.filter(dep => dep.name === '人事')[0].eid,
		departmentName: '人事',
		customData: undefined,
		isLeaf: true,
		status: 'enable',
		remark: 'D1类公共服务',
	},
	{
		eid: random.increment(),
		parentId: rootResultTypes[2].eid,
		name: 'D2类公共服务',
		departmentId: departments.filter(dep => dep.name === '人事')[0].eid,
		departmentName: '人事',
		customData: undefined,
		isLeaf: true,
		status: 'enable',
		remark: 'D2类公共服务',
	},
	{
		eid: random.increment(),
		parentId: rootResultTypes[2].eid,
		name: 'D3类公共服务',
		departmentId: departments.filter(dep => dep.name === '人事')[0].eid,
		departmentName: '人事',
		customData: undefined,
		isLeaf: true,
		status: 'enable',
		remark: 'D3类公共服务',
	},
]
// rootResultTypes[0].children = rt0Children
// rootResultTypes[1].children = rt1Children
// rootResultTypes[2].children = rt2Children

const resultTypeList: ResultType[] = [
	...rootResultTypes,
	...rt0Children,
	...rt1Children,
	...rt2Children,
]

const tables: ResultTable[] = [
	{
		eid: random.increment(),
		resultTypeId: rt0Children.filter(r => r.name === '本科生课程')[0].eid,
		name: '本科生课程',
		inputWay: '部门录入',
	},
	{
		eid: random.increment(),
		resultTypeId: rt0Children.filter(r => r.name === '教学会议报告')[0].eid,
		name: '教学会议报告',
		inputWay: '部门录入',
	},
	{
		eid: random.increment(),
		resultTypeId: rt0Children.filter(r => r.name === '学科竞赛指导')[0].eid,
		name: '学科竞赛指导',
		inputWay: '部门录入',
	},
	{
		eid: random.increment(),
		resultTypeId: rt1Children.filter(r => r.name === '期刊论文')[0].eid,
		name: '期刊论文',
		inputWay: '部门录入',
	},
	{
		eid: random.increment(),
		resultTypeId: rt1Children.filter(r => r.name === '学术论文')[0].eid,
		name: '学术论文',
		inputWay: '部门录入',
	},
	{
		eid: random.increment(),
		resultTypeId: rt1Children.filter(r => r.name === '专著')[0].eid,
		name: '专著（科研网）',
		inputWay: '部门录入',
	},
	{
		eid: random.increment(),
		resultTypeId: rt1Children.filter(r => r.name === '专著')[0].eid,
    name: '专著',
		inputWay: '部门录入',
	},
	{
		eid: random.increment(),
		resultTypeId: rt2Children.filter(r => r.name === 'D1类公共服务')[0].eid,
		name: 'D1类公共服务',
		inputWay: '部门录入',
	},
	{
		eid: random.increment(),
		resultTypeId: rt2Children.filter(r => r.name === 'D2类公共服务')[0].eid,
		name: 'D2类公共服务',
		inputWay: '部门录入',
	},
	{
		eid: random.increment(),
		resultTypeId: rt2Children.filter(r => r.name === 'D3类公共服务')[0].eid,
		name: 'D3类公共服务',
		inputWay: '部门录入',
	},
];
(function setTables(rts: ResultType[]) {
	for (let i = 0; i < rts.length; i++) {
		const rt = rts[i];
		rt.resultTables = tables.filter(t => t.resultTypeId === rt.eid);
		if (rt.children &&  rt.children.length > 0) {
			setTables(rt.children);
		}
	}
})(rootResultTypes)

const columns: RColumn[] = [
	{
		eid: random.increment(),
		resultTableId: tables.filter(t => t.name === '专著（科研网）')[0].eid,
		name: '工号',
		componentType: '#JobNumber',
		dataType: 'text',
		unique: true,
		nullable: false,
		example: '',
		designateAs: '工号',
	},
	{
		eid: random.increment(),
		resultTableId: tables.filter(t => t.name === '专著（科研网）')[0].eid,
		name: '姓名',
		componentType: '#Employee',
		dataType: 'text',
		unique: false,
		nullable: false,
		example: '',
		designateAs: '负责人姓名',
	},
	{
		eid: random.increment(),
		resultTableId: tables.filter(t => t.name === '专著（科研网）')[0].eid,
		name: '承担单位',
		componentType: 'TextInput',
		dataType: 'text',
		unique: false,
		nullable: false,
		example: '土木工程学院',
	},
	{
		eid: random.increment(),
		resultTableId: tables.filter(t => t.name === '专著（科研网）')[0].eid,
		name: '系部科室',
		componentType: 'TextInput',
		dataType: 'text',
		unique: false,
		nullable: false,
		example: '土木工程学院',
	},
	{
		eid: random.increment(),
		resultTableId: tables.filter(t => t.name === '专著（科研网）')[0].eid,
		name: '业绩分类',
		componentType: 'TextInput',
		dataType: 'text',
		unique: false,
		nullable: false,
		example: '土木工程学院',
	},
	{
		eid: random.increment(),
		resultTableId: tables.filter(t => t.name === '专著（科研网）')[0].eid,
		name: '业务ID',
		componentType: 'IntInput',
		dataType: 'number',
		unique: false,
		nullable: false,
		example: '土木工程学院',
	},
	{
		eid: random.increment(),
		resultTableId: tables.filter(t => t.name === '专著（科研网）')[0].eid,
		name: '参与人员',
		componentType: '#Participant',
		dataType: 'text',
		unique: false,
		nullable: false,
		example: '土木工程学院',
		designateAs: '参与人',
	},
	{
		eid: random.increment(),
		resultTableId: tables.filter(t => t.name === '专著（科研网）')[0].eid,
		name: '业绩描述',
		componentType: 'TextInput',
		dataType: 'text',
		unique: false,
		nullable: false,
		example: '土木工程学院',
	},
	{
		eid: random.increment(),
		resultTableId: tables.filter(t => t.name === '专著（科研网）')[0].eid,
		name: '取值数',
		componentType: 'DecInput',
		dataType: 'decimal',
		unique: false,
		nullable: false,
		example: '土木工程学院',
	},
	{
		eid: random.increment(),
		resultTableId: tables.filter(t => t.name === '专著（科研网）')[0].eid,
		name: '业绩时间',
		componentType: 'DatePicker',
		dataType: 'Datetime',
		unique: false,
		nullable: false,
		example: '土木工程学院',
	},
]
tables.filter(t => t.name === '专著（科研网）')[0].columns = columns;



const desc = [
	"专著ID：9667</br>专著名称：山地村镇建设用地适宜性评价理论及应用</br>出版单位：科学出版社</br>出版时间：2021-04-01</br>著作类型：专著</br>总字数（万）：33</br>创建时间：2021-06-16",
	"专著ID：9986</br>专著名称：地埋管地源热泵系统理论与实践</br>出版单位：中国建筑工业出版社</br>出版时间：2021-09-01</br>著作类型：专著</br>总字数（万）：38.4</br>创建时间：2021-10-29",
	"专著ID：9924</br>专著名称：锚杆-围岩结构系统无损探伤理论和智能诊断方法</br>出版单位：科学出版社</br>出版时间：2021-07-01</br>著作类型：专著</br>总字数（万）：17.3</br>创建时间：2021-10-12",
	"专著ID：9805</br>专著名称：主应力轴旋转下黄土的力学特性及本构模型</br>出版单位：科学出版社</br>出版时间：2021-04-15</br>著作类型：专著</br>总字数（万）：28.2</br>创建时间：2021-08-18",
	"专著ID：10172</br>专著名称：建筑智能建造技术初探及其应用</br>出版单位：中国建筑工业出版社</br>出版时间：2021-04-01</br>著作类型：专著</br>总字数（万）：27.8</br>创建时间：2021-12-05",
	"专著ID：10173</br>专著名称：高层钢-混凝土混合结构体系抗震性能与设计方法</br>出版单位：中国建筑工业出版社</br>出版时间：2021-07-01</br>著作类型：专著</br>总字数（万）：58.3</br>创建时间：2021-12-05",
	"专著ID：10092</br>专著名称：Application of Soft Computing, Machine Learning, Deep Learning and Optimizations in Geoengineering and Geoscience</br>出版单位：Springer</br>出版时间：2021-09-01</br>著作类型：专著</br>总字数（万）：3.7</br>创建时间：2021-11-26"
]
const tableData: any[] = [
	{
		'工号': random.pick(['T','N']) + random.integer(1111, 9999),
		'姓名': orgData.employees[1].name,
		'承担单位': '土木工程学院',
		'系部科室': random.pick(['岩土工程系','建筑环境与设备工程系', '校领导']),
		'业绩分类': '其他专著',
		'业务ID': random.integer(9600, 10100),
		'参与人员': '王桂林,孙帆(学),文海家,吴曙光',
		'业绩描述': desc[0],
		'取值数': 33,
		'业绩时间': random.datetime('yyyy-MM-dd HH:mm:ss'),
	},
	{
		'工号': random.pick(['T','N', '']) + random.integer(1111, 9999),
		'姓名': orgData.employees[1].name,
		'承担单位': '土木工程学院',
		'系部科室': random.pick(['岩土工程系','建筑环境与设备工程系', '校领导']),
		'业绩分类': '其他专著',
		'业务ID': random.integer(9600, 10100),
		'参与人员': '王勇,李文欣(外),付祥钊,刘勇',
		'业绩描述': desc[1],
		'取值数': 33,
		'业绩时间': random.datetime('yyyy-MM-dd HH:mm:ss'),
	},
	{
		'工号': random.pick(['T','N', '']) + random.integer(1111, 9999),
		'姓名': orgData.employees[1].name,
		'承担单位': '土木工程学院',
		'系部科室': random.pick(['岩土工程系','建筑环境与设备工程系', '校领导']),
		'业绩分类': '其他专著',
		'业务ID': random.integer(9600, 10100),
		'参与人员': '陈建功',
		'业绩描述': desc[2],
		'取值数': 17.3,
		'业绩时间': random.datetime('yyyy-MM-dd HH:mm:ss'),
	},
	{
		'工号': random.pick(['T','N', '']) + random.integer(1111, 9999),
		'姓名': orgData.employees[1].name,
		'承担单位': '土木工程学院',
		'系部科室': random.pick(['岩土工程系','建筑环境与设备工程系', '校领导']),
		'业绩分类': '其他专著',
		'业务ID': random.integer(9600, 10100),
		'参与人员': '钟祖良,王睢(学),刘新荣',
		'业绩描述': desc[3],
		'取值数': 0,
		'业绩时间': random.datetime('yyyy-MM-dd HH:mm:ss'),
	},
	{
		'工号': random.pick(['T','N', '']) + random.integer(1111, 9999),
		'姓名': orgData.employees[1].name,
		'承担单位': '土木工程学院',
		'系部科室': random.pick(['岩土工程系','建筑环境与设备工程系', '校领导']),
		'业绩分类': '其他专著',
		'业务ID': random.integer(9600, 10100),
		'参与人员': '周绪红,刘界鹏,冯亮,伍洲,齐宏拓(外),李东声(学)',
		'业绩描述': desc[4],
		'取值数': 27.8,
		'业绩时间': random.datetime('yyyy-MM-dd HH:mm:ss'),
	},
	{
		'工号': random.pick(['T','N', '']) + random.integer(1111, 9999),
		'姓名': orgData.employees[1].name,
		'承担单位': '土木工程学院',
		'系部科室': random.pick(['岩土工程系','建筑环境与设备工程系', '校领导']),
		'业绩分类': '其他专著',
		'业务ID': random.integer(9600, 10100),
		'参与人员': '周绪红,刘界鹏,林旭川(外),单文臣(外)',
		'业绩描述': desc[5],
		'取值数': 58.3,
		'业绩时间': random.datetime('yyyy-MM-dd HH:mm:ss'),
	},
	{
		'工号': random.pick(['T','N', '']) + random.integer(1111, 9999),
		'姓名': orgData.employees[1].name,
		'承担单位': '土木工程学院',
		'系部科室': random.pick(['岩土工程系','建筑环境与设备工程系', '校领导']),
		'业绩分类': '其他专著',
		'业务ID': random.integer(9600, 10100),
		'参与人员': '仉文岗,张艳梅(外),顾鑫(学),巫崇智(学),韩亮(学)',
		'业绩描述': desc[6],
		'取值数': 3.7,
		'业绩时间': random.datetime('yyyy-MM-dd HH:mm:ss'),
	},
]
tableData.forEach(data => { data.eid = random.increment()})
const metadata: Metadata[] = (
	function () {
		const res: Metadata[] = [];
		for (let i = 0; i < tableData.length; i++) {
			const metadata: Metadata = {
				eid: random.increment(),
				createDatetime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
				updateDatetime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
				importerId: 9999,
				importerName: '管理员',
				directorId: orgData.employees[1].eid,
				directorName: orgData.employees[1].name,
				status: '通过'
			}
			res.push(metadata);
			tableData[i].metadataId = metadata.eid;
		}
		return res;
	}
)();

const resultTableData: Record<string, any[]> = {}
resultTableData['t' + columns[0].resultTableId] = tableData;

export default  {
	resultTypes: resultTypeList,
	resultTypesTree: rootResultTypes,
	resultTables: tables,
	rColumns: columns,
	resultTableData: resultTableData,
	metadata,
}