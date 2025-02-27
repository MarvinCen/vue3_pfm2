import axios from 'axios';
import {Pager, Query, ReqPagerParams} from '@/types/global';
import { ResultTable, ResultType } from '@/types/results';

export function findResultTypes(params: ReqPagerParams) {
  return axios.get('/results/resultTypes', {
    params,
  });
}

export function findResultTypes2(query: Query) {
  return axios.post('/results/resultTypes/list', query);
}

export function findResultTablesBy(resultTypeId: number) {
  return axios.get('/results/resultTables', {
    params: {
      resultTypeId,
    },
  });
}

export function findResultTables(query: Query) {
  return axios.post('/results/resultTable/list', query);
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

export function createResultTables(resultTables: ResultTable[]) {
  return axios.post('results/resultTable/batch', resultTables);
}

export function findResultTableColumns(resultTableId: number) {
  return axios.get(`results/resultTable/columns/${resultTableId}`);
}

export function findResultTableDataById(tableId: number, pager: Pager) {
  return axios.get('results/cellData/list', {
    params: {
      tableId,
      pager,
    },
  });
}

export function createResultData(tableId: number, resultData: any) {
  return axios.post('results/cellData', {
    tableId,
    resultData
  });
}
