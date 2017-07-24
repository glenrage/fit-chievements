import React from 'react';

const AchievementPreview = props => {
  const achievement = props.achievement;

  return (
    <div className="achievement-preview">
      <div className="achievement-meta">
        <a>
          <img src={achievement.author.image} />
        </a>

        <div className="info">
          <a className="author">
            {achievement.author.username}
          </a>
        <span className="date">
          {new Date(achievement.createdAt).toDateString()}
        </span>
        </div>

        <div className="pull-xs-right">
          <button
            className="btn btn-sm btn-outline-primary">
            <i className="ion-heart"></i> {achievement.likesCount}
          </button>
        </div>
      </div>

      <a to={`achievement/${achievement.slug}`} className="preview-link">
        <h1>{achievement.title}</h1>
        <p>{achievement.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {
            achievement.tagList.map(tag => {
              return (
                <li className="tag-default tag-pill tag-outline" key={tag}>
                  {tag}
                </li>
              )
            })
          }
          </ul>
        </a>
      </div>
  );
}

export default AchievementPreview;
