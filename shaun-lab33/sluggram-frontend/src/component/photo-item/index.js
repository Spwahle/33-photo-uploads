
import React from 'react';
import {Jumbotron, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as utils from '../../lib/utils';
import ProfileForm from '../profile-form';
import {profileFetchRequest, profileCreateRequest, profileUpdateRequest} from '../../action/profile-actions';


class ProfileItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editProfile: false,
    };
    this.toggleFormStart = this.toggleFormStart.bind(this);
  }

  toggleFormStart() {
    this.setState({editProfile: !this.state.editProfile});
  }
  render() {
    return(
      <div>
        <Jumbotron>
          <h3>{this.props.profile.username}</h3>
          <h4>{this.props.profile.bio}</h4>
          <Button bsStyle="primary" onClick={this.toggleFormStart}>Edit Profile</Button>
        </Jumbotron>
        <div>
          {utils.renderIf(this.state.editProfile,
            <div>
              <h3>Update your profile</h3>
              <ProfileForm
                buttonText="Update"
                onComplete={this.props.profileUpdate}
                profile={this.props.profile} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profile,
});
let mapDispatchToProps = dispatch => ({
  profileUpdate: profile => dispatch(profileUpdateRequest(profile)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ProfileItem);