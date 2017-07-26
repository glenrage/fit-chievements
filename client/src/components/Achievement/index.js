import AchievementMeta from './AchievementMeta';
import CommentContainer from './CommentContainer';
import { Link } from 'react-router';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import marked from 'marked';

const mapStateToProps = state => ({
  ...state.achievement,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: 'ACHIEVEMENT_PAGE_LOADED', payload }),
  onUnload: () =>
    dispatch({ type: 'ACHIEVEMENT_PAGE_UNLOADED' })
});

class Achievement extends React.Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Achievements.get(this.props.params.id),
      agent.Comments.forAchievement(this.props.params.id)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.achievement) {
      return null;
    }

    const markup = { __html: marked(this.props.achievement.body) };
    const canModify = this.props.currentUser &&
      this.props.currentUser.username === this.props.achievement.author.username;
    return (
      <div className="achievement-page">

        <div className="banner">
          <div className="container">

            <h1>{this.props.achievement.title}</h1>
            <AchievementMeta
              achievement={this.props.achievement}
              canModify={canModify} />

          </div>
        </div>

        <div className="container page">

          <div className="row achievement-content">
            <div className="col-xs-12">

              <div dangerouslySetInnerHTML={markup}></div>

              <ul className="tag-list">
                {
                  this.props.achievement.tagList.map(tag => {
                    return (
                      <li
                        className="tag-default tag-pill tag-outline"
                        key={tag}>
                        {tag}
                      </li>
                    );
                  })
                }
              </ul>

            </div>
          </div>

          <hr />

          <div className="achievement-actions">
          </div>

          <div className="row">
            <CommentContainer
                comments={this.props.comments || []}
                errors={this.props.commentErrors}
                slug={this.props.params.id}
                currentUser={this.props.currentUser} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Achievement);
