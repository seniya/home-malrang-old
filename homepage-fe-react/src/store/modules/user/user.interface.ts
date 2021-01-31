export interface IUser {
  id: number | null;
  email: string;
  name: string;
  lv: number | null;
  photo: string;
}

export interface IUserRequest {
  email?: string;
  password?: string;
}

export interface IUserResponse {
  data: {
    user: IUser;
    token: string | null;
  };
  result: {
    code: string | null;
    message: string | null;
  };
}

export interface IUserState {
  isLoading: boolean;
  isDone: boolean;
  error: string | null;
  user: IUser;
  token: string | null;
}
