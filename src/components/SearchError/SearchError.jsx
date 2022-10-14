import React from 'react';
import Icon404 from '../../images/img404.png';
import PropTypes from 'prop-types';

export const SearchError = ({ message }) => {
  return (
    <div className="Error">
      <p>{message}</p>
      <img src={Icon404} alt="no-images" />
    </div>
  );
};

SearchError.propTypes = {
  message: PropTypes.string.isRequired,
};
