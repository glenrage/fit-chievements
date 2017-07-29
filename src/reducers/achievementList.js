export default (state = {}, action) => {
  switch (action.type) {

    case 'HOME_PAGE_LOADED':
      return {
        ...state,
        achievements: action.payload[1].achievements,
        achievementsCount: action.payload[1].achievementsCount,
        tab: action.tab,
        currentPage: 0
      };
    case 'HOME_PAGE_UNLOADED':
      return {};
    case 'CHANGE_TAB':
      return {
        ...state,
        achievements: action.payload.achievements,
        achievementsCount: action.payload.achievementsCount,
        tab: action.tab,
        tag: null,
        currentPage: 0
      };
    case 'SET_PAGE':
      return {
        ...state,
        achievements: action.payload.achievements,
        achievementsCount: action.payload.achievementsCount,
        currentPage: action.page
      };
    case 'APPLY_TAG_FILTER':
      return {
        ...state,
        achievements: action.payload.achievements,
        achievementsCount: action.payload.achievementsCount,
        tab: null,
        tag: action.tag,
        currentPage: 0
      };
    case 'PROFILE_PAGE_LOADED':
    case 'PROFILE_LIKES_PAGE_LOADED':
      return {
        ...state,
        achievements: action.payload[1].achievements,
        achievementsCount: action.payload[1].achievementsCount,
        currentPage: 0
      };
    case 'PROFILE_PAGE_UNLOADED':
    case 'PROFILE_LIKES_PAGE_UNLOADED':
      return {};
    case 'ACHIEVEMENT_LIKED':
    case 'ACHIEVEMENT_UNLIKED':
      return {
        ...state,
        achievements: state.achievements.map(achievement => {
          if (achievement.slug === action.payload.achievement.slug) {
            return {
              ...achievement,
              liked: action.payload.liked,
              likesCount: action.payload.achievement.likesCount
            };
          }
          return achievement;
        })
      };
  }

  return state;
};
