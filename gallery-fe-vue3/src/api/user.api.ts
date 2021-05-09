import { AxiosResponse } from 'axios'
import { axiosInstance } from './axiosInstance'
import { IUserRequest } from './user.interface'

export async function apiSignin (payload: IUserRequest) {
  const response: AxiosResponse = await axiosInstance({
    method: 'POST',
    url: '/sign/in',
    data: payload
  })
  if (response.data?.success === true) {
    return response.data
  } else {
    throw new Error(response.data?.msg)
  }
}

export async function apiGetUser () {
  const response: AxiosResponse = await axiosInstance({
    method: 'GET',
    url: '/member/get-me'
  })
  console.log('response.data: ', response.data)
  if (response.data?.success === true) {
    return response.data
  } else {
    throw new Error(response.data?.msg)
  }
}
