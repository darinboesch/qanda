import React, { Component } from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as userActions from '../actions/userActions';

class Index extends Component {
  constructor(props, content) {
    super(props, content);

    props.actions.deauthUser();
  }
  render() {
    return (
      <div>
        <div className="jumbotron text-center">
          <h1>You have successfully logged out.</h1>
        </div>
        <div className="container" />
      </div>
    );
  }
}

Index.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
