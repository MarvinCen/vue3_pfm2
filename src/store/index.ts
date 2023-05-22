import { createPinia } from 'pinia';
import useAppStore from './modules/app';
import useUserStore from './modules/user';

import useEmployeeStore from './modules/employee'

const pinia = createPinia();

export { useAppStore, useUserStore, useEmployeeStore };
export default pinia;
