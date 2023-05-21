import setupMock from "@/utils/setup-mock";
import Mock from "mockjs";
import {PostData, Query} from "@/types/global";
import data from "@/views/evaluation/database"
import MockUtil from "@/utils/mock-util";


setupMock({
	setup() {
		Mock.mock(
			new RegExp('/evaluation/result/list'),
			'post',
			(options: PostData) => {
				const query = JSON.parse(options.body) as Query;
				const results = data.results.slice();

				const list = MockUtil.query(results, query);
				return {
					code: 20000,
					data: {
						list
					}
				}
			}
		)
	}
})