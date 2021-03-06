// @flow
import React from 'react';
import PropTypes from 'prop-types';
import './style/card.css';

type TagListProps = {
  props: PropTypes.array,
};

const TagList = ({ props }: TagListProps) => {
  const list = props;
  const listTags = list.map((tags, i) => {
    const url = `/tag/${{ tags }}`;
    return (
      <a key={i.toString()} href={url}>
        {tags}
      </a>
    );
  });
  return <span className="card-author">{listTags}</span>;
};

const Card = ({
  cardprops: {
    time, title, description, tags,
  },
}) => (
  <div className="feed">
    <article className="card">
      <div className="card-content">
        <div className="card-content-link" href="url">
          <header className="card-header">
            <span>{time}</span>
            <h2 className="card-title">{title}</h2>
          </header>
          <section className="card-excerpt">
            {/* <h2>:D</h2> */}
            <p>{description}</p>
          </section>
        </div>
        <footer className="card-meta">
          <TagList props={tags} />
        </footer>
      </div>
    </article>
  </div>
);

Card.defaultProps = {
  cardprops: {
    time: '23 Oct 018',
    title: '柯P',
    description: '台北市長柯文哲在PTT上別稱',
    tags: ['人物', '政治', '台北'],
  },
};
Card.propTypes = {
  cardprops: PropTypes.shape({
    time: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default Card;
