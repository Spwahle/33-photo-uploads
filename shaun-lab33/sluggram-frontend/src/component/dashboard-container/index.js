import React from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col, Jumbotron, Button} from 'react-bootstrap';
import * as utils from '../../lib/utils';
import PhotoForm from '../photo-form';
import PhotoItem from '../photo-item';
import {photosFetchRequest, photoCreateRequest} from '../../action/photo-actions.js';

class DashboardContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      start: false,
    };
    this.toggleFormStart = this.toggleFormStart.bind(this);
  }
  componentDidMount(){
    this.props.photoFetch()
      .then(() => console.log(this.props, '***Props after didMountFetch'));
  }

  
  componentWillMount() {
    this.props.auth ? undefined : this.props.history.replace('/');
  }

  toggleFormStart(){
    this.setState({start: !this.state.start});
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <h1>BasicGram</h1>
          <p>Click here to upload a photo</p>
          <p><Button bsStyle="primary" onClick={this.toggleFormStart}>Upload a Photo</Button></p>
        </Jumbotron>

        {utils.renderIf(this.state.start, 
          <PhotoForm
            buttonText='post'
            onComplete={(photo) =>{
              return this.props.photoCreate(photo)
                .catch(console.error);
            }}
          />
        )}
        
        <Row>
          {utils.renderIf(this.props.photos,
            this.props.photos.map(photo =>
              <Col sm={6} md={3} key={photo._id}>{
                <PhotoItem key={photo._id} photo={photo}
                />
              }<br/></Col>
            ))}
        </Row>
        
      </div>
    );
  }
}

let mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  photos: state.photos,
});

let mapDispatchToProps = dispatch => ({
  photoCreate: (photo) => dispatch(photoCreateRequest(photo)),
  photoFetch: () => dispatch(photosFetchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);


