import Mock, { Random } from 'mockjs';
import setupMock from '@/utils/setup-mock';
import qs from 'query-string';
import { GetParams } from '@/types/global';

const czName = () => {
  return Random.cname();
};

setupMock({
  setup() {
    Mock.mock(new RegExp('/results/resultTable/'), (options: GetParams) => {
      const { resultTypeId } = qs.parseUrl(options.url).query;
      const data = Mock.mock({
        'list|2-3': [
          {
            'eid|+1': 10001,
            'name': czName(),
            'resultTypeId': resultTypeId,
          },
        ],
      });
      return {
        code: 20000,
        data: {
          list: data.list,
        },
        message: '',
      };
    });
  },
});
