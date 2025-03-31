import React, { useRef, useEffect } from 'react';
import YouTube from 'react-youtube';

function VideoPlayer({ videoId, onEnd, onInactivity }) {
  const playerRef = useRef(null);
  const inactivityTimerRef = useRef(null);
  const alarmSound = new Audio('https://www.soundjay.com/buttons/sounds/beep-07.mp3');

  const onPlayerReady = (event) => {
    playerRef.current = event.target;
  };

  const onPlayerEnd = () => {
    onEnd();
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      if (playerRef.current) {
        playerRef.current.pauseVideo();
      }
      alarmSound.play();
      inactivityTimerRef.current = setTimeout(() => {
        onInactivity();
      }, 180000); // 3 minutos em milissegundos
    } else {
      alarmSound.pause();
      alarmSound.currentTime = 0;
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="video-player">
      <YouTube 
        videoId={videoId} 
        opts={{ width: '100%', playerVars: { autoplay: 1 }}} 
        onReady={onPlayerReady} 
        onEnd={onPlayerEnd} 
      />
    </div>
  );
}

export default VideoPlayer;
