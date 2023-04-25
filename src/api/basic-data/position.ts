import axios from 'axios';
import Mock from 'mockjs';
import { ReqPagerParams } from '@/types/global';

// eslint-disable-next-line import/prefer-default-export
export function findPositions(reqPagerParams: ReqPagerParams) {
  reqPagerParams.conditions.organizationId = Number(Mock.Random.id());
  return axios.get('/basicData/position', {
    params: {
      reqPagerParams,
    },
  });
}
