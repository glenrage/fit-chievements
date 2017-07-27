import { applyMiddleware, createStore, combineReducers } from 'redux';
import { promiseMiddleware, localStorageMiddleware } from './middleware';
import achievement from './reducers/achievement';
import achievementList from './reducers/achievementList';
import auth from './reducers/auth';
import common from './reducers/common';
import editor from './reducers/editor';
import home from './reducers/home';
import profile from './reducers/profile';
import settings from './reducers/settings';

const reducer = combineReducers({
  achievement,
  achievementList,
  auth,
  common,
  editor,
  home,
  profile,
  settings
});

const middleware = applyMiddleware(promiseMiddleware, localStorageMiddleware);

const store = createStore(reducer, middleware);

export default store;
