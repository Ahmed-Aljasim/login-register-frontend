import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MailOutline from '@material-ui/icons/MailOutline';
import LockOutline from '@material-ui/icons/LockOutline';
import Grid from '@material-ui/core/Grid';
import isEmpty from '../../validation/is-empty';
import { compose } from 'recompose';

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

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  };

  onSubmit = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.loginUser(user);
  };

  render() {
    const emailError = !isEmpty(this.state.errors.email);
    const passwordError = !isEmpty(this.state.errors.password);
    const { classes } = this.props;

    return (
      <Paper elevation={1} className={classes.paperStyle}>
        <form onSubmit={this.onSubmit}>
          <Grid container alignItems="center" direction="column" spacing={24} className={classes.container}>

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
              <Button variant='outlined' color="secondary" type="submit">
                Login
              </Button>
            </Grid>

          </Grid>
        </form>
      </Paper>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object,
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default compose(
  connect(mapStateToProps, { loginUser }),
  withStyles(styles)
)(Login);
