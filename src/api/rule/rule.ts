import axios from "axios";
import {Query} from "@/types/global";
import {Rule} from "@/types/rule";


class RuleApi {

	findRules(query:Query) {
		return axios.post('/ruleEngine/rule/list', query);
	}

	createRule(rule: Rule) {
		return axios.post('/ruleEngine/rule', rule);
	}

	updateRule(rule: Rule) {
		return axios.put('/ruleEngine/rule', rule);
	}

	deleteRule(eid:number) {
		return axios.delete(`/ruleEngine/rule/${eid}`);
	}
}

export default new RuleApi();