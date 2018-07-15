import React, { Component } from 'react';
import Register from '../views/Register';
import Login from '../views/Login';
import Landing from '../views/Landing';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

class Main extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    const redirection = isAuthenticated ? "/dashboard" : "/login";

    return (
      <div>
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/dashboard' component={Landing} />
          <Route render={() => <Redirect to={redirection} />} />
        </Switch>
      </div>
    );
  }
}

Main.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});


export default compose(
  withRouter,
  connect(mapStateToProps, { })
)(Main);
