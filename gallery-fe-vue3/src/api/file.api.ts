import { AxiosResponse } from 'axios'
import { axiosInstance } from './axiosInstance'

export async function apiFileUpload (payload: FormData) {
  const response: AxiosResponse = await axiosInstance({
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'POST',
    url: '/file/upload',
    data: payload
  })
  if (response.data?.success === true) {
    return response.data
  } else {
    throw new Error(response.data?.msg)
  }
}
