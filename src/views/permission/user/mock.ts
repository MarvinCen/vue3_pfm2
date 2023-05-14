import Mock from "mockjs";
import setupMock from "@/utils/setup-mock";
import {PostData} from "@/types/global";


const random = Mock.Random;

setupMock({
	setup() {
		Mock.mock(
			new RegExp('/permission/user/resetPassword'),
			'post',
			(options: PostData) => {
				return {
					code: 20000
				}
			}
		);

		Mock.mock(
			new RegExp('/permission/user/\d+'),
			'post',
			(options: PostData) => {
				return {
					code: 20000
				}
			}
		);
	}
})