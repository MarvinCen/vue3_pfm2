import Mock from 'mockjs';
import setupMock from '@/utils/setup-mock';
import { GetParams, ReqPagerParams } from '@/types/global';
import qs from 'query-string';
import { Department } from '@/types/basic-data';
import data from './database';
const { departments, employees } = data;
const { Random } = Mock;

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
  },
});
