import {Query} from "@/types/global";
import { RuleVersion } from "@/types/rule";
import axios from "axios";


class RuleVersionApi {

	findRuleVersions(query: Query) {
		return axios.post('/ruleEngine/ruleVersion/list', query);
	}

	createRuleVersion(ruleVersion: RuleVersion) {
		return axios.post('/ruleEngine/ruleVersion', ruleVersion);
	}

	updateRuleVersion(ruleVersion: RuleVersion) {
		return axios.put('/ruleEngine/ruleVersion', ruleVersion);
	}

	deleteRuleVersion(eid: number) {
		return axios.delete(`/ruleEngine/ruleVersion/${eid}`);
	}
}

export default new RuleVersionApi();