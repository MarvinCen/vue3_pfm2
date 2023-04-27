import setupMock from '@/utils/setup-mock';
import Mock from 'mockjs';
import qs from 'query-string';
import {GetParams, ReqPagerParams} from '@/types/global';
import {EvaluationPlan} from "@/types/evaluation";

setupMock({
  setup() {
    Mock.mock(
      new RegExp('/evaluation/evaluationPlans'),
      'get',
      (options: GetParams) => {
        // @ts-ignore
        const params = qs.parseUrl(options.url).query as unknown as ReqPagerParams;
        const orgId = Number(Mock.Random.id());
        const data: { list: EvaluationPlan[] } = Mock.mock({
          'list|6-8': [
            {
              'eid|+1': 20000,
              'organizationId': orgId,
              'name|+1': 2018,
              'positions': '教师，' + '@pick(["实验员", "工程师", "研究员"])',
              'professionalTitles':
                '教授，' + '@pick(["高级工程师", "助理研究员", "讲师"])',
              'indicatorRoot': undefined,
              'customData': undefined,
              'remark': '@csentence',
            },
          ],
        });
        params.pager = params.pager ? params.pager : { current: 1, pageSize: 10 };
        params.pager.total = data.list.length;
        return {
          code: 20000,
          data: {
            list: data.list,
            pager: params.pager,
          },
          message: undefined,
        };
      }
    );
  },
});
