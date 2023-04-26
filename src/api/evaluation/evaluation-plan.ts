import axios from 'axios';
import Mock from 'mockjs';

// eslint-disable-next-line import/prefer-default-export
export function findEvaluationPlans() {
  const organizationId = Number(Mock.Random.id());
  return axios.get('/evaluation/evaluationPlans', {
    params: {
      organizationId,
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
