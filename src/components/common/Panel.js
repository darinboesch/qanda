import React, { Component } from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Panel.module.scss';
import toastr from 'toastr';
import '../styles/toastr.scss';
import * as urlActions from '../../actions/urlActions';

class Panel extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
  }
  handleFavoriteClick() {
    event.preventDefault();

    this.props.actions.favoriteUrl(this.props.url)
      .catch(error => {
        toastr.error(error);
      });
  }
  handleDeleteClick() {
    event.preventDefault();

    this.props.actions.deleteUrl(this.props.url)
      .catch(error => {
        toastr.error(error);
      });
  }
  render() {
    return (
      <div className="col-md-3 col-sm-6">
        <div className="panel panel-default">
          <div className={`panel-heading ${styles.panelHeading}`}>
            <i
              onClick={this.handleFavoriteClick}
              style={{ display: this.props.showFavorite ? "block" : "none" }}
              className={styles.favorite + " " + (this.props.url.favorited ? "fa fa-star " + styles.gold : "fa fa-star-o")}
              aria-hidden="true"
            />
            <i
              onClick={this.handleDeleteClick}
              style={{ display: this.props.showDelete ? "block" : "none" }}
              className={styles.delete + " " + "fa fa-trash-o"}
              aria-hidden="true"
            />
            <span className={styles.urlName}>{this.props.url.name}</span>
          </div>
          <div className="panel-body">
            <div>
              <span>{this.props.url.domain}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Panel.defaultProps = { showFavorite: false, showDelete: false };

Panel.propTypes = {
  url: PropTypes.object.isRequired,
  showFavorite: PropTypes.bool,
  showDelete: PropTypes.bool,
  actions: PropTypes.object.isRequired
};

function getUrlById(urls, id) {
  const url = urls.filter(url => url._id == id);
  if (url) return url[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const urlId = ownProps.url._id;

  return {
    url: getUrlById(state.urls, urlId)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(urlActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
