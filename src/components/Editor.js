import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import request from 'superagent';
import Dropzone from 'react-dropzone';
import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL } from '../constants/api.js'

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
    dispatch({ type: 'ACHIEVEMENT_SUBMITTED', payload }),
  onUnload: payload =>
    dispatch({ type: 'EDITOR_PAGE_UNLOADED' }),
  onUpdateField: (key, value) =>
    dispatch({ type: 'UPDATE_FIELD_EDITOR', key, value })
});

class Editor extends React.Component {
  constructor() {
    super();

    this.state = {
      uploadedFileCloudinaryUrl: ''
    };

    const updateFieldEvent =
      key => ev => this.props.onUpdateField(key, ev.target.value);
    this.changeTitle = updateFieldEvent('title');
    this.changeDescription = updateFieldEvent('description');
    this.changeBody = updateFieldEvent('body');
    this.changeTagInput = updateFieldEvent('tagInput');

    this.watchForEnter = ev => {
      if (ev.keyCode === 13) {
        ev.preventDefault();
        this.props.onAddTag();
      }
    };

    this.removeTagHandler = tag => () => {
      this.props.onRemoveTag(tag);
    };

    this.submitForm = ev => {
      ev.preventDefault();
      const achievement = {
        title: this.props.title,
        description: this.props.description,
        body: this.props.body,
        tagList: this.props.tagList,
        photo: this.state.uploadedFileCloudinaryUrl
      };


      const slug = { slug: this.props.achievementSlug };
      const promise = this.props.achievementSlug ?
        agent.Achievements.update(Object.assign(achievement, slug)) :
        agent.Achievements.create(achievement);

      this.props.onSubmit(promise);
    }

    this.onImageDrop = files => {
      this.handleImageUpload(files[0])
    }

    this.handleImageUpload = file => {
      let upload = request.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

      upload.end((err, response) => {
        if (err) {
          console.error(err);
        }

        if(response.body.secure_url) {
          this.setState({
            uploadedFileCloudinaryUrl: response.body.secure_url
          });
        }
      })
    }

  };
  componentWillReceiveProps(nextProps) {
    if (this.props.params.slug !== nextProps.params.slug) {
      if (nextProps.params.slug) {
        this.props.onUnload();
        return this.props.onLoad(agent.Achievements.get(this.props.params.slug));
      }
      this.props.onLoad(null);
    }
  }

  componentWillMount() {
    if (this.props.params.slug) {
      return this.props.onLoad(agent.Achievements.get(this.props.params.slug));
    }
    this.props.onLoad(null);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">

              <ListErrors errors={this.props.errors}></ListErrors>

              <form>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Achievement Title"
                      value={this.props.title}
                      onChange={this.changeTitle} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter short description"
                      value={this.props.description}
                      onChange={this.changeDescription} />
                  </fieldset>

                  <fieldset className="form-group">
                  <div className="form-control">
                    <Dropzone
                      multiple={false}
                      accept="image/*"
                      onDrop={this.onImageDrop.bind(this)} >
                    <p>Click to upload a photo </p>
                    </Dropzone>
                    </div>
                    <div>
                      { this.state.uploadedFileCloudinaryUrl === '' ? null :
                      <div className="form-control">
                      <p>{this.state.uploadedFile}</p>
                      <img src={this.state.uploadedFileCloudinaryUrl} alt="" />
                    </div> }
                    </div>
                  </fieldset>

                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="Enter long description"
                      value={this.props.body}
                      onChange={this.changeBody}>
                    </textarea>
                  </fieldset>


                  <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  disabled={this.props.inProgress}
                  onClick={this.submitForm} >
                  Post Achievement
                  </button>
                </fieldset>
              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
//
// <fieldset className="form-group">
//   <input
//     className="form-control"
//     type="text"
//     placeholder="Enter Hash Tags"
//     value={this.props.tagInput}
//     onChange={this.changeTagInput}
//     onKeyUp={this.watchForEnter} />
//
//   <div className="tag-list">
//     {
//       (this.props.tagList || []).map(tag => {
//         return (
//           <span className="tag-default tag-pill" key={tag}>
//             <i className="ion-close-round"
//                 onClick={this.removeTagHandler(tag)}>
//             </i>
//             {tag} tags here
//           </span>
//         );
//       })
//     }
//   </div>
// </fieldset>
