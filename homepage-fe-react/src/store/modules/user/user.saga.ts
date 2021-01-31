import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { apiGetUser, apiSignin } from './user.api';
import { actions } from './user.reducer';
import { IUserRequest } from './user.interface';

const {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} = actions;

function* signin(action: PayloadAction<IUserRequest>) {
  try {
    const responseData = yield call(apiSignin, action.payload);
    yield put({ type: SIGN_IN_SUCCESS.type, payload: responseData });
    yield put({ type: GET_USER_SUCCESS.type, payload: responseData });
  } catch (e) {
    yield put({ type: SIGN_IN_FAILURE.type, payload: e.message });
  }
}

function* watchSignin() {
  yield takeLatest(SIGN_IN_REQUEST.type, signin);
}

function* getUserSaga() {
  try {
    const responseData = yield call(apiGetUser);
    yield put({ type: SIGN_IN_SUCCESS.type, payload: responseData });
    yield put({ type: GET_USER_SUCCESS.type, payload: responseData });
  } catch (e) {
    yield put({ type: GET_USER_FAILURE.type, payload: { message: e.message } });
  }
}

function* watchGetUser() {
  yield takeLatest(GET_USER_REQUEST.type, getUserSaga);
}

export default function* saga() {
  yield all([fork(watchSignin), fork(watchGetUser)]);
}
