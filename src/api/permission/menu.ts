import axios from "axios";
import {Menu, Permission} from "@/types/permission";
import {Query} from "@/types/global";

class MenuApi {

	async findMenus(query: Query) {
		// return axios.post('/common/permission/menu/list', query)
	}

	async createMenu(menu: Menu) {
		return axios.post('/common/permission/menu', menu)
	}

	async updateMenu(menu: Menu) {
		return axios.put('/common/permission/menu', menu)
	}

	async deleteMenu(eid: number) {
		return axios.delete(`/common/permission/menu/${eid}`)
	}
}

export default new MenuApi();