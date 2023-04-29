import axios from 'axios';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  identification: string;
  password: string;
  loginType: number;
}

export interface LoginRes {
  token: string;
}
export function login(data: LoginData) {
  console.log(data)
  return axios.post<LoginRes>('/common/login/username', data, {
    headers: {
      ContentType: 'application/x-www-form-urlencoded'
    }
  });
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
  return axios.post<UserState>('/api/user/info');
}
