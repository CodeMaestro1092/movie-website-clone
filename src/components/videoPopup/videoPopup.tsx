
import React, { Dispatch, SetStateAction } from "react";
import ReactPlayer from "react-player/youtube";

import "./videoPopup.scss";

interface VideoPopupProps {
    show: boolean;
    setShow: (prop : boolean) => void;
    videoId: string | null | number;
    setVideoId: Dispatch<SetStateAction<null | number | string>> | Dispatch<SetStateAction<null | string>> ; 
}

const VideoPopup: React.FC<VideoPopupProps> = ({ show, setShow, videoId, setVideoId }) => {
    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
    };
    return (
        <div className={`videoPopup ${show ? "visible" : ""}`}>
            <div className="opacityLayer" onClick={hidePopup}></div>
            <div className="videoPlayer">
                <span className="closeBtn" onClick={hidePopup}>
                    Close
                </span>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    controls
                    width="100%"
                    height="100%"
                    // playing={true}
                />
            </div>
        </div>
    );
};

export default VideoPopup;