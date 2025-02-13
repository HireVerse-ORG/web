import React, { useEffect, useRef } from "react";

interface RemoteVideoProps {
  stream: MediaStream;
  style?: React.CSSProperties;
  width?: string;
  height?: string;
}

const RemoteVideo = ({
  stream,
  style,
  width = "300px",
  height,
}: RemoteVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch((err) => console.error("Error playing video:", err));
    }
  }, [stream]);

  return (
    <video
      ref={videoRef}
      autoPlay
      style={{ width, height, ...style }}
    />
  );
};

export default RemoteVideo;
