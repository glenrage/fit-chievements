import React from 'react';
import { Link } from 'react-router';
import agent from '../agent';
import { connect } from 'react-redux';
// import { ACHIEVEMENT_LIKED, ACHIEVEMENT_UNLIKED } from '../constants/actionTypes';

const LIKED_CLASS = 'btn btn-sm btn-primary';
const NOT_LIKED_CLASS = 'btn btn-sm btn-outline-primary';

const mapDispatchToProps = dispatch => ({
  like: slug => dispatch({
    type: 'ACHIEVEMENT_LIKED',
    payload: agent.Achievements.like(slug)
  }),
  unlike: slug => dispatch({
    type: 'ACHIEVEMENT_UNLIKED',
    payload: agent.Achievements.unlike(slug)
  })
});

const AchievementPreview = props => {
  const achievement = props.achievement;
  const likeButtonClass = achievement.liked ?
   LIKED_CLASS :
   NOT_LIKED_CLASS;


  const handleClick = ev => {
    ev.preventDefault();
    if (achievement.liked) {
      props.unlike(achievement.slug);
    } else {
      props.like(achievement.slug);
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
          <button className={likeButtonClass} onClick={handleClick}>
            <i className="ion-thumbsup"></i> {achievement.likesCount}
          </button>
        </div>
      </div>

      <Link to={`achievement/${achievement.slug}`} className="preview-link">
        <h1>{achievement.title}</h1>
        <p>{achievement.description}</p>
        <div className="image-preview">
          <img src={achievement.photo}/>
        </div>

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
