import axios from 'axios';
import Mock from 'mockjs';
import {EvaluationPlan, EvaluationProject} from "@/types/evaluation";
import {Query} from "@/types/global";

// eslint-disable-next-line import/prefer-default-export
export function findEvaluationProjects() {
  const organizationId = Number(Mock.Random.id());
  return axios.get('/evaluation/evaluationProjects', {
    params: {
      organizationId,
    },
  });
}

export function createEvaluationProject(evaluationProject: EvaluationProject) {
  return axios.post('/evaluation/evaluationProject', evaluationProject);
}

export function findEvaEmployees(query: Query) {
  return axios.post('/evaluation/evaluationEmployees', query)
}

export function grabResultData(projectAndPlanDto: ProjectAndPlanDto) {
  return axios.post('/evaluation/evaluationProject/grabResultData', projectAndPlanDto)
}

interface ProjectAndPlanDto {
  project: EvaluationProject;
  plan: EvaluationPlan;
}