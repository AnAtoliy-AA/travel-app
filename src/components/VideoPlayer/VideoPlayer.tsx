import React from 'react';
import ReactPlayer from 'react-player';

import './VideoPlayer.scss';

type TSProps = {
  source: string;
};
const VideoPlayer: React.FC<TSProps> = ({ source }) => {
  return (
    <div>
      Video Player
      <ReactPlayer url={source} controls={true} light={true} />
    </div>
  );
};

export default VideoPlayer;
