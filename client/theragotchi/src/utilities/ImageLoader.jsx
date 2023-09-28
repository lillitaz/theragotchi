import PropTypes from 'prop-types';

const ImageLoader = ( {imagePath}) => {


    return (
        <div className="image-container">
            {imagePath && <img src={imagePath} alt="Theragotchi Picture depending on mood" />}
        </div>
    );
};

ImageLoader.propTypes = {
  imagePath: PropTypes.string.isRequired,
};

export default ImageLoader;
