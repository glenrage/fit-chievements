import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = "http://localhost:3000/api";

const responseBody = res => res.body;

const requests = {
  get: url =>
    superagent.get(`${API_ROOT}${url}`).then(responseBody)
};

const Achievements = {
  all: page =>
    requests.get(`/achievements?limit=10`)
};

export default {
  Achievements
};
