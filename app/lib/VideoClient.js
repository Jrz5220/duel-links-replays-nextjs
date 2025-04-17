"use client"

import { useState, useEffect } from "react";
import Video from "next-video";
import vampVideo from "https://d1yqznrypzyedi.cloudfront.net/vampire/vampire-v-relinquished.mp4";

export default function VideoClient() {
    const [video, setVideo] = useState<any>(null);
    useEffect(() => {
        setVideo(<Video src={vampVideo} />)
    }, []);
    return video;
}