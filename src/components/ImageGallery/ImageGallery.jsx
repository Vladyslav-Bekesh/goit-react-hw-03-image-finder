import React from 'react';
import PropTypes, { object } from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem';

function ImageGallery({ images, onClick }) {
  return (
    <ul>
      {images.map(({ previewURL, largeImageURL, id }) => {
        return (
          <ImageGalleryItem
            previewURL={previewURL}
            largeImageURL={largeImageURL}
            key={id}
            onClick={onClick}
          />
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(object),
};

export default ImageGallery;
