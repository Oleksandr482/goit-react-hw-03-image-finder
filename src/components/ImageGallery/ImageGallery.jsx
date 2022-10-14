import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';
import PropTypes from 'prop-types';

export const ImageGallery = ({ results, imageClick }) => {
  return (
    <ul className="ImageGallery">
      {results.map(result => (
        <ImageGalleryItem
          key={result.id}
          webformatURL={result.webformatURL}
          tegs={result.tags}
          id={result.id}
          imageClick={imageClick}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  imageClick: PropTypes.func.isRequired,
};
