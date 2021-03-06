// @flow
import React from 'react';
import PropTypes from 'prop-types';

type ButtonProps = {
  style: PropTypes.shape,
  classname: PropTypes.string,
  action: PropTypes.func,
  title: PropTypes.string,
  type: PropTypes.string,
};

const Button = (props: ButtonProps) => {
  const {
    style, classname, action, title, type,
  } = props;
  return (
    <button
      style={style}
      className={classname === 'primary' ? 'btn btn-primary' : 'btn btn-secondary'}
      onClick={action}
      type={type}
    >
      {title}
    </button>
  );
};
export default Button;
