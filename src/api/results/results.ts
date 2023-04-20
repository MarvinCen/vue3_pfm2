import axios from 'axios';
import { GetParams, ReqPagerParams } from '@/types/global';
import qs from 'query-string';

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
