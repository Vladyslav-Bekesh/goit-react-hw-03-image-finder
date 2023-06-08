import React from 'react';
import PropTypes from 'prop-types';

function ImageGalleryItem({ previewURL, id, onClick, largeImageURL }) {
  return (
    <li key={id}>
      <img
        src={previewURL}
        onClick={onClick}
        data-large-image-url={largeImageURL}
        alt=""
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string,
  previewURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
