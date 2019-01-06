import React, { Component } from "react";
import PropTypes from "prop-types";
import Panel from "./common/Panel";
import UrlForm from "./common/UrlForm";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReactDragListView from 'react-drag-listview/lib/index.js';
import styles from './Home.module.scss';

class Home extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      urls: Object.assign([], this.props.urls)
    };

    // list view test.
    // const data = [];
    // for (let i = 1, len = 21; i < len; i += 1) {
    //   data.push({
    //     title: `rows${i}`
    //   });
    // }
    // this.state = {
    //   data
    // };
  }
  renderUrls() {
    const {urls} = this.props;
    return urls.map(url => (
      <Panel
        url={url}
        key={url._id}
      />
    ));
  }
  render() {
    const that = this;
    const dragProps = {
      onDragEnd(fromIndex, toIndex) {
        const { data } = that.state;
        const item = data.splice(fromIndex, 1)[0];
        data.splice(toIndex, 0, item);
        that.setState({ data });
      },
      nodeSelector: 'li',
      handleSelector: 'a'
    };

    return (
      <div className="container">
        <div className="row">
          <UrlForm />

          {/* <div className={`${styles.simple} ${styles.simple1}`}>
            <div className={styles.simpleInner}>
              <ReactDragListView {...dragProps}>
                  <ol>
                    {this.state.data.map((item, index) => (
                      <li key={index}>
                        {item.title}
                        <a href="#">Drag</a>
                      </li>
                  ))}
                  </ol>
              </ReactDragListView>
            </div>
          </div> */}

        </div>
        <div className="row">
          <hr />
          {this.renderUrls()}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  urls: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    urls: state.urls.filter(url => url.isNew)
  };
}

export default connect(mapStateToProps)(Home);
