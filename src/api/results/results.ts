import axios from 'axios';
import { ReqPagerParams } from '@/types/global';

export interface ResultType {
  eid: number;
  parentId: number;
  name: string;
  departmentId: number;
  departmentName: string;
  isLeaf: boolean;
  status: 'enable' | 'disable';
  children: ResultType[];
  remark: string;
}

export function findResultTypeList(params: ReqPagerParams) {
  return axios.get('/results/resultType/', {
    params,
  });
}
