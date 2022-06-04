import React from 'react';

const FullWidthVideo = () => {
  return (
    <div className="overflow-hidden full_width_video_container">
      <video controls>
        <source src="/assets/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default FullWidthVideo;
