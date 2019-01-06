import React, { Component } from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Index extends Component {
  constructor(props, content) {
    super(props, content);
  }
  render() {
    return (
      <div>
        <div className="jumbotron text-center">
          <h1>Welcome to QandA.</h1>
        </div>
        <div className="container" />
      </div>
    );
  }
}

export default Index;
