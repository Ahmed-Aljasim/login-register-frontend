import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

export default class Logo extends Component {
  render() {
    return (
      <Grid item sm={4}>
        <Grid container justify="center" alignItems="center">
          <Grid item style={{ marginBottom: -109 }}>
            <Avatar alt="AJSYSTEMS" src="img/ajsystems.png" style={{ width: 80, height: 80 }} />
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
