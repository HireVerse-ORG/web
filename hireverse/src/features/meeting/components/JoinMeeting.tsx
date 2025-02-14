import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import Logo from "@core/components/ui/Logo";
import VideoTile from "./VideoTile";

interface JoinMeetingProps {
    onJoin: (stream: MediaStream) => void;
}

const JoinMeeting: React.FC<JoinMeetingProps> = ({ onJoin }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                setStream(stream);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message || "Unable to access the camera. Please check your device settings.");
                setLoading(false);
            });

        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    useEffect(() => {
        if (stream && videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.load();
            videoRef.current.play();
        }
    }, [stream]);

    const handleJoinClick = () => {
        if (!error && stream) {
            onJoin(stream)
        }
    }


    return (
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            <Box sx={{ paddingBlock: 3, paddingInline: 2 }}>
                <Logo />
            </Box>
            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    justifyContent: "center",
                    p: 4,
                }}
            >
                {/* Video Preview Section */}
                <VideoTile
                    style={{
                        flex: { xs: "none", md: "0 0 60%" },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: { md: 2 },
                        mb: { xs: 2, md: 0 },
                    }}
                >
                    {loading ? (
                        <CircularProgress />
                    ) : error ? (
                        <Typography color="error">{error}</Typography>
                    ) : (
                        <>
                            <VideoTile>
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    muted
                                    playsInline
                                    onLoadedData={() => setVideoLoaded(true)}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </VideoTile>
                            {!videoLoaded && (
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                                    }}
                                >
                                    <CircularProgress color="inherit" />
                                </Box>
                            )}
                        </>
                    )}
                </VideoTile>

                {/* Text and Join Button Section */}
                <Box
                    sx={{
                        flex: { xs: "none", md: "0 0 40%" },
                        p: 2,
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        Ready to join the meeting?
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Ensure your camera and microphone are working properly before joining.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={handleJoinClick}
                        disabled={loading || Boolean(error)}
                        sx={{ mt: 2, px: 4, py: 1.5, fontSize: "1rem" }}
                    >
                        Join Meeting
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default JoinMeeting;
