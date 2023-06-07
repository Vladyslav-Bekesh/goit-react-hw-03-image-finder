import React from 'react';
import PropTypes, { object } from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem';

function ImageGallery({ images }) {
  return (
    <ul>
      {/* <li><p>asdasd</p></li> */}
      {images.map(({ previewURL, largeImageURL, id }) => {
        return (
          <ImageGalleryItem
            previewURL={previewURL}
            largeImageURL={largeImageURL}
            key={id}
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
