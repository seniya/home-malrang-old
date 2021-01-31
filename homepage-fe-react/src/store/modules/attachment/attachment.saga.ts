import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { apiAddAttachment, apiAddImage, apiGetAttachments } from './attachment.api';
import { actions } from './attachment.reducer';

const {
  GET_ATTACHMENTS_REQUEST,
  GET_ATTACHMENTS_SUCCESS,
  GET_ATTACHMENTS_FAILURE,
  ADD_ATTACHMENT_REQUEST,
  ADD_ATTACHMENT_SUCCESS,
  ADD_ATTACHMENT_FAILURE,
  ADD_ATTACHMENT_IMAGE_REQUEST,
  ADD_ATTACHMENT_IMAGE_SUCCESS,
  ADD_ATTACHMENT_IMAGE_FAILURE,
} = actions;

function* getAttachments() {
  try {
    const responseData = yield call(apiGetAttachments);
    yield put({ type: GET_ATTACHMENTS_SUCCESS.type, payload: responseData });
  } catch (e) {
    yield put({ type: GET_ATTACHMENTS_FAILURE.type, payload: e.message });
  }
}

function* watchGetAttachments() {
  yield takeLatest(GET_ATTACHMENTS_REQUEST.type, getAttachments);
}

function* addAttachment(action: PayloadAction<FormData>) {
  try {
    const responseData = yield call(apiAddAttachment, action.payload);
    yield put({ type: ADD_ATTACHMENT_SUCCESS.type, payload: responseData });
  } catch (e) {
    yield put({ type: ADD_ATTACHMENT_FAILURE.type, payload: e.message });
  }
}

function* watchAddAttachments() {
  yield takeLatest(ADD_ATTACHMENT_REQUEST.type, addAttachment);
}

function* addImage(action: PayloadAction<FormData>) {
  try {
    const responseData = yield call(apiAddImage, action.payload);
    yield put({ type: ADD_ATTACHMENT_IMAGE_SUCCESS.type, payload: responseData });
  } catch (e) {
    yield put({ type: ADD_ATTACHMENT_IMAGE_FAILURE.type, payload: e.message });
  }
}

function* watchAddImage() {
  yield takeLatest(ADD_ATTACHMENT_IMAGE_REQUEST.type, addImage);
}

export default function* saga() {
  yield all([fork(watchGetAttachments), fork(watchAddAttachments), fork(watchAddImage)]);
}
