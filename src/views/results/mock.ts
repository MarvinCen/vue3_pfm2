import Mock from 'mockjs';
import setupMock from '@/utils/setup-mock';
import { PostData, GetParams } from '@/types/global';
import { ResultTableColumn, ResultType } from '@/types/results';
import qs from 'query-string';
import { rand } from '@vueuse/core';

const { Random } = Mock;
const random = Mock.Random;
const czName = () => {
  return Random.cname();
};

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

interface TableRes {
  columns?: ResultTableColumn[];
  list?: any[];
}
const table: TableRes = {
  columns: [],
  list: [],
};
function columns() {
  const res = [];

  random.extend({
    designateAs(eid) {
      eid = 200001;
      const idx = eid - 20000;
      const position = random.integer(1, 6);
      if (idx + 1 === position) {
        return '负责人';
      }
      const position2 = position + random.integer(2, 4);
      if (idx + 1 === position2) {
        return '参与人';
      }
      return null;
    },
  });
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 12; i++) {
    const column: ResultTableColumn = Mock.mock({
      // @ts-ignore
      'eid|+1': 20000,
      'resultTableId': Number(random.id()),
      'name': random.cname(),
      'componentType': random.pick([
        '文本框',
        '多选框',
        '单选框',
        '数字输入框',
      ]),
      'dataType': random.pick(['文本', '整数', '小数', '金额', '二值']),
      'unique': random.boolean(),
      'nullable': random.boolean(),
      'example': random.csentence(0, 8),
    });
    column.designateAs = random.designateAs(column.eid);
    res.push(column);
  }
  return res;
}

function resultTableData(): any[] {
  // TODO
  const res = [];
  const len = table.columns?.length;
  if (!len || !table.columns) return [];

  const count = random.integer(16, 29);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < count; i++) {
    const data: any = {};

    const rowIdOffset = 30000;
    // eslint-disable-next-line no-plusplus
    for (let j = 0; j < len; j++) {
      const col = table.columns[j];
      data.rowId = rowIdOffset + i;
      if (col.dataType === '文本') {
        data[col.name] = random.csentence(3, 10);
      } else if (col.dataType === '二值') {
        data[col.name] = random.pick(['是', '否']);
      } else {
        data[col.name] = random.float(0, 10);
      }
    }
    res.push(data);
  }
  return res;
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
      return {
        code: 20000,
        data: {},
        message: '',
      };
    });
    Mock.mock(new RegExp('/results/resultTables'), (options: GetParams) => {
      const { resultTypeId } = qs.parseUrl(options.url).query;
      const data = Mock.mock({
        'list|2-3': [
          {
            'eid|+1': 10001,
            'name': '@cname',
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
    Mock.mock(
      new RegExp('results/resultTable/columns'),
      'get',
      (options: GetParams) => {
        const { resultTableId } = qs.parseUrl(options.url).query;
        table.columns = columns();
        return {
          code: 20000,
          data: {
            resultTableId,
            columns: table.columns,
          },
          message: undefined,
        };
      }
    );
    Mock.mock(
      new RegExp('results/cellData/list'),
      'get',
      (options: GetParams) => {
        const { eid } = qs.parseUrl(options.url).query;
        table.list = resultTableData();
        return {
          code: 20000,
          data: {
            eid,
            list: table.list,
          },
          message: undefined,
        };
      }
    );
  },
});
