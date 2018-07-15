import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FingerprintIcon from '@material-ui/icons/FlightTakeoff';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const styles = {
  list: {
    width: 250,
  }
};

class SideNav extends Component {
  state = {
    left: false
  };

  toggleDrawer = open => () => {
    this.setState({
      left: open,
    });
  };

  render() {
    const { classes } = this.props;

    const notAuthorized = (
      <div>
        <MenuItem component={Link} to='/login' selected={'/login' === this.props.path}>
          <ListItemIcon>
            <FingerprintIcon />
          </ListItemIcon>
          <ListItemText inset primary="LOGIN" />
        </MenuItem>
        <MenuItem component={Link} to='/register' selected={'/register' === this.props.path}>
          <ListItemIcon>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          <ListItemText inset primary="REGISTER" />
        </MenuItem>
      </div>
    );

    const authorized = (
      <MenuItem component={Link} to='/dashboard' selected={'/dashboard' === this.props.path}>
        <ListItemIcon>
          <FingerprintIcon />
        </ListItemIcon>
        <ListItemText inset primary="DASHBOARD" />
      </MenuItem>
    )

    return (
      <div>
        <IconButton aria-haspopup="true" color="inherit" onClick={this.toggleDrawer('left', true)}>
          <MenuIcon />
        </IconButton>

        <SwipeableDrawer open={this.state.left ? true : false} onClose={this.toggleDrawer(false)} onOpen={this.toggleDrawer(true)}>
          <div tabIndex={0} role="button" onClick={this.toggleDrawer(false)} onKeyDown={this.toggleDrawer(false)}>
            <div className={classes.list}>
              <MenuList>
                {this.props.auth ? authorized : notAuthorized}
              </MenuList>
            </div>
            <Divider />
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

SideNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideNav);