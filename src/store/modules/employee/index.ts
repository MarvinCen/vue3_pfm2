import {defineStore} from "pinia";
import {Employee} from "@/types/basic-data";
import {UserState} from "@/store/modules/user/types";


const useEmployeeStore = defineStore('employee', {
	state: ():Employee => ({
		department: undefined,
		departmentId: undefined,
		userId: undefined,
		userName: undefined,
		user: undefined,
		jobNumber: undefined,
		birthDate: undefined,
		email: undefined,
		linkTel: undefined,
		sex: undefined,
		hireType: undefined,
		positionId: undefined,
		deleted: undefined,
		position: undefined,
	}),

	getters: {
		employeeInfo(state: Employee): Employee {
			return { ...state }
		}
	},

	actions: {
		setInfo(partial: Partial<Employee>) {
			this.$patch(partial);
		},

		resetInfo() {
			this.$reset();
		},
	}
})


export default useEmployeeStore;