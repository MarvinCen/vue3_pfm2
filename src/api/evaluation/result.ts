import {Query} from "@/types/global";
import axios from "axios";

class ResultApi {

	findResults(query: Query) {
		return axios.post('/evaluation/result/list', query);
	}
}

export default new ResultApi();