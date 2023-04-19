import Mock from 'mockjs';
import setupMock from '@/utils/setup-mock';
import { ResultType } from '@/api/results/results';
import { ReqPagerParams, Response } from '@/types/global';

const { Random } = Mock;

function generateResultTypes(pid: number, level: number) {
  const arr = [];
  const count = Random.integer(15, 24);
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
    if (level < 3) {
      data.children = generateResultTypes(data.eid, level + 1);
      data.isLeaf = false;
    }
    arr.push(data);
  }
  return arr;
}

setupMock({
  setup() {
    Mock.mock(new RegExp('/results/resultType'), (params: ReqPagerParams) => {
      const resultTypes = generateResultTypes(Number(Random.id()), 1);
      const response: Response = {
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
      return response;
    });
  },
});
