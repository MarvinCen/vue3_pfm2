import setupMock from "@/utils/setup-mock";
import Mock from "mockjs";
import {PostData, Query} from "@/types/global";
import data from '@/views/rule/database'
import MockUtil from "@/utils/mock-util";
import {RuleVersion} from "@/types/rule";

setupMock({
	setup() {
		Mock.mock(
			new RegExp('/ruleEngine/rule/list'),
			'post',
			(options: PostData) => {
				const query: Query = JSON.parse(options.body);
				const list = MockUtil.query(data.rules, query);
				return {
					code: 20000,
					data: {
						list,
					}
				}
			}
		);
		Mock.mock(
			new RegExp('/ruleEngine/ruleVersion/list'),
			'post',
			(options: PostData) => {
				const query: Query = JSON.parse(options.body);
				const list: RuleVersion[] = MockUtil.query(data.ruleVersions, query);
				return {
					code: 20000,
					data: {
						list,
					}
				}
			}
		)
	}
})