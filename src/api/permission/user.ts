import axios from "axios";
import {User} from "@/types/permission";
import {Query} from "@/types/global";


class UserApi {

	findUsers(query: Query) {
		return axios.post('/permission/user/list', query)
	}

	createUser(user: User) {
		return axios.post('/permission/user', user);
	}

	updateUser(user: User) {
		return axios.put('/permission/user', user);
	}

	resetPassword(eid: number) {
		return axios.post('/permission/user/resetPassword', eid);
	}

	deleteUser(eid: number) {
		return axios.delete(`/permission/user/${eid}`)
	}
}

export default new UserApi();