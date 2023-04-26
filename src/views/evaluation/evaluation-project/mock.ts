import Mock from 'mockjs';
import setupMock from '@/utils/setup-mock';
import { GetParams } from '@/types/global';
import qs from 'query-string';
import {Employee} from "@/types/basic-data";

setupMock({
  setup() {
    Mock.mock(
      new RegExp('/evaluation/evaluationProjects'),
      'get',
      (options: GetParams) => {
        const organizationId = qs.parseUrl(options.url)
          .query as unknown as number;
        const data = Mock.mock({
          'list|3-10': [
            {
              'eid|+1': 20000,
              'organizationId': organizationId,
              'name': '@cname',
              'startTime': '@datetime("yyyy-MM-dd HH:mm:ss")',
              'endTime': '@datetime("yyyy-MM-dd HH:mm:ss")',
              'status':
                '@pick(["数据录入", "工作量计算", "成果分配", "绩效计算", "绩效分配", "考核结束"])',
              'evaluationPlans': [],
            },
          ],
        });
        return {
          code: 20000,
          data: {
            list: data.list,
          },
          message: undefined,
        };
      }
    );
    Mock.mock(new RegExp(''), 'get', (options: GetParams) => {
      const employees: Employee[] = Mock.mock({
        'list|122-312': [
          {
            'eid|+1': 30000,
            'name': '@cname',
            'status': '就职',
            'remark': '@csentence',
            'jobNumber': '@id',
            'birthDate': '@datetime',
            'email': '@email',
            'linkTel': '',
            'sex': '@pick(["男", "女"])',
            'hireType': '@pick(["年薪", "普通"])',
            'position': '@pick(["教师", "工程师", "研究员"])',
            'professionalTitle': '@pick(["二级", "四级", "六级"])',
          }
        ]
      });
      return {
        code: 20000,
        data: {
          list: employees,
        },
        message: undefined,
      }
    })
  },
});
