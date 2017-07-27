import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);


const API_ROOT = 'http://localhost:3000/api';
// const API_ROOT = 'https://fitchievements-api.herokuapp.com/api';

const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const encode = encodeURIComponent;
const omitSlug = achievement => Object.assign({}, achievement, { slug: undefined });
const Achievements = {
  all: page =>
    requests.get(`/achievements?${limit(10, page)}`),
  byAuthor: (author, page) =>
    requests.get(`/achievements?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag, page) =>
    requests.get(`/achievements?tag=${encode(tag)}&${limit(10, page)}`),
  del: slug =>
    requests.del(`/achievements/${slug}`),
  like: slug =>
    requests.post(`/achievements/${slug}/like`),
  likedBy: (author, page) =>
    requests.get(`/achievements?liked=${encode(author)}&${limit(5, page)}`),
  unlike: slug =>
    requests.del(`/achievements/${slug}/like`),
  feed: () =>
    requests.get('/achievements/feed?limit=10&offset=0'),
  get: slug =>
    requests.get(`/achievements/${slug}`),
  update: achievement =>
    requests.put(`/achievements/${achievement.slug}`, { achievement: omitSlug(achievement) }),
  create: achievement =>
    requests.post('/achievements', { achievement })
};

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  save: user =>
    requests.put('/user', { user })
};

const Comments = {
  create: (slug, comment) =>
    requests.post(`/achievements/${slug}/comments`, { comment }),
  delete: (slug, commentId) =>
    requests.del(`/achievements/${slug}/comments/${commentId}`),
  forAchievement: slug =>
    requests.get(`/achievements/${slug}/comments`)
};

const Profile = {
  follow: username =>
    requests.post(`/profiles/${username}/follow`),
  get: username =>
    requests.get(`/profiles/${username}`),
  unfollow: username =>
    requests.del(`/profiles/${username}/follow`)
};

const Tags = {
  getAll: () => requests.get('/tags')
};

export default {
  Achievements,
  Auth,
  Comments,
  Profile,
  Tags,
  setToken: _token => { token = _token; }
};
