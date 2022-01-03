import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import { ImageGalleryList } from "./ImageGallery.styled";
import PropTypes from "prop-types";

function ImageGallery({ images, onClick }) {
  return (
    <ImageGalleryList onClick={onClick}>
      {images.map((image) => (
        <ImageGalleryItem
          key={image.id}
          smallImage={image.webformatURL}
          largeImage={image.largeImageURL}
        />
      ))}
    </ImageGalleryList>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onClick: PropTypes.func,
};

export default ImageGallery;
