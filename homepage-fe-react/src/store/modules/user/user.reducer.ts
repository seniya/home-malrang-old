import { combineReducers } from 'redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserState, IUserRequest, IUserResponse } from './user.interface';

const defaultUser = {
  id: null,
  email: '',
  name: '손님',
  lv: 3,
  photo: '',
};

const initialState: IUserState = {
  isLoading: false,
  isDone: false,
  error: null,
  user: defaultUser,
  token: null,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState: initialState as IUserState,
  reducers: {
    SIGN_IN_REQUEST: {
      reducer: (state) => {
        state.isLoading = true;
        state.isDone = false;
      },
      prepare: (reqData: IUserRequest) => ({
        payload: reqData,
      }),
    },
    SIGN_IN_SUCCESS(state, action: PayloadAction<IUserResponse>) {
      const { user, token } = action.payload.data;
      state.isLoading = false;
      state.isDone = true;
      state.error = null;
      state.user = user;
      state.token = token;
    },
    SIGN_IN_FAILURE(state, action: PayloadAction<{ message: string }>) {
      state.isLoading = false;
      state.isDone = false;
      state.error = action.payload.message;
      state.user = defaultUser;
      state.token = null;
    },
    GET_USER_REQUEST: (state) => {
      state.isLoading = true;
      state.isDone = false;
    },
    GET_USER_SUCCESS(state, action: PayloadAction<IUserResponse>) {
      const { user, token } = action.payload.data;
      state.isLoading = false;
      state.isDone = true;
      state.error = null;
      state.user = user;
      state.token = token;
    },
    GET_USER_FAILURE(state, action: PayloadAction<{ message: string }>) {
      state.isLoading = false;
      state.isDone = false;
      state.error = action.payload.message;
      state.user = defaultUser;
      state.token = null;
    },
    SIGN_OUT: (state) => {
      localStorage.removeItem('MALRANG_TOKEN');
      state.isLoading = false;
      state.isDone = false;
      state.error = null;
      state.user = defaultUser;
      state.token = null;
    },
  },
});

const combineReducer = combineReducers({
  userReducer: userSlice.reducer,
});

export const actions = userSlice.actions;
export default combineReducer;
