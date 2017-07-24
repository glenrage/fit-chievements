import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = "http://localhost:3000/api";

const responseBody = res => res.body;

const requests = {
  get: url =>
    superagent.get(`${API_ROOT}${url}`).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).then(responseBody)

};

const Achievements = {
  all: page =>
    requests.get(`/achievements?limit=10`)
};

const Auth = {
  login: (email, password) =>
    requests.post('/users/login', {user : { email, password } })
}

export default {
  Achievements,
  Auth
};
