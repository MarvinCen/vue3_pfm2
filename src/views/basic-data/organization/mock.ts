import Mock from 'mockjs';
import setupMock from '@/utils/setup-mock';
import { GetParams, ReqPagerParams } from '@/types/global';
import qs from 'query-string';
import { Department } from '@/types/basic-data';

const { Random } = Mock;
function generateDepartments(
  pid: number | undefined,
  level: number,
  tree: boolean
) {
  const arr = [];
  const count = Random.integer(2, 4);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < count; i++) {
    const data: Department = {
      eid: Number(Random.id()),
      name: Random.cword(3, 7),
      parentId: pid,
      isLeaf: true,
      children: undefined,
      officePhoneNumber: String(Random.integer(100000, 999999)),
      faxNumber: Random.string('1234567890', 6, 6),
      remark: Random.csentence(6, 15),
    };
    if (tree) {
      data.key = data.eid;
      data.title = data.name;
    }
    if (level < 2) {
      data.children = generateDepartments(data.eid, level + 1, tree);
      data.isLeaf = false;
    }
    arr.push(data);
  }
  return arr;
}

setupMock({
  setup() {
    Mock.mock(
      new RegExp('common/organization/department'),
      'get',
      (options: GetParams) => {
        const params = qs.parseUrl(options.url)
          .query as unknown as ReqPagerParams;
        let departments;
        if (params.enablePagination) {
          // <a-table>数据
          departments = generateDepartments(Number(Random.id()), 1, false);
        } else {
          // <a-tree>数据
          departments = generateDepartments(Number(Random.id()), 1, true);
        }
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
      new RegExp('common/organization/employee'),
      'get',
      (options: GetParams) => {
        const params = qs.parseUrl(options.url)
          .query as unknown as ReqPagerParams;
        Mock.Random.string();
        const data = Mock.mock({
          'list|100-300': [
            {
              'eid|+1': 20000,
              'name': '@cname()',
              'status': '@pick(["就职", "离职"])',
              'remark': '@csentence(3, 5)',
              'jobNumber': '@string("NY1234567890", 5, 5)',
              'birthDate': '@datetime()',
              'email': '@email',
              'linkTel': '@phone',
              'sex': '@pick("男", "女")',
              'hireType': '@pick("普通", "年薪")',
              'psum': '',
              'postSequenceLevel': '@pick("二级", "四级")',
            },
          ],
        });
        const employees = data.list;
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
