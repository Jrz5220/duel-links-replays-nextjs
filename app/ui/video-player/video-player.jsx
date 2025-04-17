"use client";

import React from "react";
import videojs from "video.js";
import VideoJSConfig from "./videojs-config";

export default function VideoPlayer({ videoSource, posterImage, videoType }) {
    const playerRef = React.useRef(null);
    const videoJsOptions = {
        controls: true,
        aspectRatio: "16:9",
        poster: posterImage,
        playbackRates: [0.5, 1, 1.5, 2],
        enableSmoothSeeking: true,
        controlBar: {
            skipButtons: {
                forward: 5,
                backward: 5
            }
        },
        userActions: {
            hotkeys: true   // default hotkeys
        },
        fluid: true,        // video will scale to fit its container
        responsive: true,   // make player controls responsive, not the player
        sources: [{
        src: videoSource,
        type: videoType
        }]
    };
    const handlePlayerReady = (player) => {
        playerRef.current = player;
        // You can handle player events here, for example:
        player.on("waiting", () => {
        videojs.log('player is waiting');
        });
        player.on("dispose", () => {
        videojs.log('player will dispose');
        });
    };

    return (
        <VideoJSConfig options={videoJsOptions} onReady={handlePlayerReady} />
    );
}