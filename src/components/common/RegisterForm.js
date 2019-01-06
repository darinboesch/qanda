import React, { Component } from "react";
import ReactDOM from "react-dom";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import toastr from 'toastr';
import '../styles/toastr.scss';
import * as userActions from '../../actions/userActions';

class RegisterForm extends Component {
  constructor(props, content) {
    super(props, content);

    // props.actions.deauthUser();
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
  }
  handleRegisterClick(e) {
    e.preventDefault();
    this.props.actions.register({
      name: ReactDOM.findDOMNode(this.refs.name).value,
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
        <h2>Register for QandA</h2>		
        <form className="form-group" onSubmit={this.handleRegisterClick}>
          <input className="form-control" type="name" ref="name" placeholder="Name"/><br/>
          <input className="form-control" type="email" ref="email" placeholder="Email"/><br/>
          <input className="form-control" ref="password" type="password" placeholder="Password"/><br/>
          <input className="btn btn-default" type="submit" value="Register" />
        </form>	
      </div>
    );
  }
}

RegisterForm.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  nextPathname: PropTypes.string
};

function mapStateToProps(state, ownProps) {
  let nextPathname = "/login";
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
