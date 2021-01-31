import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { apiGetUser, apiSignin } from './user.api';
import { getUserAction, GET_USER, signInAction, SIGN_IN } from './user.reducer';

function* signin(action: ReturnType<typeof signInAction.request>) {
  try {
    const responseData = yield call(apiSignin, action.payload);
    console.log('signinSaga response: ', responseData);
    yield put({ type: SIGN_IN.SUCCESS, payload: responseData });
    yield put({ type: GET_USER.SUCCESS, payload: responseData });
  } catch (e) {
    yield put({ type: SIGN_IN.FAILURE, payload: e });
  }
}

function* watchSignin() {
  yield takeLatest(SIGN_IN.REQUEST, signin);
}

function* getUserSaga(action: ReturnType<typeof getUserAction.request>) {
  try {
    const responseData = yield call(apiGetUser, action.payload);
    console.log('apiGetUser response: ', responseData);
    yield put({ type: GET_USER.SUCCESS, payload: responseData });
  } catch (e) {
    yield put({ type: GET_USER.FAILURE, payload: e });
  }
}

function* watchGetUser() {
  yield takeLatest(GET_USER.REQUEST, getUserSaga);
}

// export default [takeEvery(SIGN_IN.REQUEST, signinSaga), takeEvery(GET_USER.REQUEST, getUserSaga)];

export default function* saga() {
  yield all([fork(watchSignin), fork(watchGetUser)]);
}
