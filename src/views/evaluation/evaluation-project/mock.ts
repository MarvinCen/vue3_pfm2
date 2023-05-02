import Mock from 'mockjs';
import setupMock from '@/utils/setup-mock';
import {GetParams, PostData} from '@/types/global';
import qs from 'query-string';
import {Employee} from "@/types/basic-data";
import data from '../database';
import {EvaluationProject} from "@/types/evaluation";

setupMock({
  setup() {
    Mock.mock(
      new RegExp('/evaluation/evaluationProjects'),
      'get',
      (options: GetParams) => {
        const organizationId = qs.parseUrl(options.url)
          .query as unknown as number;
        const list = data.projects;
        list.reverse();
        return {
          code: 20000,
          data: {
            list,
          },
          message: undefined,
        };
      }
    );
    Mock.mock(
      new RegExp('/evaluation/evaluationProject'),
      'post',
      (options: PostData) => {
        const project: EvaluationProject = JSON.parse(options.body).evaluationProject;
        data.projects.push(project);
        return {
          code: 20000,
          data: {}
        };
      }
    )
  },
});
