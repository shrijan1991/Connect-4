import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import middleware from './activityMiddleware';
import reducer from './reducer';

const store = createStore(
  reducer,
  applyMiddleware(thunk, middleware));

export default store;
