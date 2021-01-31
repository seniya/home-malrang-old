import { AxiosResponse } from 'axios';
import { axiosInstance } from '../../../utils/axiosInstance';
import { IAttachmentResponse } from './attachment.interface';

export async function apiGetAttachments() {
  const response: AxiosResponse = await axiosInstance({
    method: 'GET',
    url: '/attachments',
  });
  if (response.data?.result?.code === 'RS0000') {
    return response.data;
  } else {
    throw new Error(response.data?.result?.message);
  }
}

export async function apiAddAttachment(data: FormData) {
  const response: AxiosResponse = await axiosInstance({
    method: 'POST',
    url: '/attachments',
    data,
  });
  if (response.data?.result?.code === 'RS0000') {
    return response.data;
  } else {
    throw new Error(response.data?.result?.message);
  }
}

export async function apiAddImage(data: FormData): Promise<IAttachmentResponse> {
  const response: AxiosResponse = await axiosInstance({
    method: 'POST',
    url: '/attachments/image',
    data,
  });
  if (response.data?.result?.code === 'RS0000') {
    return response.data;
  } else {
    throw new Error(response.data?.result?.message);
  }
}

export async function apiAddFile(data: FormData): Promise<IAttachmentResponse> {
  const response: AxiosResponse = await axiosInstance({
    method: 'POST',
    url: '/attachments/file',
    data,
  });
  if (response.data?.result?.code === 'RS0000') {
    return response.data;
  } else {
    throw new Error(response.data?.result?.message);
  }
}
