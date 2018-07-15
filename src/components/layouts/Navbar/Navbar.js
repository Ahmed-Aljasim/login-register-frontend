import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Notifications from '@material-ui/icons/Notifications';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Badge from '@material-ui/core/Badge';
import SideNav from './SideNav';
import Logo from './Logo';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

const options = [
  'THEME',
  'LOGOUT',
];

class Navbar extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    const { anchorEl } = this.state;
    const { pathname } = this.props.location;

    const authLinks = (
      <Grid item>
        <IconButton aria-haspopup="true" color="inherit">
          <Badge badgeContent={10} color="secondary">
            <Notifications />
          </Badge>
        </IconButton>
        <IconButton aria-haspopup="true" color="inherit" aria-label="More" aria-owns={anchorEl ? 'long-menu' : null} onClick={this.handleClick}>
          <AccountCircle />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: 200,
            },
          }}
        >
          {options.map(option => (
            <MenuItem key={option} onClick={this.handleClose}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Grid>
    );

    return (
      <div className="header">
        <AppBar position="static">
          <Toolbar>
            <Grid container>

              <Grid item xs={6} sm={4}>
                <Grid container justify="flex-start" alignItems="center">
                  <Grid item>
                    <Grid container justify="space-between" alignItems="center">
                      <Grid item>
                        <SideNav auth={isAuthenticated} path={pathname} />
                      </Grid>
                      <Grid item style={{ paddingLeft: 10 }}>
                        <Typography variant="title" color="inherit">
                          {pathname.replace(/[/]/g, "").toUpperCase()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Hidden xsDown>
                <Logo />
              </Hidden>

              <Grid item xs={6} sm={4}>
                <Grid container justify="flex-end" alignItems="center">
                  {isAuthenticated ? authLinks : null}
                </Grid>
              </Grid>

            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default compose(
  withRouter,
  connect(mapStateToProps, { logoutUser })
)(Navbar);
