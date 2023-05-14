import axios from "axios";
import {Role} from "@/types/permission";
import {Query} from "@/types/global";


class RoleApi {

	findRoles(query: Query) {
		return axios.post('/common/permission/role/list', query)
	}

	createRole(role: Role) {
		return axios.post('/common/permission/role')
	}

	updateRole(role: Role) {
		return axios.put('/common/permission/role')
	}

	deleteRole(eid: number) {
		return axios.delete(`/common/permission/role/${eid}`)
	}

	distributePermissions(roleId:number, permissionIds: number[]) {
		return axios.post('/common/permission/role', {
			roleId,
			permissionIds
		})
	}
}

export default new RoleApi();