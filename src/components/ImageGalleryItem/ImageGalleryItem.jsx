import React from 'react';
import PropTypes from 'prop-types';

function ImageGalleryItem({ 'data-lagre-img':largeImageURL, previewURL, id }) {
  return (
    <li key={id} >
      <img src={previewURL} alt="" />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string,
  previewURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
