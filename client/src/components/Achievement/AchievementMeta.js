import AchievementActions from './AchievementActions';
import { Link } from 'react-router';
import React from 'react';

const AchievementMeta = props => {
  const achievement = props.achievement;
  return (
    <div className="achievement-meta">
      <Link to={`@${achievement.author.username}`}>
        <img src={achievement.author.image} />
      </Link>

      <div className="info">
        <Link to={`@${achievement.author.username}`} className="author">
          {achievement.author.username}
        </Link>
        <span className="date">
          {new Date(achievement.createdAt).toDateString()}
        </span>
      </div>

      <AchievementActions canModify={props.canModify} achievement={achievement} />
    </div>
  );
};

export default AchievementMeta;
