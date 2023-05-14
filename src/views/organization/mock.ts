import Mock from 'mockjs';
import setupMock from '@/utils/setup-mock';
import {GetParams, PostData, Query, ReqPagerParams} from '@/types/global';
import qs from 'query-string';
import {Department, Employee} from '@/types/basic-data';
import data from './database';
const { departments, employees } = data;
const { Random } = Mock;
import mockUtil from '@/utils/mock-util'
import positionData from '@/views/basic-data/position/database'


setupMock({
  setup() {
    Mock.mock(
      new RegExp('common/organization/department'),
      'get',
      (options: GetParams) => {
        const params = qs.parseUrl(options.url)
          .query as unknown as ReqPagerParams;
        return {
          code: 20000,
          data: {
            list: departments,
            pager: {
              current: 1,
              pageSize: params.pager?.pageSize,
              total: departments.length,
            },
          },
          message: '',
        };
      }
    );
    Mock.mock(
      new RegExp('/common/organization/employees'),
      'get',
      (options: GetParams) => {
        const params = qs.parseUrl(options.url)
          .query as unknown as ReqPagerParams;
        return {
          code: 20000,
          data: {
            list: employees,
            pager: {
              current: 1,
              pageSize: params.pager?.pageSize,
              total: employees.length,
            },
          },
          message: '',
        };
      }
    );
    Mock.mock(
      new RegExp('/common/organization/employees'),
      'post',
      (options: PostData) => {
        const query = JSON.parse(options.body) as Query;

        let employees: Employee[] = data.employees.slice();
        if (query.withs) {
          const withs = query.withs;
          for (let wth of withs) {
            if (wth === 'position') {
              const positions = positionData.positions.slice();
              employees.forEach( ep => {
                ep.position = positions.filter(p => p.eid === ep.positionId)[0];
              })
            }
          }
        }

        employees = mockUtil.query(employees, query) as Employee[];

        return {
          code: 20000,
          data: {
            list: employees,
            pager: query.pager
          }
        }
      }
    )
  },
});
