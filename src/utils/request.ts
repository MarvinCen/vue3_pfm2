import {Pager, ReqPagerParams, Response, YourPayload} from '@/types/global';
import { simpleErrorHandler } from '@/utils/error-handler';
import useLoading from '@/hooks/loading';
import { AxiosResponse } from 'axios';

const { setLoading } = useLoading(true);
const fetchPageList = async (
  reqPagerParams: ReqPagerParams,
  yourPayload: YourPayload,
  apiMethod: (params: ReqPagerParams) => Promise<AxiosResponse>
) => {
  setLoading(true);
  let response: Response = {
    code: undefined,
    data: undefined,
    message: undefined,
  };
  apiMethod(reqPagerParams)
    .then((res) => {
      response = res as Response;
      console.log(response)
      yourPayload.tableData.list = response.data.list;
      if (yourPayload.pager) {
        yourPayload.pager.current = response.data.pager.current;
        yourPayload.pager.total = response.data.pager.total;
      }
      setLoading(false);
    })
    .catch(() => {
      simpleErrorHandler(response);
      setLoading(false);
    });
};

export async function searchPageList(
  apiFunc: (params?: any) => Promise<AxiosResponse>,
  params?: any,
  pager?: Pager,
  conditions?: any) {

  if (!params) params = {};
  if (typeof params !== 'object') {
    console.log('unsupported params type. a object required, got' + typeof params);
  }

  if (pager) {
    pager.conditions = {
      ...pager.conditions,
      ...conditions
    }
  }

  const promise = await apiFunc()
}

export default fetchPageList;
