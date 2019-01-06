import React, { Component } from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import Panel from "./common/Panel";

class All extends Component {
  constructor(props, content) {
    super(props, content);
  }
  renderUrls() {
    const {urls} = this.props;

    return urls.map(url => (
      <Panel
        url={url}
        key={url._id}
        showFavorite
        showDelete
      />
    ));
  }
  render() {
    return (
      <div>
        <div className="container">
          <hr />
          <div className="row">
            {this.renderUrls()}
          </div>
        </div>
      </div>
    );
  }
}

All.propTypes = {
  urls: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    urls: state.urls
  };
}

export default connect(mapStateToProps)(All);
