import axios from 'axios';
import { ReqPagerParams } from '@/types/global';
import { ResultType } from '@/types/results';

export function findResultTypeList(params: ReqPagerParams) {
  return axios.get('/results/resultType/', {
    params,
  });
}

export function findResultTablesBy(resultTypeId: number) {
  return axios.get('/results/resultTable/', {
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
