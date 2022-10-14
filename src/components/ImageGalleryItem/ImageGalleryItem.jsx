import React from 'react';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webformatURL, tegs, id, imageClick }) => {
  return (
    <li className="ImageGalleryItem" id={id} onClick={imageClick}>
      <img className="ImageGalleryItem-image" src={webformatURL} alt={tegs} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tegs: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  imageClick: PropTypes.func.isRequired,
};
