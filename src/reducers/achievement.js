

export default (state = {}, action) => {
  switch (action.type) {
    case 'ACHIEVEMENT_PAGE_LOADED':
      return {
        ...state,
        achievement: action.payload[0].achievement,
        comments: action.payload[1].comments
      };
    case 'ACHIEVEMENT_PAGE_UNLOADED':
      return {};
    case 'ADD_COMMENT':
      return {
        ...state,
        commentErrors: action.error ? action.payload.errors : null,
        comments: action.error ?
          null :
          (state.comments || []).concat([action.payload.comment])
      };
    case 'DELETE_COMMENT':
      const commentId = action.commentId
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== commentId)
      };
  }

  return state;
};
