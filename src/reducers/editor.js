export default (state = {}, action) => {
  switch (action.type) {
    case 'EDITOR_PAGE_LOADED':
      return {
        ...state,
        achievementSlug: action.payload ? action.payload.achievement.slug : '',
        title: action.payload ? action.payload.achievement.title : '',
        description: action.payload ? action.payload.achievement.description : '',
        body: action.payload ? action.payload.achievement.body : '',
        tagInput: '',
        tagList: action.payload ? action.payload.achievement.tagList : [],
        photo: action.payload ? action.payload.achievement.photo : '',
      };
    case 'EDITOR_PAGE_UNLOADED':
      return {};
    case 'ACHIEVEMENT_SUBMITTED':
      return {
        ...state,
        inProgress: null,
        errors: action.error ? action.payload.errors : null
      };
    case 'ASYNC_START':
      if (action.subtype === 'ACHIEVEMENT_SUBMITTED') {
        return { ...state, inProgress: true };
      }
      break;
    case 'ADD_TAG':
      return {
        ...state,
        tagList: state.tagList.concat([state.tagInput]),
        tagInput: ''
      };
    case 'REMOVE_TAG':
      return {
        ...state,
        tagList: state.tagList.filter(tag => tag !== action.tag)
      };
    case 'UPDATE_FIELD_EDITOR':
      return { ...state, [action.key]: action.value };
  }

  return state;
};
