import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { apiAddPost, apiGetPost, apiGetPosts, apiRemovePost, apiUpdatePost } from './post.api';
import { IPostRequest } from './post.interface';
import { actions } from './post.reducer';

const {
  READ_POSTS_REQUEST,
  READ_POSTS_SUCCESS,
  READ_POSTS_FAILURE,
  READ_POST_REQUEST,
  READ_POST_SUCCESS,
  READ_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
} = actions;

function* getPosts() {
  try {
    const responseData = yield call(apiGetPosts);
    yield put({ type: READ_POSTS_SUCCESS.type, payload: responseData });
  } catch (e) {
    yield put({ type: READ_POSTS_FAILURE.type, payload: e.message });
  }
}

function* watchGetPosts() {
  yield takeLatest(READ_POSTS_REQUEST.type, getPosts);
}

function* getPost(action: PayloadAction<string>) {
  try {
    const responseData = yield call(apiGetPost, action.payload);
    yield put({ type: READ_POST_SUCCESS.type, payload: responseData });
  } catch (e) {
    yield put({ type: READ_POST_FAILURE.type, payload: e.message });
  }
}

function* watchGetPost() {
  yield takeLatest(READ_POST_REQUEST.type, getPost);
}

function* addPost(action: PayloadAction<IPostRequest>) {
  try {
    const responseData = yield call(apiAddPost, action.payload);
    yield put({ type: ADD_POST_SUCCESS.type, payload: responseData });
  } catch (e) {
    yield put({ type: ADD_POST_FAILURE.type, payload: e.message });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST.type, addPost);
}

function* updatePost(action: PayloadAction<IPostRequest>) {
  try {
    const responseData = yield call(apiUpdatePost, action.payload);
    yield put({ type: UPDATE_POST_SUCCESS.type, payload: responseData });
  } catch (e) {
    yield put({ type: UPDATE_POST_FAILURE.type, payload: e.message });
  }
}

function* watchupdatePost() {
  yield takeLatest(UPDATE_POST_REQUEST.type, updatePost);
}

function* removePost(action: PayloadAction<string>) {
  try {
    const responseData = yield call(apiRemovePost, action.payload);
    yield put({ type: REMOVE_POST_SUCCESS.type, payload: responseData });
  } catch (e) {
    yield put({ type: REMOVE_POST_FAILURE.type, payload: e.message });
  }
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST.type, removePost);
}

export default function* saga() {
  yield all([
    fork(watchGetPosts),
    fork(watchGetPost),
    fork(watchAddPost),
    fork(watchupdatePost),
    fork(watchRemovePost),
  ]);
}
