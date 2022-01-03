import { GalleryItem, GalleryImage } from "./ImageGalleryItem.styled";
import PropTypes from "prop-types";

function ImageGalleryItem({ smallImage, largeImage }) {
  return (
    <GalleryItem>
      <GalleryImage src={smallImage} alt={largeImage} />
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
