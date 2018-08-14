import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import PersonOutline from '@material-ui/icons/PersonOutline';
import InputAdornment from '@material-ui/core/InputAdornment';
import MailOutline from '@material-ui/icons/MailOutline';
import LockOutline from '@material-ui/icons/LockOutline';
import Lock from '@material-ui/icons/Lock';
import Grid from '@material-ui/core/Grid';
import isEmpty from '../../validation/is-empty';
import { compose } from 'recompose';
import Typography from '@material-ui/core/Typography';
import Spinner from './Spinner';

const styles = theme => ({
  paperStyle: {
    padding: 20,
    width: 270,
    margin: 10
  },
  container: {
    border: '1px solid lightgray',
    borderRadius: 3
  },
  width: {
    width: 260
  },
});

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    password2: '',
    errors: {},
    loading: false
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
    this.setState({loading: false});
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }
    this.setState({loading: true});
    this.props.registerUser(newUser);
  };

  render() {
    const usernameError = !isEmpty(this.state.errors.username);
    const emailError = !isEmpty(this.state.errors.email);
    const passwordError = !isEmpty(this.state.errors.password);
    const password2Error = !isEmpty(this.state.errors.password2);
    const { classes } = this.props;

    const originalView = (
      <Paper elevation={1} className={classes.paperStyle}>
        <form onSubmit={this.onSubmit}>
          <Grid container alignItems="center" direction="column" spacing={24} className={classes.container}>

            <Grid item>
              <TextField className={classes.width} onChange={this.onChange} id="username" placeholder="Username" autoComplete="off" type="text" helperText={this.state.errors.username} margin="dense" error={usernameError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PersonOutline />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item>
              <TextField className={classes.width} onChange={this.onChange} id="email" placeholder="Email" autoComplete="off" type="text" helperText={this.state.errors.email} margin="dense" error={emailError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <MailOutline />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item>
              <TextField className={classes.width} onChange={this.onChange} id="password" placeholder="Password" autoComplete="off" type="password" helperText={this.state.errors.password} margin="dense" error={passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LockOutline />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item>
              <TextField className={classes.width} onChange={this.onChange} id="password2" placeholder="Confirm Password" autoComplete="off" type="password" helperText={this.state.errors.password2} margin="dense" error={password2Error}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item>
              <Button variant='outlined' color="secondary" type="submit">
                Register
              </Button>
            </Grid>

          </Grid>
        </form>
      </Paper>
    );

    const successView = (
      <Paper elevation={1} className={classes.paperStyle}>
        <Grid container alignItems="center" direction="column" spacing={16} className={classes.container}>
          
          <Grid item style={{ textAlign: 'center', padding: 20 }} >
            <Typography variant="title" color="inherit">
              Congrats!
            </Typography>
          </Grid>

          <Grid item style={{ textAlign: 'center', padding: 20, paddingTop: 0 }} >
            <Typography variant="body1" color="inherit">
              Please check your email to activate your account before you login
            </Typography>
          </Grid>

        </Grid>
      </Paper>
    );

    return (
      this.state.loading ? <Spinner /> : this.props.auth.successView ? successView : originalView
    )
  }
}

Register.propTypes = {
  classes: PropTypes.object,
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default compose(
  connect(mapStateToProps, { registerUser }),
  withStyles(styles)
)(Register);
