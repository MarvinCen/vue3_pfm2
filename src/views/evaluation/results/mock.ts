import setupMock from "@/utils/setup-mock";
import Mock from "mockjs";
import {GetParams, PostData, Query, ReqPagerParams} from "@/types/global";
import data from "@/views/evaluation/database"
import MockUtil from "@/utils/mock-util";
import qs from "query-string";
import {Distribution, Result} from "@/types/evaluation";
import {findResultTables} from "@/api/results/results";
import {ResultTable} from "@/types/results";



setupMock({
	setup() {
		Mock.mock(
			new RegExp('/evaluation/result/list'),
			'post',
			(options: PostData) => {
				const query = JSON.parse(options.body) as Query;
				const results = data.results.slice();

				const list = MockUtil.query(results, query);
				return {
					code: 20000,
					data: {
						list
					}
				}
			}
		);

		Mock.mock(
			new RegExp('/evaluation/result/distribution/overall'),
			'get',
			async (options: GetParams) => {
				const query = qs.parseUrl(options.url).query;
				const projectId = Number(query.projectId);
				const employeeId = Number(query.employeeId);
				const findAll = !employeeId;

				let results: Result[] = [];
				if (!findAll) {
					try {
						results = getMyResults(employeeId, projectId);
					}
					catch (err) {
						return {
							code: 20500,
							message: '该人员还未纳入考核人员当中'
						}
					}
				}


				else {
					results = data.results.slice().filter(r => r.projectId === projectId);
				}

				const map: Map<number, Result[]> = new Map();  // <tableId, result[]>
				const tableIds: number[] = [];
				results.forEach(result => {
					const rs = map.get(result.tableId as number);
					if (rs) rs.push(result);
					else {
						map.set(result.tableId as number, []);
						tableIds.push(result.tableId as number)
					}
				})

				const tables: ResultTable[] = []
				const resp =
					await findResultTables({conditions: [{prop: 'eid', type: 'in', value: tableIds}]});
				tables.push(...resp.data.list);

				// 计算待分配和已分配
				const dto: any[] = [];
				map.forEach((results, tableId) => {
					const total = results.length;
					const haveNotDistCount = results.filter(r => !r.distributed).length;
					const distributedCount = total - haveNotDistCount;
					dto.push({
						tableId,
						tableName: tables.filter(t => t.eid === tableId)[0].name,
						haveNotDistCount,
						distributedCount,
					})
				})
				return {
					code: 20000,
					data: {
						list: dto
					}
				}
			}
		);

		Mock.mock(
			new RegExp('/evaluation/result/distribution/detail'),
			'get',
			(options: GetParams) => {
				const query = qs.parseUrl(options.url).query;
				const projectId = Number(query.projectId);
				const employeeId = Number(query.employeeId);
				const findAll = !employeeId;


				let results: Result[] = [];
				if (!findAll) {
					try {
						// TODO query rows
						results = getMyResults(employeeId, projectId);
					}
					catch (err) {
						return {
							code: 20500,
							message: '该人员还未纳入考核人员当中'
						}
					}
					return {
						code: 20000,
						data: {
							list: results,
						},
					}

				}

				else {
					return {
						code: 20000,
						data: {
							list: []
						},
					}
				}
			}
		)
	}
})


function getMyResults(employeeId: number, projectId: number, tableId?: number): Result[] {
	let results: Result[] = [];
	const evaEmployee = data.evaEmployees
		.find(evaEmployee => evaEmployee.projectId === projectId &&
			evaEmployee.employeeId === employeeId)
	if (!evaEmployee) {
		throw new Error('该人员还未纳入考核人员当中');
	}


	let distributions: Distribution[] = []
	if (!tableId) {
		results = data.results
			.filter(r =>
				r.projectId === projectId && r.evaEmployeeId === evaEmployee.eid
			)
		distributions = data.distributions
			.filter(d =>
				d.evaEmployeeId === evaEmployee && projectId === projectId
			)
	}
	else {
		results = data.results
			.filter(r =>
				r.projectId === projectId &&
				r.evaEmployeeId === evaEmployee.eid &&
				r.tableId === tableId
			)
		distributions = data.distributions
			.filter(d =>
				d.evaEmployeeId === evaEmployee &&
				projectId === projectId &&
				d.tableId === tableId
			)
	}

	results.push(...distributions.map(d => {
		const result: Result = {
			projectId: d.projectId,
			planId: d.planId,
			evaEmployeeId: d.evaEmployeeId,
			evaEmployeeName: d.evaEmployeeName,
			workload: (d.totalScore as number) * (d.ratio as number),
			tag: d.tag
		}
		return result;
	}))

	return results;
}
