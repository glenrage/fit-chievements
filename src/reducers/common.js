const defaultState = {
  appName: 'Fit-chievements',
  token: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'APP_LOAD':
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : null
      };
    case 'REDIRECT':
      return { ...state, redirectTo: null };
    case 'LOGOUT':
      return { ...state, redirectTo: '/', token: null, currentUser: null };
    case 'ACHIEVEMENT_SUBMITTED':
      const redirectUrl = `achievement/${action.payload.achievement.slug}`;
      return { ...state, redirectTo: redirectUrl };
    case 'SETTINGS_SAVED':
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        currentUser: action.error ? null : action.payload.user
      };
    case 'LOGIN':
    case 'REGISTER':
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user
      };
    case 'DELETE_ACHIEVEMENT':
      return { ...state, redirectTo: '/' };
  }
  return state;
};
