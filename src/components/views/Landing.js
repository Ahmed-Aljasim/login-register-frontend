import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Landing extends Component {
  componentWillReceiveProps(nextProps) {
    if(!nextProps.auth.isAuthenticated) {
      this.props.history.push('/login'); 
    }
  }

  onLogoutClick = () => {
    this.props.logoutUser();
  }

  render() {
    return (
      <div>
        <Button variant='outlined' color="secondary" onClick={this.onLogoutClick.bind(this)}>
          Log out
        </Button>
      </div>
    )
  }
}

Landing.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Landing);
