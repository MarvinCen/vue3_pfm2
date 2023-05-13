import setupMock from '@/utils/setup-mock';
import Mock from 'mockjs';
import qs from 'query-string';
import {DeleteParams, GetParams, PostData, PutParams, Query, ReqPagerParams} from '@/types/global';
import {EvaluationPlan, Indicator} from "@/types/evaluation";
import data from '../database'
import moment from "moment";
import mockUtil from "@/utils/mock-util";

setupMock({
  setup() {
    Mock.mock(
      new RegExp('/evaluation/evaluationPlans'),
      'get',
      (options: GetParams) => {
        // @ts-ignore
        const params = qs.parseUrl(options.url).query as unknown as ReqPagerParams;
        const list: EvaluationPlan[] = data.plans;
        list.reverse();
        params.pager = params.pager ? params.pager : { current: 1, pageSize: 10 };
        params.pager.total = list.length;
        return {
          code: 20000,
          data: {
            list: list,
            pager: params.pager,
          },
          message: undefined,
        };
      }
    );
    Mock.mock(
      new RegExp('/evaluation/evaluationPlans'),
      'post',
      (options: PostData) => {
        const query = JSON.parse(options.body) as Query;
        const res = mockUtil.query(data.plans.slice(), query) as EvaluationPlan[];

        return {
          code: 20000,
          data: {
            list: res
          }
        }
      }
    );
    Mock.mock(
      new RegExp('/evaluation/evaluationPlan'),
      'post',
      (options: PostData) => {
        const body = JSON.parse(options.body);
        const plan: EvaluationPlan = body.evaluationPlan;

        plan.eid = Mock.Random.increment();
        const date = new Date();
        plan.createDatetime = moment(date).format('YYYY-MM-DD HH:mm:ss');
        plan.updateDatetime = moment(date).format('YYYY-MM-DD HH:mm:ss');
        data.plans.push(plan);
        return {
          code: 20000,
          data: {
            planId: plan.eid
          }
        };
      }
    );
    Mock.mock(
      new RegExp('/evaluation/evaluationPlan'),
      'put',
      (options: PutParams) => {
        const body = JSON.parse(options.body);
        const plan: EvaluationPlan = body.evaluationPlan;
        const plans = data.plans;
        for (let i = 0; i < plans.length; i++) {
          if (plans[i].eid === plan.eid) { plans[i] = { ...plan } }
        }
        return {
          code: 20000,
          data: {}
        };
      }
    );
    Mock.mock(
      new RegExp('/evaluation/evaluationPlan/[0-9]+'),
      'delete',
      (options: DeleteParams) => {
        const url = options.url;
        const idx= url.indexOf('/evaluation/evaluationPlan/')

        let eids = url.substring(idx).match('[0-9]+');
        const eid = eids? Number(eids[0]) : 0;

        const index = data.plans.findIndex((plan) => {
          return plan.eid === eid;
        })

        if (Mock.Random.integer(1,10) > 5){
          data.plans.splice(index, 1);
          return {
            code: 20000,
            data: {}
          };
        }
        else {
          return {
            code: 30500,
            data: {},
            message: '删除失败：与之关联的考核项目还未结束！'
          };
        }

      }
    );
    Mock.mock(
      new RegExp('/evaluation/indicator'),
      'post',
      (options: PutParams) => {
        const body = JSON.parse(options.body);

        const indicator: Indicator = body.indicator;
        indicator.eid = Mock.Random.increment();

        data.indicators.push(indicator);
        return {
          code: 20000,
          data: {}
        };
      }
    );
    Mock.mock(
      new RegExp('/evaluation/indicator'),
      'get',
      (options: GetParams) => {
        const query = qs.parseUrl(options.url).query;
        const planId = JSON.parse(query.planId as string);

        const indicators = data.indicators.filter((idt) => {
          return idt.evaluationPlanId === planId;
        });

        return {
          code: 20000,
          data: {
            list: indicators
          }
        }
      }
    );
  },
});
