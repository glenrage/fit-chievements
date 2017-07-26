import AchievementPreview from './AchievementPreview';
import ListPagination from './ListPagination';
import React from 'react';

const AchievementList = props => {
  if (!props.achievements) {
    return (
      <div className="achievement-preview">Loading...</div>
    );
  }

  if (props.achievements.length === 0) {
    return (
      <div className="achievement-preview">
        No achievements are here... yet.
      </div>
    );
  }

  return (
    <div>
      {
        props.achievements.map(achievement => {
          return (
            <AchievementPreview achievement={achievement} key={achievement.slug} />
          );
        })
      }

      <ListPagination
        achievementsCount={props.achievementsCount}
        currentPage={props.currentPage}
        onSetPage={props.onSetPage} />
    </div>
  );
};

export default AchievementList;
