import React from 'react';
import {connect} from 'react-redux';
import * as utils from '../../lib/utils';
import PhotoForm from '../photo-form';
import {photoDeleteRequest, photoUpdateRequest} from '../../action/photo-actions.js';

class PhotoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
    this.toggleEdit = this.toggleEdit.bing(this);
  }

  toggleEdit() {
    this.setState({ editing: !this.state.editing});
  }

  render() {
    let {photo} = this.props;

    return (
      <div className="photo-item">
        {utils.renderIf(!this.state.editing,
          <div>
            <img src={photo.url} style={{'width': '25%'}}/>
            <p>{photo.description}</p>
            <i>X</i>
            <i>Edit</i>
          </div>
        )}

        {utils.renderIf(this.state.editing, 
          <PhotoForm
            buttonText="update"
            photo={photo}
            onComplete={this.props.updatePhoto}/>
        )}
            
      </div>
    );
  }
}

let mapStateToProps = () => ({});

let mapDispatchToProps = (dispatch) => ({
  deletePhoto: (photo) => dispatch(photoDeleteRequest(photo)),
  updatePhoto: (photo) => dispatch(photoUpdateRequest(photo)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoItem);