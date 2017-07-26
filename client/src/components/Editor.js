import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  ...state.editor
});

const mapDispatchToProps = dispatch => ({
  onAddTag: () =>
    dispatch({ type: 'ADD_TAG' }),
  onLoad: payload =>
    dispatch({ type: 'EDITOR_PAGE_LOADED', payload }),
  onRemoveTag: tag =>
    dispatch({ type: 'REMOVE_TAG', tag }),
  onSubmit: payload =>
    dispatch({ type: 'ARTICLE_SUBMITTED', payload }),
  onUnload: payload =>
    dispatch({ type: 'EDITOR_PAGE_UNLOADED' }),
  onUpdateField: (key, value) =>
    dispatch({ type: 'UPDATE_FIELD_EDITOR', key, value })
});

class Editor extends React.Component {
  constructor() {
    super();

    const updateFieldEvent =
      key => ev => this.props.onUpdateField(key, ev.target.value);
    this.changeTitle = updateFieldEvent('title');
    this.changeDescription = updateFieldEvent('description');
    this.changeBody = updateFieldEvent('body');
    this.changeTagInput - updateFieldEvent('tagInput');

    // When inputting tags, hitting enter adds a tag to the list
    this.watchForEnter = ev => {
      if (ev.keyCode === 13) {
        ev.preventDefault();
        this.props.onAddTag();
      }
    };

    this.removeTagHandler = tag => () => {
      this.props.onRemoveTag(tag);
    };

    //When submitting form, the object must be correctly formatted.
    //If there is a slug, update article, else, create a new one.

    this.submitForm = ev => {
      ev.preventDefault();
      const article = {
        title: this.props.title,
        description: this.props.description,
        body: this.props.body,
        tagList: this.props.tagList
      };
    }
  }
}
