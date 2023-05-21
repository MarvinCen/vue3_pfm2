import Mock from 'mockjs';
import setupMock from '@/utils/setup-mock';
import {GetParams, PostData, Query} from '@/types/global';
import qs from 'query-string';
import {Employee, Position} from "@/types/basic-data";
import data from '../database';
import {EvaEmployee, EvaluationPlan, EvaluationProject, Indicator, Matcher, Result} from "@/types/evaluation";
import {findEmployees2} from "@/api/basic-data/organization";
import mockUtil from "@/utils/mock-util";
import resultDb from "@/views/results/database"
import ruleDb from "@/views/rule/database"
import {Rule} from "@/types/rule";
import {Metadata, RColumn} from "@/types/results";

setupMock({
  setup() {
    Mock.mock(
      new RegExp('/evaluation/evaluationProjects'),
      'get',
      (options: GetParams) => {
        const organizationId = qs.parseUrl(options.url)
          .query as unknown as number;
        const list = data.projects.slice();
        list.reverse();
        return {
          code: 20000,
          data: {
            list,
          },
          message: undefined,
        };
      }
    );
    Mock.mock(
      '/evaluation/evaluationProject',
      'post',
      (options: PostData) => {
        console.log(123123123)
        const project: EvaluationProject = JSON.parse(options.body as string);
        project.eid = Mock.Random.increment();
        data.projects.push(project);

        // 根据每个考核方案的筛选条件筛选出employee，并生成evaEmployee对象
        const planIds = project.evaluationPlanIds;
        const plans = data.plans.filter(plan => planIds?.includes(plan.eid as number))

        plans.forEach(plan => {
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
            employees = res.data.list
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
              evaEmployee.projectId = project.eid;
              data.evaEmployees.push(evaEmployee);
            }
          })
        })
        return {
          code: 20000,
          data: {

          }
        };
      }
    );
    Mock.mock (
      new RegExp('/evaluation/evaluationEmployees'),
      'post',
      (options: PostData) => {
        const query = JSON.parse(options.body) as Query;
        const res = mockUtil.query(data.evaEmployees, query) as EvaEmployee[];
        return {
          code: 20000,
          data: {
            list: res,
            pager: query.pager
          }
        }
      }
    );
    Mock.mock(
      new RegExp('/evaluation/evaluationProject/grabResultData'),
      'post',
      (options: PostData) => {
        const dto = JSON.parse(options.body)
        const project = dto.project as EvaluationProject;
        const plan = dto.plan as EvaluationPlan;

        const startTime = project.startTime;
        const endTime = project.endTime;

        const ruleId = plan.dataGrabRuleId;
        const rule = ruleDb.rules.slice().find(r => r.eid === ruleId) as Rule;
        const resultData = grabResultData(startTime as string, endTime as string);


        const existedResults: Record<number, Result[]> = []
        for (let i = 0; i < data.results.length; i++) {
          const result = data.results[i];
          const rowId = result.rowId as number;
          const results = data.results.filter(r => r.rowId === rowId);
          if (existedResults[rowId]) continue;
          existedResults[rowId] = results;
        }
        const needToDelete: number[] = [];
        const needToAdd: Result[] = [];
        const needToEdit: Result[] = [];
        for (let tableIdStr in resultData) {
          const tableId = Number(tableIdStr.substring(1))
          needToAdd.push(...convertToResults(project.eid as number, plan.eid as number, tableId,
            resultData[tableId], existedResults, needToDelete, needToEdit))
        }
        data.results = data.results.filter(r => needToDelete.includes(r.eid as number));
        data.results.push(...needToAdd);
        const noIndicatorCount = needToAdd.filter(res => !res.indicatorId).length

        return {
          code: 20000,
          data: {
            tip: `共生成${needToAdd.length + needToEdit.length}条绩效成果。
            其中未匹配指标${noIndicatorCount}条，
            新增绩效成果${needToAdd.length}条，
            更新绩效成果${needToEdit.length}条。`
          },
        }
      }
    );
  },
});

























function grabResultData(startTime: string, endTime: string) {
  console.log('====grabbing result data====')
  const resultData = resultDb.resultTableData; // Map<t${tableId}, rows>

  const res: Record<string, any[]> = {};
  for (let tableId in resultData) {
    const data = resultData[tableId];
    let leftData: any[] = [];

    data.forEach((datum) => {
      const mdId = datum.metadataId;
      const metadata = resultDb.metadata.find(md => md.eid === mdId) as Metadata;
      const time = metadata.createDatetime as string;
      if (startTime <= time && time <= endTime)
        leftData.push(datum);
    })

    if (leftData.length !== 0) {
      res[tableId] = leftData;
    }
  }

  console.log(resultData)
  console.log(res)
  console.log('====grabbing finished====');
  return res;
}


function convertToResults(projectId: number, planId: number, tableId: number, resultData: any[],
                          existedResults: Record<number, Result[]>, needToDelete: number[], needToEdit: Result[]) {
  const indicators = data.indicators
    .filter(idc => idc.isLeaf && idc.tableId === tableId);
  const columns = resultDb.rColumns.filter(col => col.resultTableId === tableId);

  const resultLs: Result[] = [];
  for (let i = 0; i < resultData.length; i++) {
    const row: any = resultData[i];
    const results = match(indicators, row, columns, projectId, planId, existedResults, needToDelete, needToEdit, tableId);
    resultLs.push(...results);
  }

  return resultLs;
}

function match(indicators: Indicator[], row: any, columns: Record<number, RColumn>, projectId: number, planId: number,
               existedResults: Record<number, Result[]>, needToDelete: number[], needToEdit: Result[], tableId: number) {
  const matchers = indicators.map(idc => idc.matcher);
  const result: Result = {
    eid: Mock.Random.increment(),
    rowId: row.rowId,
    projectId,
    planId,
    tableId,
    workload: 0,
  }
  const newResults: Result[] = [];
  if (!matchers || matchers.length === 0) {
    result.tip = '该成果表无对应的指标匹配规则';
    newResults.push(result);
    return newResults;
  }


  matchers.forEach(matcher => {
    const filters = matcher?.filters;
    let matched: boolean = true;

    // 匹配指标，filter为一个指标的一个过滤条件
    filters?.forEach(filter => {
      const col = columns[filter.columnId as number]
      if (filter.operator === '等于')
        matched = matched && row[col.name as string] == filter.value;
      else if (filter.operator === '包含')
        matched = matched && String(row[col.name as string]).indexOf(String(filter.value)) >= 0;
      if (!matched) return;
    })

    if (matched) {
      const existed = existedResults[result.rowId as number] as Result[];

      const indicator = indicators.filter((idc) => idc.eid === matcher?.indicatorId)[0];
      result.workload = indicator.unitScore;
      result.indicatorId = indicator.eid;
      result.indicatorName = indicator.name;
      if (indicator.unitScore === 0)
        result.tip = `该指标"${indicator.name}"的单位分值为0`;

      if (existed) {
        const existedResult = existed.find(r => r.indicatorId === indicator.eid)
        if (!existedResult) {
          newResults.push(result);
          existed.forEach((r) => {
            if (!r.indicatorId) needToDelete.push(r.eid as number)
          })
        }
        else {
          existedResult.workload = result.workload;
          existedResult.indicatorId = result.indicatorId;
          existedResult.indicatorName = result.indicatorName;
          existedResult.tip = result.tip;
          needToEdit.push(existedResult)
        }
      }
    }
  })

  // 如果所有指标都匹配不到，则生成一个无指标的Result
  if (newResults.length === 0) {
    result.tip = '无匹配的指标';
  }

  return newResults;
}