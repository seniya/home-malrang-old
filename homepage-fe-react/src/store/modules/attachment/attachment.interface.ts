import { IUser } from '../user/user.interface';

export interface IAttachment {
  id: string;
  originalname: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
  uploadType: string;
  cntDown: number;
  readAll: boolean;
  useAble: boolean;
  author?: IUser;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  download?: string;
}

export interface IAttachmentsResponse {
  data: IAttachment[];
  result: {
    code: string | null;
    message: string | null;
  };
}

export interface IAttachmentResponse {
  data: IAttachment;
  result: {
    code: string | null;
    message: string | null;
  };
}

export interface IAttachmentState {
  isLoading: boolean;
  isDone: boolean;
  error: string | null;
  attachments: IAttachment[];
  attachment?: IAttachment;
}
