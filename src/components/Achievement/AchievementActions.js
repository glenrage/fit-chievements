import { Link } from 'react-router';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload =>
    dispatch({ type: 'DELETE_ACHIEVEMENT', payload })
});

const AchievementActions = props => {
  const achievement = props.achievement;
  const del = () => {
    props.onClickDelete(agent.Achievements.del(achievement.slug))
  };
  if (props.canModify) {
    return (
      <span>

        <Link
          to={`/editor/${achievement.slug}`}
          className="btn btn-outline-secondary btn-sm">
          <i className="ion-edit"></i> Edit Achievement
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a"></i> Delete Achievement
        </button>

      </span>
    );
  }

  return (
    <span>
    </span>
  );
};

export default connect(() => ({}), mapDispatchToProps)(AchievementActions);
