import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'cloudinary-react';
import { Placeholder } from 'cloudinary-react';

const ImageCloud = (props) => {
  if (!Object.keys(props).length) {
    return <div></div>;
  }
  let { alt, maxHeight, maxWidth, imageId, ClassName, imageType } = props;
  if ((!imageType || imageType === '') && (!imageId || imageId === '')) {
    imageType = imageTypes.logoImage;
    imageId = 'logo_xaflvznycqogunwynohx';
  }
  if (!imageId || imageId === '') {
    if (imageType === imageTypes.logoImage) {
      imageId = 'logo_xaflvznycqogunwynohx';
    } else if (imageType === imageTypes.caverImage) {
      imageId = 'cover_u3aylv';
    } else if (imageType === imageTypes.graveImage) {
      imageId = 'grave_ptzkhe';
    } else if (imageType === imageTypes.profileImage) {
      imageId = 'userIcon_zpwhl4';
    }
  }
  const src = () => {
    const width = maxWidth;
    const height = maxHeight;
    return `https://res.cloudinary.com/lifecloud-qr/image/upload/c_scale,${
      width ? 'w_' + width : ''
    }${width && height ? ',' : ''}${
      height ? 'h_' + height : ''
    }/v1656760533/${imageId}`;
  };
  const url = src();
  return (
    <Image
      className={ClassName}
      alt={alt}
      src={url}
      gravity="faces"
      loading="lazy"
      height={maxHeight}
      width={maxWidth}
    >
      <Placeholder type="blur"></Placeholder>
    </Image>
  );
};

ImageCloud.propsTypes = {
  maxHeight: PropTypes.number,
  maxWidth: PropTypes.number,
  alt: PropTypes.string,
  imageId: PropTypes.element.isRequired,
  ClassName: PropTypes.string,
  imageType: PropTypes.string,
};
const imageTypes = {
  profileImage: 'profileImage',
  caverImage: 'caverImage',
  graveImage: 'graveImage',
  logoImage: 'logoImage',
};
ImageCloud.defaultProps = {
  maxHeight: 250,
  maxWidth: 250,
  alt: 'photo',
  ClassName: ' ',
  imageId: '',
  imageType: imageTypes.profileImage,
};

export default ImageCloud;
