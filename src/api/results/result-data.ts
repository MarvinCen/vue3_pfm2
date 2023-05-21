import {Query} from "@/types/global";
import axios from "axios";


class ResultDataApi {

	public findResultDataBy(query: Query, tableId: number) {
		return axios.post('results/resultData/list', {
			query,
			tableId
		})
	}


}

export default new ResultDataApi();