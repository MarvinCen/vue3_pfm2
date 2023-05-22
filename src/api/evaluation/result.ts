import {Query} from "@/types/global";
import axios from "axios";

class ResultApi {

	findResults(query: Query) {
		return axios.post('/evaluation/result/list', query);
	}

	findDistributionOverall(projectId: number, findAll: boolean, employeeId: number) {
		return axios.get('/evaluation/result/distribution/overall', {
			params: {
				projectId,
				findAll,
				employeeId,
			}
		})
	}

	findDistributionDetail(projectId: number, findAll: boolean, employeeId: number, tableId: number) {
		return axios.get('/evaluation/result/distribution/detail', {
			params: {
				projectId,
				findAll,
				employeeId,
				tableId,
			}
		})
	}
}

export default new ResultApi();
