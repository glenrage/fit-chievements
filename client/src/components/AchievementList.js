import React from 'react';
import AchievementPreview from './AchievementPreview';

const AchievementList = props => {
  if(!props.achievements) {
    return (
      <div className="achievement-preview">Loading...</div>
    );
  }

  if (props.achievements.length === 0) {
    return (
      <div className="achievement-preview">No Achievements here yet...</div>
    )
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
      </div>
  );
};

export default AchievementList;
