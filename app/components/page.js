// @flow
import React from 'react';
import PropTypes from 'prop-types';
import DataList from './datalist';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.init;
    /*
    this.state = {
      pagename1: props.init.pagename1,
      since1: props.init.since1,
      until1: props.init.until1,
      wordfilter1: props.init.wordfilter1,
      idfilter1: props.init.idfilter1,
      contentfilter1: props.init.contentfilter1,
    };
    */
  }

  /*
  handleClick = () => {
    this.props = '';
  };
  */

  render() {
    const {
      show,
      init: {
        pagename, since, until, wordfilter, idfilter, contentfilter,
      },
      onChange,
      handlePT,
    } = this.props;
    const actions = [
      '客台',
      '勞動之王',
      '古斌',
      '安唯綾',
      '張靜之',
      '黃騰浩',
      'Gossiping',
      'Soft_Job',
      'Tech_Job',
    ];
    const pagenamelist = {
      listid: 'pagenamelist',
      selectid: 'pagename',
      name: 'pagename',
      lists: actions,
    };
    if (show) {
      return (
        <div id="Page1" className="tabcontent">
          <span
            className="topright"
            role="button"
            tabIndex="0"
            onClick={onChange}
            onKeyDown={onChange}
          >
            x
          </span>
          <fieldset>
            <legend>Query date1</legend>
            <label htmlFor="x">
              pagename:
              <input
                name="pagename"
                id="pagename1"
                type="text"
                list="pagenamelist"
                value={pagename}
                onChange={handlePT}
              />
            </label>
            <DataList props={pagenamelist} />
            <label htmlFor="x">
              since:
              <input
                type="date"
                name="since"
                id="date1"
                placeholder="date"
                value={since}
                onChange={handlePT}
              />
            </label>
            <label htmlFor="x">
              until:
              <input
                type="date"
                name="until"
                id="date2"
                placeholder="date"
                value={until}
                onChange={handlePT}
              />
            </label>
            <label htmlFor="x">
              key word filter:
              <input
                type="keyword1"
                name="wordfilter"
                id="keyword1"
                placeholder="keyword"
                value={wordfilter}
                onChange={handlePT}
              />
            </label>
            <label htmlFor="x">
              userid filter:
              <input
                type="userid1"
                name="idfilter"
                id="userid1"
                placeholder="userid"
                value={idfilter}
                onChange={handlePT}
              />
            </label>
            <label htmlFor="x">
              content word filter:
              <input
                type="keyword3"
                name="contentfilter"
                id="keyword3"
                placeholder="keyword"
                value={contentfilter}
                onChange={handlePT}
              />
            </label>
          </fieldset>
        </div>
      );
    }
    return null;
  }
}

Page.defaultProps = {};
Page.propTypes = {
  show: PropTypes.bool.isRequired,
  init: PropTypes.shape({
    pagename: PropTypes.string,
    since: PropTypes.string,
    until: PropTypes.string,
    wordfilter: PropTypes.string,
    idfilter: PropTypes.string,
    contentfilter: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  handlePT: PropTypes.func.isRequired,
};

export default Page;
