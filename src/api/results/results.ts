import axios from 'axios';
import {Pager, ReqPagerParams} from '@/types/global';
import { ResultTable, ResultType } from '@/types/results';

export function findResultTypes(params: ReqPagerParams) {
  return axios.get('/results/resultType/', {
    params,
  });
}

export function findResultTablesBy(resultTypeId: number) {
  return axios.get('/results/resultTables', {
    params: {
      resultTypeId,
    },
  });
}

export function findResultDataListBy(resultTableId: number) {
  return axios.get('results/resultTable/resultData/', {
    // @ts-ignore
    resultTableId,
  });
}

export function createResultType(resultType: ResultType) {
  return axios.post('results/resultType', resultType);
}

export function updateResultType(resultType: ResultType) {
  return axios.put('results/resultType', resultType);
}

export function createResultTable(resultTables: ResultTable[]) {
  return axios.post('results/resultTable', resultTables);
}

export function findResultTableColumns(resultTableId: number) {
  return axios.get('results/resultTable/columns', {
    params: {
      resultTableId,
    },
  });
}

export function findResultTableDataById(eid: number, pager: Pager) {
  return axios.get('results/cellData/list', {
    params: {
      eid,
      pager,
    },
  });
}
