import React from 'react';
import ReactPlayer from 'react-player';

import './VideoPlayer.scss';

type TSProps = {
  source: string;
};
const VideoPlayer: React.FC<TSProps> = ({ source }) => {
  return (
    <div className="country__player">
      <ReactPlayer
        url={source}
        controls={true}
        light={false}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default VideoPlayer;
