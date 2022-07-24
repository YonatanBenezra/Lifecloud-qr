import React from 'react';

const FullWidthVideo = () => {
  return (
    <div className="overflow-hidden full_width_video_container">
      <video controls>
        <source src="https://res.cloudinary.com/lifecloud-qr/video/upload/v1658267508/EXPLAIN_SUBS_wolvyg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default FullWidthVideo;
