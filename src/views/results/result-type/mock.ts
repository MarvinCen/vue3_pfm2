import Mock from 'mockjs';
import setupMock from '@/utils/setup-mock';
import { PostData, GetParams } from '@/types/global';
import { ResultType } from '@/types/results';
import qs from 'query-string';

const { Random } = Mock;

function generateResultTypes(pid: number, level: number, tree: boolean) {
  const arr = [];
  const count = Random.integer(7, 24);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < count; i++) {
    const data: ResultType = {
      eid: Number(Random.id()),
      name: Random.cword(3, 7),
      parentId: pid,
      departmentId: Number(Random.id()),
      departmentName: Random.cname(),
      status: 'enable',
      isLeaf: true,
      children: [],
      remark: Random.csentence(6, 15),
    };
    if (tree) {
      data.key = data.eid;
      data.title = data.name;
    }
    if (level < 2) {
      data.children = generateResultTypes(data.eid, level + 1, tree);
      data.isLeaf = false;
    }
    arr.push(data);
  }
  return arr;
}

setupMock({
  setup() {
    Mock.mock(
      new RegExp('/results/resultType/'),
      'get',
      (options: GetParams) => {
        const params = qs.parseUrl(options.url).query;
        let resultTypes;
        if (params.enablePagination === 'true') {
          // <a-table>数据
          resultTypes = generateResultTypes(Number(Random.id()), 1, false);
        } else {
          // <a-tree>数据
          resultTypes = generateResultTypes(Number(Random.id()), 1, true);
        }
        return {
          code: 20000,
          data: {
            list: resultTypes,
            pager: {
              current: 1,
              pageSize: 20,
              total: resultTypes.length,
            },
          },
          message: '',
        };
      }
    );
    Mock.mock(new RegExp('results/resultType'), 'post', (data: PostData) => {
      // eslint-disable-next-line no-console
      console.log('create resultType: ');
      // eslint-disable-next-line no-console
      console.log(data);
      return {
        code: 20000,
        data: {},
        message: '',
      };
    });
    Mock.mock(new RegExp('results/resultType'), 'put', () => {
      return {
        code: 20000,
        data: {},
        message: '',
      };
    });
    Mock.mock(new RegExp('results/resultTable'), 'post', (data: PostData) => {
      // eslint-disable-next-line no-console
      console.log('create resultTable: ');
      // eslint-disable-next-line no-console
      console.log(data);
      return {
        code: 20000,
        data: {},
        message: '',
      };
    });
  },
});
