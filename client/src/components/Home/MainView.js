import AchievementList from '../AchievementList';
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  achievements: state.achievements
})

const MainView = props => {
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <li className="nav-item">
            <a
              href=""
              className="nav-link active">
              Global Feed
            </a>
          </li>
        </ul>
      </div>
      <AchievementList
        achievements={props.achievements}
      />
    </div>
  );
};

export default connect(mapStateToProps, () => ({}))(MainView)
