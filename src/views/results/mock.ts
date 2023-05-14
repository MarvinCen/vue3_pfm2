import Mock from 'mockjs';
import setupMock from '@/utils/setup-mock';
import {PostData, GetParams, Pager, Query} from '@/types/global';
import {Metadata, RColumn, ResultTable, ResultType} from '@/types/results';
import qs from 'query-string';
import data from './database'
import orgData from '@/views/organization/database'
import MockUtil from '@/utils/mock-util'
import commonUtil from '@/utils/common'

const { Random } = Mock;
const random = Mock.Random;
const czName = () => {
  return Random.cname();
};

interface TableRes {
  columns?: RColumn[];
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
        return '负责人姓名';
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
    const column: RColumn = Mock.mock({
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
        data[col.name as string] = random.csentence(3, 10);
      } else if (col.dataType === '二值') {
        data[col.name as string] = random.pick(['是', '否']);
      } else {
        data[col.name as string] = random.float(0, 10);
      }
    }
    res.push(data);
  }
  return res;
}

setupMock({
  setup() {
    Mock.mock(
      new RegExp('/results/resultTypes'),
      'get',
      (options: GetParams) => {
        const params = qs.parseUrl(options.url).query;

        let resultTypes = data.resultTypes;
        resultTypes.forEach(rt => {
          rt.children = undefined
        })
        resultTypes = commonUtil.treeify(resultTypes);
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
    Mock.mock(
      new RegExp('/results/resultTypes'),
      'post',
      (options: PostData) => {
        const query = JSON.parse(options.body) as Query;
        const ls = data.resultTypes;
        const res = MockUtil.query(ls, query) as ResultType[];

        if (query.withs?.includes('resultTables')) {
          res.forEach(rt => {
            rt.resultTables = data.resultTables.filter(table => {
              return table.resultTypeId === rt.eid;
            })
          })
        }

        return {
          code: 20000,
          data: {
            list: res,
            pager: query.pager,
          }
        };
      }
    );
    Mock.mock(
      new RegExp('results/resultType'),
      'post',
      (options: PostData) => {
        const resultType: ResultType = JSON.parse(options.body);
        const department = orgData.departments.filter(d => d.eid === resultType.departmentId)[0];
        resultType.departmentName = department.name;
        resultType.department = department;
        resultType.eid = random.increment();

        const rts = data.resultTypes;
        const parentId = resultType.parentId;
        data.resultTypes.push(resultType)
        return {
          code: 20000,
          data: {
            eid: resultType.eid
          },
          message: '',
        };
      }
    );
    Mock.mock(new RegExp('results/resultType'), 'put', () => {
      return {
        code: 20000,
        data: {},
        message: '',
      };
    });
    Mock.mock(
      new RegExp('results/resultTable/list'),
      'post',
      (options: PostData) => {
        const rts = JSON.parse(options.body) as ResultTable[];
        rts.forEach(rt => {
          rt.eid = random.increment();
          rt.columns = rt.columns || [];
          rt.columns.forEach(col => col.resultTableId = rt.eid);
          data.rColumns.push(...rt.columns);
        })

        data.resultTables.push(...rts);
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
            rColumns: table.columns,
          },
          message: undefined,
        };
      }
    );
    Mock.mock(
      new RegExp('results/cellData/list'),
      'get',
      (options: GetParams) => {
        const params = qs.parseUrl(options.url).query;
        const pager = JSON.parse(params.pager as string);
        const eid = Number(params.eid);

        let ls = data.resultTableData['t' + eid]?.slice();
        ls = ls || [];
        ls.forEach(item => {
          item.metadata = data.metadata.filter((md: any) => item.metadataId === md.eid)[0];
        })
        ls = MockUtil.query(ls, {
          pager,
        })

        return {
          code: 20000,
          data: {
            eid,
            list: ls.reverse(),
            pager: {
              current: pager.current,
              pageSize: pager.pageSize,
              total: ls.length,
            }
          },
          message: undefined,
        };
      }
    );
    Mock.mock(
      new RegExp('results/cellData'),
      'post',
      (options: PostData) => {
        const body: any = JSON.parse(options.body);
        const resultData = body.resultData;
        const tableId = body.tableId;
        const metadata = resultData.metadata as Metadata;
        metadata.eid = random.increment();

        data.metadata.push(metadata);
        resultData.metadataId = metadata.eid;
        data.resultTableData['t' + tableId] =
          data.resultTableData['t' + tableId] || [];
        data.resultTableData['t' + tableId].push(resultData);
        return {
          code: 20000,
          data: {},
          message: '',
        }
      }
    );
  },
});
