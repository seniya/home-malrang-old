import { AxiosResponse } from 'axios';
import { axiosInstance } from '../../../utils/axiosInstance';
import { IUserRequest } from './user.interface';

export async function apiSignin(payload: IUserRequest) {
  const response: AxiosResponse = await axiosInstance({
    method: 'POST',
    url: '/authentication/sign-in',
    data: payload,
  });
  if (response.data?.result?.code === 'RS0000') {
    return response.data;
  } else {
    throw new Error(response.data?.result?.message);
  }
}

export async function apiGetUser() {
  const response: AxiosResponse = await axiosInstance({
    method: 'GET',
    url: '/authentication/get-me',
  });
  if (response.data?.result?.code === 'RS0000') {
    return response.data;
  } else {
    throw new Error(response.data?.result?.message);
  }
}
