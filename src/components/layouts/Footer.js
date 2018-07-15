import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <Typography variant="caption" color="inherit">
          Copyright &copy; {new Date().getFullYear()} AJ SYSTEMS
        </Typography>
      </div>
    )
  }
}
