import { ReqPagerParams, Response, YourPayload } from '@/types/global';
import { simpleErrorHandler } from '@/utils/error-handler';
import useLoading from '@/hooks/loading';
import { AxiosResponse } from 'axios';

const { setLoading } = useLoading(true);
const fetchData = async (
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
      yourPayload.tableData.list = response.data.list;
      yourPayload.pager.current = response.data.pager.current;
      yourPayload.pager.total = response.data.pager.total;
      setLoading(false);
    })
    .catch(() => {
      simpleErrorHandler(response);
      setLoading(false);
    });
};

export default fetchData;
