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
    Mock.mock(
      new RegExp('/basicData/position'),
      'get',
      (options: GetParams) => {
        const params = qs.parseUrl(options.url)
          .query as unknown as ReqPagerParams;
        const data = Mock.mock({
          'list|100-300': [
            {
              'eid|+1': 20000,
              'name': '@pick(["教师", "研究员", "实验员", "工程师"])',
              'positionLevel': '@pick(["正高级", "副高级", "中级", "初级"])',
              'professionalTitle':
                '@pick(["教授", "讲师", "助教", "研究员", "助理研究员", "高级工程师"])',
              'positionGrade': '@pick(["十级", "九级", "四级", "六级"])',
              'remark': '@csentence',
            },
          ],
        });
        return {
          code: 20000,
          data: {
            list: data.list,
            pager: {
              current: 1,
              pageSize: params.pager?.pageSize,
              total: data.list.length,
            },
          },
          message: '',
        };
      }
    );
    Mock.mock(new RegExp('/common/organization/employee'), 'get', (options: GetParams) => {
      const employees = Mock.mock({
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
          list: employees.list,
        },
        message: undefined,
      }
    });
  },
});
