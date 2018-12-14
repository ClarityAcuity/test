// @flow
import React from 'react';
import PropTypes from 'prop-types';
import img from './img/download.jpg';

/*
const data = [
  {
    article_id: 'id1',
    article_title: 'title1',
    author: 'author1',
    board: 'board1',
    content: 'content1',
    date: 'date1',
    ip: 'ip1',
    message_count: {
      all: 'all1',
      boo: 'boo1',
      count: 'count1',
      neutral: 'neutral1',
      push: 'push1',
    },
    messages: [
      {
        push_content: 'push_content1',
        push_ipdatatime: 'push_ipdatatime1',
        push_tag: 'push_tag1',
        push_userid: 'push_userid1',
      },
      {
        push_content: 'push_content2',
        push_ipdatatime: 'push_ipdatatime2',
        push_tag: 'push_tag2',
        push_userid: 'push_userid2',
      },
    ],
    url: 'url',
  },
  {
    article_id: 'id2',
    article_title: 'title2',
    author: 'author2',
    board: 'board2',
    content: 'content2',
    date: 'date2',
    ip: 'ip2',
    message_count: {
      all: 'all2',
      boo: 'boo2',
      count: 'count2',
      neutral: 'neutral2',
      push: 'push2',
    },
    messages: [
      {
        push_content: 'push_content3',
        push_ipdatatime: 'push_ipdatatime3',
        push_tag: 'push_tag3',
        push_userid: 'push_userid3',
      },
      {
        push_content: 'push_content4',
        push_ipdatatime: 'push_ipdatatime4',
        push_tag: 'push_tag4',
        push_userid: 'push_userid4',
      },
    ],
    url: 'url',
  },
];

const config = {
  article_id: true,
  article_title: true,
  author: true,
  board: true,
  content: true,
  date: true,
  ip: true,
  message_count: {
    all: true,
    boo: true,
    count: true,
    neutral: true,
    push: true,
  },
  messages: {
    push_content: true,
    push_ipdatatime: true,
    push_tag: true,
    push_userid: true,
  },
  url: true,
};
*/
// console.log(toCSV(data, config));

/**
 *
 * @param {array} datalist
 * @param {object} config
 */
function toCSV(datalist, config) {
  const row = datalist.length;
  let head = ' ,';
  const format = Object.keys(config);
  const column = format.length;
  let offset = 0;
  let count = 0;
  for (let j = 0; j < column; j += 1) {
    count += 1;
    head += format[j];
    head += ',';
    if (format[j] === 'messages' || format[j] === 'message_count') {
      // console.log(datalist[format[j]]);
      const subformat = Object.keys(config[format[j]]);
      const subcolumn = subformat.length;
      if (format[j] === 'messages') offset = count;
      count += subcolumn;
      for (let k = 0; k < subcolumn; k += 1) {
        head += subformat[k];
        head += ',';
      }
    }
    if (j === column - 1) head += '\n';
  }
  let messagestr = '';
  for (let i = 0; i < row; i += 1) {
    let content = `post${i + 1},`;
    for (let j = 0; j < column; j += 1) {
      if (format[j] === 'messages') {
        const mcolumn = Object.keys(config.messages).length - 1;
        content += addOffset(mcolumn);
        messagestr = subCSV(datalist[i][format[j]], count, offset, config.messages);
      } else if (format[j] === 'message_count') {
        const subformat = Object.keys(datalist[0][format[j]]);
        const subcolumn = subformat.length;
        for (let k = 0; k < subcolumn; k += 1) {
          // console.log('subformat', datalist[i][format[j]], subformat);
          content += datalist[i][format[j]][subformat[k]];
          content += ',';
        }
      } else {
        content += datalist[i][format[j]];
      }
      content += ',';
      if (j === column - 1) {
        content += '\n';
        content += messagestr;
      }
    }
    head += content;
  }
  return head;
}

/**
 *
 * @param {number} offset
 */
function addOffset(offset) {
  let offsetstr = '';
  for (let j = 0; j < offset; j += 1) {
    offsetstr += ',';
  }
  return offsetstr;
}

/**
 *
 * @param {array} prop
 * @param {number} proplength
 * @param {number} offset
 * @param {object} propconfig
 */
function subCSV(prop, proplength, offset, propconfig) {
  let content = '';
  const row = prop.length;
  const offsetstr = addOffset(offset);
  const format = Object.keys(propconfig);
  // console.log('format', format);
  const column = format.length;
  for (let i = 0; i < row; i += 1) {
    content += offsetstr;
    for (let j = 0; j < column; j += 1) {
      content += prop[i][format[j]];
      content += ',';
    }
    content += addOffset(proplength - offset - column);
    content += '\n';
  }
  return content;
}

/**
 * // clear string
 * @param {string} s - string
 * @return {string}
 */
function clearString(s) {
  // var pattern = new RegExp("[`':;',‘；：”“'。，、？]");
  const pattern1 = new RegExp('[,]');
  const pattern2 = new RegExp('[\r\n]');
  let rs1 = '';
  let rs2 = '';
  const l1 = s.length;
  for (let i = 0; i < l1; i += 1) {
    rs1 += s.substr(i, 1).replace(pattern1, '，');
  }
  const l2 = rs1.length;
  for (let i = 0; i < l2; i += 1) {
    rs2 += rs1.substr(i, 1).replace(pattern2, ' ');
  }
  return rs2;
}

class CSV extends React.Component {
  constructor(props) {
    super(props);
    this.buttonSubmit = this.buttonSubmit.bind(this);
  }

  buttonSubmit(e, props) {
    const { onChange } = this.props;
    onChange(e, props);
  }

  render() {
    const { post, config } = this.props;
    const {
      message_count: { count },
      url: href,
      article_title: title,
      author,
      board,
      date,
    } = post;
    const filename = `${board}_${author}_${date}.csv`;
    const csvstr = toCSV([post], config);
    const blob = new Blob([csvstr], {
      type: 'text/csv',
    });
    const bloburl = URL.createObjectURL(blob);
    //const imgurl = '../app/img/download.jpg';

    const style = {
      margin: '1px 5px 1px 5px',
      width: '16px',
      height: '16px',
    };

    return (
      <a download={filename} href={bloburl}>
        <img src={img} className="img-circle" style={style} />
      </a>
    );
  }
}
CSV.defaultProps = {};
CSV.propTypes = {
  post: PropTypes.shape({
    author: PropTypes.string,
    board: PropTypes.string,
    article_title: PropTypes.string,
    date: PropTypes.string,
    content: PropTypes.string,
    url: PropTypes.string,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        push_tag: PropTypes.string,
        push_userid: PropTypes.string,
        push_content: PropTypes.string,
        push_ipdatetime: PropTypes.string,
      }),
    ),
  }).isRequired,
  config: PropTypes.shape({
    article_id: PropTypes.bool,
    article_title: PropTypes.bool,
    author: PropTypes.bool,
    board: PropTypes.bool,
    content: PropTypes.bool,
    date: PropTypes.bool,
    ip: PropTypes.bool,
    message_count: PropTypes.shape({
      all: PropTypes.bool,
      boo: PropTypes.bool,
      count: PropTypes.bool,
      neutral: PropTypes.bool,
      push: PropTypes.bool,
    }),
    messages: PropTypes.shape({
      push_content: PropTypes.bool,
      push_ipdatatime: PropTypes.bool,
      push_tag: PropTypes.bool,
      push_userid: PropTypes.bool,
    }),
    url: PropTypes.bool,
  }).isRequired,
};

export default CSV;