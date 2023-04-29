import setupMock from "@/utils/setup-mock";
import Mock from "mockjs";
import {GetParams, ReqPagerParams} from "@/types/global";
import qs from "query-string";
import data from './database'

setupMock({
	setup() {
		Mock.mock(
			new RegExp('/basicData/position'),
			'get',
			(options: GetParams) => {
				const params = qs.parseUrl(options.url)
					.query as unknown as ReqPagerParams;
				return {
					code: 20000,
					data: {
						list: data.positions,
						pager: {
							current: 1,
							pageSize: params.pager?.pageSize,
							total: data.positions.length,
						},
					},
					message: '',
				};
			}
		);
	}
})