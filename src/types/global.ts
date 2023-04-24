import { AxiosResponse } from 'axios';

export interface AnyObject {
  [key: string]: unknown;
}

export interface Options {
  value: unknown;
  label: string;
}

export interface NodeOptions extends Options {
  children?: NodeOptions[];
}

export interface GetParams {
  body: null;
  type: string;
  url: string;
}

export interface PostData {
  body: string;
  type: string;
  url: string;
}

export interface Pager {
  current?: number;
  pageSize?: number;
  total?: number;
}

export type TimeRanger = [string, string];

export interface GeneralChart {
  xAxis: string[];
  data: Array<{ name: string; value: number[] }>;
}

export interface Response {
  code?: number | undefined;
  data?: any | undefined | null;
  message?: string | undefined;
}

export interface ReqPagerParams {
  enablePagination: boolean;
  pager?: Pager;
  conditions: any;
  props?: string[];
}

export interface YourPayload {
  tableData: {
    list: never[];
  };
  pager?: Pager;
}

export const BasePaginationSetting = {
  disabled: false,
  showTotal: true,
  showPageSize: true,
  showJumper: true,
  showMore: false,
  defaultCurrent: 1,
  defaultPageSize: 10,
  pageSizeOptions: [5, 10, 20, 50, 100, 500, 1000],
};
