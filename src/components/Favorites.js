import React, { Component } from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import Panel from "./common/Panel";

class Favorites extends Component {
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
        <div className="jumbotron text-center">
          <h1>Your Favorite URLs</h1>
          <p>Domains you will want to remember...</p>
        </div>
        <div className="container">
          <div className="row">
            {this.renderUrls()}
          </div>
        </div>
      </div>
    );
  }
}

Favorites.propTypes = {
  urls: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    urls: state.urls.filter(url => url.favorited)
  };
}

export default connect(mapStateToProps)(Favorites);
