'use strict';

export default (state = {}, action) => {
  switch (action.type) {
    case 'article_PAGE_LOADED':
      return {
        ...state,
        article: action.payload[0].article,
        comments: action.payload[1].comments
      };
      break;
    case 'article_PAGE_UNLOADED':
      return {};
  }

  return state;
}
