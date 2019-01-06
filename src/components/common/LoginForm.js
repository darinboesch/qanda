import React, { Component } from "react";
import ReactDOM from "react-dom";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import '../styles/toastr.scss';
import * as userActions from '../../actions/userActions';

class LoginForm extends Component {
  constructor(props, content) {
    super(props, content);

    // props.actions.deauthUser();
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }
  handleLoginClick(e) {
    e.preventDefault();
    this.props.actions.login({
      email: ReactDOM.findDOMNode(this.refs.email).value,
      password: ReactDOM.findDOMNode(this.refs.password).value
    }, this.props.nextPathname)
    .catch(error => {
      toastr.error(error.response.data.message);
    });
  }
  render() {
    return (
			<div className="col-sm-4">
        <h2>Log in</h2>		
        <form className="form-group" onSubmit={this.handleLoginClick}>
          <input className="form-control" type="email" ref="email" placeholder="Email"/><br/>
          <input className="form-control" ref="password" type="password" placeholder="Password"/><br/>
          <input className="btn btn-default" type="submit" value="Login" />
        </form>	
      </div>
    );
  }
}

LoginForm.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  nextPathname: PropTypes.string
};

function mapStateToProps(state, ownProps) {
  let nextPathname = "/home";
  try {
    nextPathname = ownProps.location.state.nextPathname;
  }
  catch (err) {
    // do nothing
  }

  return {
    user: state.user,
    nextPathname
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
