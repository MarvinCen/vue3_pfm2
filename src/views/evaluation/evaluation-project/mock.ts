import Mock from 'mockjs';
import setupMock from '@/utils/setup-mock';
import {GetParams, PostData, Query} from '@/types/global';
import qs from 'query-string';
import {Employee, Position} from "@/types/basic-data";
import data from '../database';
import orgData from '@/views/basic-data/organization/database'
import {EvaEmployee, EvaluationProject} from "@/types/evaluation";
import {findEmployees2} from "@/api/basic-data/organization";
import mock from "@/utils/mock-util";
import mockUtil from "@/utils/mock-util";
import evaEmployee from "@/views/evaluation/evaluation-project/component/eva-employee.vue";

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
      new RegExp('/evaluation/evaluationProject'),
      'post',
      (options: PostData) => {
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
    )
  },
});
