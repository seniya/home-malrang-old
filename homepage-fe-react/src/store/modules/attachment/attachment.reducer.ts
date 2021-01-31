import { combineReducers } from 'redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IAttachmentState,
  IAttachmentsResponse,
  IAttachmentResponse,
} from './attachment.interface';

const initialState: IAttachmentState = {
  isLoading: false,
  isDone: false,
  error: null,
  attachments: [],
  attachment: undefined,
};

const attachmentSlice = createSlice({
  name: 'attachmentSlice',
  initialState: initialState as IAttachmentState,
  reducers: {
    GET_ATTACHMENTS_REQUEST: (state) => {
      state.isLoading = true;
      state.isDone = false;
    },
    GET_ATTACHMENTS_SUCCESS(state, action: PayloadAction<IAttachmentsResponse>) {
      state.isLoading = false;
      state.isDone = true;
      state.error = null;
      state.attachments = action.payload.data;
    },
    GET_ATTACHMENTS_FAILURE(state, action: PayloadAction<{ message: string }>) {
      state.isLoading = false;
      state.isDone = false;
      state.error = action.payload.message;
      state.attachments = [];
    },
    ADD_ATTACHMENT_REQUEST: {
      reducer: (state) => {
        state.isLoading = true;
        state.isDone = false;
      },
      prepare: (reqData: FormData) => ({
        payload: reqData,
      }),
    },
    ADD_ATTACHMENT_SUCCESS(state, action: PayloadAction<IAttachmentResponse>) {
      state.isLoading = false;
      state.isDone = true;
      state.error = null;
      state.attachments.push(action.payload.data);
    },
    ADD_ATTACHMENT_FAILURE(state, action: PayloadAction<{ message: string }>) {
      state.isLoading = false;
      state.isDone = false;
      state.error = action.payload.message;
    },
    ADD_ATTACHMENT_IMAGE_REQUEST: {
      reducer: (state) => {
        state.isLoading = true;
        state.isDone = false;
      },
      prepare: (reqData: FormData) => ({
        payload: reqData,
      }),
    },
    ADD_ATTACHMENT_IMAGE_SUCCESS(state, action: PayloadAction<IAttachmentResponse>) {
      state.isLoading = false;
      state.isDone = true;
      state.error = null;
      state.attachments.push(action.payload.data);
    },
    ADD_ATTACHMENT_IMAGE_FAILURE(state, action: PayloadAction<{ message: string }>) {
      state.isLoading = false;
      state.isDone = false;
      state.error = action.payload.message;
    },
  },
});

const combineReducer = combineReducers({
  attachmentReducer: attachmentSlice.reducer,
});

export const actions = attachmentSlice.actions;
export default combineReducer;
