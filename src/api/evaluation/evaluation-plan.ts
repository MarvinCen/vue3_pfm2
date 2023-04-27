import axios from 'axios';
import Mock from 'mockjs';
import {ReqPagerParams} from "@/types/global";

// eslint-disable-next-line import/prefer-default-export
export function findEvaluationPlans(reqPagerParams: ReqPagerParams) {
  reqPagerParams.conditions = reqPagerParams.conditions ? reqPagerParams.conditions : {};
  reqPagerParams.conditions.organizationId = Number(Mock.Random.id());
  return axios.get('/evaluation/evaluationPlans', {
    params: {
      reqPagerParams,
    },
  });
}

export function findEmployeeByPlanFilter(positions: string[], professionalTitle: string[]) {
  return axios.get('/common/organization/employee', {
    params: {
      positions,
      professionalTitle,
    }
  })
}
