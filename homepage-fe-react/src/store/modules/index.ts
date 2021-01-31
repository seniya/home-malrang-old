import { History } from 'history';
import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { connectRouter } from 'connected-react-router';

import employee from './employee';
import attachmentModule from './attachment';
import postModule from './post';
import userModule from './user';

const rootReducer = (history: History) =>
  combineReducers({
    attachment: attachmentModule.reducer,
    user: userModule.reducer,
    post: postModule.reducer,
    employee: employee.reducer,
    router: connectRouter(history),
  });

function* rootSaga() {
  yield all([
    fork(attachmentModule.saga),
    fork(userModule.saga),
    fork(postModule.saga),
    fork(employee.saga),
  ]);
}

export default {
  rootReducer,
  rootSaga,
};
