import { combineReducers } from 'redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPostState, IPostsResponse, IPostResponse, IPostRequest } from './post.interface';

const initialState: IPostState = {
  isLoadingReadPosts: false,
  isDoneReadPosts: false,
  errorReadPosts: null,
  posts: [],

  isLoadingReadPost: false,
  isDoneReadPost: false,
  errorReadPost: null,
  post: undefined,

  isLoadingAddPost: false,
  isDoneAddPost: false,
  errorAddPost: null,

  isLoadingUpdatePost: false,
  isDoneUpdatePost: false,
  errorUpdatePost: null,

  isLoadingRemovePost: false,
  isDoneRemovePost: false,
  errorRemovePost: null,
};

const postSlice = createSlice({
  name: 'postSlice',
  initialState: initialState as IPostState,
  reducers: {
    READ_POSTS_REQUEST: (state) => {
      state.isLoadingReadPosts = true;
      state.isDoneReadPosts = false;
    },
    READ_POSTS_SUCCESS(state, action: PayloadAction<IPostsResponse>) {
      state.isLoadingReadPosts = false;
      state.isDoneReadPosts = true;
      state.errorReadPosts = null;
      state.posts = action.payload.data;
    },
    READ_POSTS_FAILURE(state, action: PayloadAction<{ message: string }>) {
      state.isLoadingReadPosts = false;
      state.isDoneReadPosts = false;
      state.errorReadPosts = action.payload.message;
      state.posts = [];
    },
    READ_POSTS_RESET(state) {
      state.isLoadingReadPosts = false;
      state.isDoneReadPosts = false;
      state.errorReadPosts = null;
    },

    READ_POST_REQUEST: {
      reducer: (state) => {
        state.isLoadingReadPost = true;
        state.isDoneReadPost = false;
      },
      prepare: (id: string) => ({
        payload: id,
      }),
    },
    READ_POST_SUCCESS(state, action: PayloadAction<IPostResponse>) {
      state.isLoadingReadPost = false;
      state.isDoneReadPost = true;
      state.errorReadPost = null;
      state.post = action.payload.data;
    },
    READ_POST_FAILURE(state, action: PayloadAction<{ message: string }>) {
      state.isLoadingReadPost = false;
      state.isDoneReadPost = false;
      state.errorReadPost = action.payload.message;
      state.post = undefined;
    },

    READ_POST_RESET(state) {
      state.isLoadingReadPost = false;
      state.isDoneReadPost = false;
      state.errorReadPost = null;
    },

    ADD_POST_REQUEST: {
      reducer: (state) => {
        state.isLoadingAddPost = true;
        state.isDoneAddPost = false;
      },
      prepare: (reqData: IPostRequest) => ({
        payload: reqData,
      }),
    },
    ADD_POST_SUCCESS(state, action: PayloadAction<IPostResponse>) {
      state.isLoadingAddPost = false;
      state.isDoneAddPost = true;
      state.errorAddPost = null;
      state.posts.push(action.payload.data);
    },
    ADD_POST_FAILURE(state, action: PayloadAction<{ message: string }>) {
      state.isLoadingAddPost = false;
      state.isDoneAddPost = false;
      state.errorAddPost = action.payload.message;
    },
    ADD_POST_RESET(state) {
      state.isLoadingAddPost = false;
      state.isDoneAddPost = false;
      state.errorAddPost = null;
      state.post = undefined;
    },

    UPDATE_POST_REQUEST: {
      reducer: (state) => {
        state.isLoadingUpdatePost = true;
        state.isDoneUpdatePost = false;
      },
      prepare: (reqData: IPostRequest) => ({
        payload: reqData,
      }),
    },
    UPDATE_POST_SUCCESS(state, action: PayloadAction<IPostResponse>) {
      state.isLoadingUpdatePost = false;
      state.isDoneUpdatePost = true;
      state.errorUpdatePost = null;
      // TODO: state에서 해당 객체 내용 교체
    },
    UPDATE_POST_FAILURE(state, action: PayloadAction<{ message: string }>) {
      state.isLoadingUpdatePost = false;
      state.isDoneUpdatePost = false;
      state.errorUpdatePost = action.payload.message;
    },
    UPDATE_POST_RESET(state) {
      state.isLoadingUpdatePost = false;
      state.isDoneUpdatePost = false;
      state.errorUpdatePost = null;
      state.post = undefined;
    },

    REMOVE_POST_REQUEST: {
      reducer: (state) => {
        state.isLoadingRemovePost = true;
        state.isDoneRemovePost = false;
      },
      prepare: (id: string) => ({
        payload: id,
      }),
    },
    REMOVE_POST_SUCCESS(state) {
      state.isLoadingRemovePost = false;
      state.isDoneRemovePost = true;
      state.errorRemovePost = null;
      state.post = undefined;
    },
    REMOVE_POST_FAILURE(state, action: PayloadAction<{ message: string }>) {
      state.isLoadingRemovePost = false;
      state.isDoneRemovePost = false;
      state.errorRemovePost = action.payload.message;
    },
    REMOVE_POST_RESET(state) {
      state.isLoadingRemovePost = false;
      state.isDoneRemovePost = false;
      state.errorRemovePost = null;
      state.post = undefined;
    },
  },
});

const combineReducer = combineReducers({
  postReducer: postSlice.reducer,
});

export const actions = postSlice.actions;
export default combineReducer;
