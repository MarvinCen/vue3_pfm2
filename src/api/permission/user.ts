import axios from "axios";
import {User} from "@/types/permission";
import {Query} from "@/types/global";


class UserApi {

	async findUsers(query: Query) {
		return axios.post('/permission/user/list', query)
	}

	async createUser(user: User) {
		return axios.post('/permission/user', user);
	}

	async updateUser(user: User) {
		return axios.put('/permission/user', user);
	}

	async resetPassword() {
		return axios.post('/permission/user/resetPassword');
	}

	async deleteUser(eid: number) {
		return axios.delete(`/permission/user/${eid}`)
	}
}

export default new UserApi();