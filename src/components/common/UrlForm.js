import React, { Component } from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import toastr from 'toastr';
import '../styles/toastr.scss';
import * as urlActions from '../../actions/urlActions';
import styles from "./UrlForm.module.scss";

const maxCompanies = 25;

class UrlForm extends Component {
  constructor(props, content) {
    super(props, content);

    this.state = {
      companies: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }
  handleInputChange(event) {
    event.preventDefault();

    const arrCompanies = event.target.value.trim().split(/\s*,\s*/);
    const valuesSoFar = Object.create(null);
    for (let i=0, count=0; i<arrCompanies.length; i++) {
      if (arrCompanies[i].length > 0) {
        if (++count > maxCompanies) {
          this.setState({ companies: null });
          return toastr.error(`You cannot provide more than ${maxCompanies} values.`);
        }

        if (arrCompanies[i] in valuesSoFar) {
          this.setState({ companies: null });
          return toastr.error("All values must be unique.");
        }
        valuesSoFar[arrCompanies[i]] = true;
      }
    }

    this.setState({ companies: Object.keys(valuesSoFar) });
  }
  handleSubmitClick() {
    event.preventDefault();
    this.props.actions.loadUrlsByCompanyList(this.state.companies)
      .catch(error => {
        toastr.error(error);
      });
  }
  render() {
    return (
      <div className="col-md-6 col-md-offset-3">
        <div className={`form-group ${styles.formGroup}`}>
          <label htmlFor="input-box">
            Company Names
          </label>
          <textarea
            style={{
              resize: "none"
            }}
            onChange={this.handleInputChange}
            placeholder="Add Company Names here!"
            className="form-control"
            id="input-box"
            rows="3"
          />
          <button
            onClick={this.handleSubmitClick}
            className={"btn btn-default " + styles.button}
            disabled={!this.state.companies || this.state.companies.length === 0}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

UrlForm.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(urlActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UrlForm);
