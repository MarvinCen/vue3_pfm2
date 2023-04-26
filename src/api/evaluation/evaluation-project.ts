import axios from 'axios';
import Mock from 'mockjs';

// eslint-disable-next-line import/prefer-default-export
export function findEvaluationProjects() {
  const organizationId = Number(Mock.Random.id());
  return axios.get('/evaluation/evaluationProjects', {
    params: {
      organizationId,
    },
  });
}
