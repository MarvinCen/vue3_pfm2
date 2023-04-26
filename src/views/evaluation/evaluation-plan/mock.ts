import setupMock from '@/utils/setup-mock';
import Mock from 'mockjs';
import qs from 'query-string';
import { GetParams } from '@/types/global';

setupMock({
  setup() {
    Mock.mock(
      new RegExp('/evaluation/evaluationPlans'),
      'get',
      (options: GetParams) => {
        const organizationId = qs.parseUrl(options.url)
          .query as unknown as number;
        const data = Mock.mock({
          'list|3-8': [
            {
              'eid|+1': 20000,
              'organizationId': organizationId,
              'name': '@cname',
              'positions': '@pick(["教师", "实验员", "工程师", "研究员"])',
              'professionalTitles':
                '@pick(["教授", "高级工程师", "助理研究员", "讲师"]',
              'indicatorRoot': undefined,
              'customData': undefined,
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
  },
});
