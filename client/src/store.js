import { applyMiddleware, createStore, combineReducers } from 'redux';
import { promiseMiddleware } from './middleware';
import auth from './reducers/auth';
import article from './reducers/article';
import common from './reducers/common';
import home from './reducers/home';
import profile from './reducers/profile';
import settings from './reducers/settings';

const defaultState = {
  appName: 'Fit-Goals',
  articles: null
 };

const reducer = combineReducers({
  auth, article, common, home, profile, settings
});

const middleware = applyMiddleware(promiseMiddleware);

const store = createStore(reducer, middleware);

export default store;
