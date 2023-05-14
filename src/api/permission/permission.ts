import axios from "axios";
import {Menu, Permission} from "@/types/permission";
import {Query} from "@/types/global";


class PermissionApi {

	async findPermissions(query: Query) {
		// return axios.post('/common/permission/permission/list', query)
	}

	async findByRoleId(roleId: number) {
		return axios.get('/common/permission/permission/findByRoleId', {
			params: {
				roleId
			}
		})
	}

	async createPermission(permission: Permission) {
		return axios.post('/common/permission/permission', permission)
	}

	async updatePermission(permission: Permission) {
		return axios.put('/common/permission/permission')
	}

	async deletePermission(eid:number) {
		return axios.delete(`/common/permission/permission/${eid}`)
	}

}

export default new PermissionApi();