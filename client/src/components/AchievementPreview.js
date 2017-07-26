import React from 'react';
import { Link } from 'react-router';
import agent from '../agent';
import { connect } from 'react-redux';
// import { ACHIEVEMENT_FAVORITED, ACHIEVEMENT_UNFAVORITED } from '../constants/actionTypes';

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

const mapDispatchToProps = dispatch => ({
  favorite: slug => dispatch({
    type: 'ACHIEVEMENT_FAVORITED',
    payload: agent.Achievements.favorite(slug)
  }),
  unfavorite: slug => dispatch({
    type: 'ACHIEVEMENT_UNFAVORITED',
    payload: agent.Achievements.unfavorite(slug)
  })
});

const AchievementPreview = props => {
  const achievement = props.achievement;
  const favoriteButtonClass = achievement.favorited ?
   FAVORITED_CLASS :
   NOT_FAVORITED_CLASS;


  const handleClick = ev => {
    ev.preventDefault();
    if (achievement.favorited) {
      props.unfavorite(achievement.slug);
    } else {
      props.favorite(achievement.slug);
    }
  };

  return (
    <div className="achievement-preview">
      <div className="achievement-meta">
        <Link to={`@${achievement.author.username}`}>
          <img src={achievement.author.image} alt={achievement.author.username} />
        </Link>

        <div className="info">
          <Link className="author" to={`@${achievement.author.username}`}>
            {achievement.author.username}
          </Link>
          <span className="date">
            {new Date(achievement.createdAt).toDateString()}
          </span>
        </div>

        <div className="pull-xs-right">
          <button className={favoriteButtonClass} onClick={handleClick}>
            <i className="ion-heart"></i> {achievement.favoritesCount}
          </button>
        </div>
      </div>

      <Link to={`achievement/${achievement.slug}`} className="preview-link">
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
      </Link>
    </div>
  );
}

export default connect(() => ({}), mapDispatchToProps)(AchievementPreview);
