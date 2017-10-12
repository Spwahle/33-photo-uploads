import React from 'react';
import {connect} from 'react-redux';
import * as utils from '../../lib/utils';
import ProfileForm from '../profile-form';
import {Button} from 'react-bootstrap';
import {profileFetchRequest, profileCreateRequest, profileUpdateRequest} from '../../action/profile-actions';


class SettingsContainer extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      editProfile: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
  }


  componentWillMount() {
    this.props.profileFetch();
  }

  handleToggle(){
    this.setState({editProfile: !this.state.editProfile});

  }

  render() {
    return (
      <div className="settings-container">
        {utils.renderIf(this.props.auth && !this.props.profile, 
          <div className="profile-form-container">
            <h2>Create your profile!</h2>
            <ProfileForm 
              buttonText="Create"
              onComplete={this.props.profileCreate}/>
          </div>
        )}
        {utils.renderIf(this.props.auth && this.props.profile, 
          <div>
            <h3>{this.props.profile.username}</h3>
            <h3>{this.props.profile.bio}</h3>
            <Button bsStyle="primary" onClick={this.handleToggle}>Edit Profile</Button>
          </div>
        )}
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
    );
  }
}

let mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
});

let mapDispatchToProps = dispatch => ({
  profileCreate: profile => dispatch(profileCreateRequest(profile)),
  profileFetch: () => dispatch(profileFetchRequest()),
  profileUpdate: profile => dispatch(profileUpdateRequest(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);