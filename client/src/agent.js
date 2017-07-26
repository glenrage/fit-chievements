import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

// const API_ROOT = "http://localhost:3000/api";
const API_ROOT = " https://conduit.productionready.io/api";

const responseBody = res => res.body;

const requests = {
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)

};

const articles = {
  all: page =>
    requests.get(`/articles?limit=10`),
  get: slug =>
    requests.get(`/articles/${slug}`)
};

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', {user : { email, password } }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  save: user =>
    requests.put('/user', { user })
}

const Comments = {
  forarticle: slug =>
    requests.get(`/articles/${slug}/comments`)
}

let token = null;
let tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

export default {
  articles,
  Auth,
  Comments,
  setToken: _token => { token = _token; }
};
