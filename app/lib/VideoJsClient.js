"use client";

import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer = ({ src, options = undefined }) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);

    useEffect(() => {
        if(videoRef.current) {
            playerRef.current = videojs(videoRef.current, options);
        }
        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
            }
        }
    }, [options]);

    return (
        <video ref={videoRef} className="video-js" controls preload="auto">
            <source src={src} type="video/mp4" />
        </video>
    );
};

export default VideoPlayer;