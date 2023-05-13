import axios from 'axios';
import Mock from 'mockjs';
import {Query, ReqPagerParams} from '@/types/global';

// eslint-disable-next-line import/prefer-default-export
export function findDepartments(reqPagerParams: ReqPagerParams) {
  reqPagerParams.conditions.organizationId = Number(Mock.Random.id());
  return axios.get('common/organization/department', {
    params: {
      reqPagerParams,
    },
  });
}

export function findEmployees(reqPagerParams: ReqPagerParams) {
  return axios.get('/common/organization/employees', {
    params: {
      reqPagerParams,
    },
  });
}

export function findEmployees2(query: Query) {
  return axios.post('/common/organization/employees', query)
}
