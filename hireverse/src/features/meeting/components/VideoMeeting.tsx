import { useChatSocket } from "@core/contexts/ChatSocketContext";
import useAppSelector from "@core/hooks/useSelector";
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import RemoteVideo from "./RemoteVideo";
import MeetingPageLayout from "./layouts/MeetingPageLayout";
import MeetingControls from "./MeetingControls";
import colors from "@core/theme/colors";
import VideoTile from "./VideoTile";
import { UserRoles } from "@core/types/user.interface";
import { toast } from "sonner";
import { getUserDashboardPath } from "@core/utils/helper";
import MeetingHeader from "./MeetingHeader";

interface PeerConnectionData {
    connection: RTCPeerConnection;
    remoteStream: MediaStream;
}

type VideoMeetingProps = {
    stream: MediaStream;
    roomId: string;
    participants: {
        id: string;
        role: UserRoles;
        displayName: string;
        image?: string;
    }[];
    hostId: string;
};

const VideoMeeting = ({ stream, roomId, participants, hostId }: VideoMeetingProps) => {
    const { socket } = useChatSocket();
    const user = useAppSelector((state) => state.auth.user);

    const [peerConnections, setPeerConnections] = useState<{ [peerId: string]: PeerConnectionData }>({});
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [videoEnabled, setVideoEnabled] = useState(true);
    const localVideoRef = useRef<HTMLVideoElement>(null);

    const [remoteMuteStates, setRemoteMuteStates] = useState<{ [peerId: string]: boolean }>({});
    const [remoteVideoOffStates, setRemoteVideoOffStates] = useState<{ [peerId: string]: boolean }>({});

    // Local stream setup.
    useEffect(() => {
        if (stream && localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
            localVideoRef.current.load();
            localVideoRef.current.play();
        }
    }, [stream]);

    const createPeerConnection = (
        peerId: string,
        isInitiator: boolean,
        incomingOffer?: RTCSessionDescriptionInit
    ) => {
        const config = {
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        };
        const pc = new RTCPeerConnection(config);
        const remoteStream = new MediaStream();

        // Add all local tracks.
        stream.getTracks().forEach((track) => {
            pc.addTrack(track, stream);
        });

        // Handle remote track.
        pc.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
                remoteStream.addTrack(track);
            });
            setPeerConnections((prev) => ({
                ...prev,
                [peerId]: { connection: pc, remoteStream },
            }));
        };

        // Handle ICE candidate.
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket?.emit("signal", {
                    to: peerId,
                    signal: { type: "candidate", candidate: event.candidate },
                });
            }
        };

        if (isInitiator) {
            // Create an SDP offer if this peer is the initiator.
            pc.createOffer()
                .then((offer) => pc.setLocalDescription(offer))
                .then(() => {
                    socket?.emit("signal", {
                        to: peerId,
                        signal: { type: "offer", sdp: pc.localDescription },
                    });
                })
                .catch((err) => console.error("Error creating offer:", err));
        } else if (incomingOffer) {
            // For a non-initiator, set the remote description with the incoming offer and create an answer.
            pc.setRemoteDescription(new RTCSessionDescription(incomingOffer))
                .then(() => pc.createAnswer())
                .then((answer) => pc.setLocalDescription(answer))
                .then(() => {
                    socket?.emit("signal", {
                        to: peerId,
                        signal: { type: "answer", sdp: pc.localDescription },
                    });
                })
                .catch((err) => console.error("Error handling incoming offer:", err));
        }

        return pc;
    };

    useEffect(() => {
        if (!socket) return;

        socket.on("user-joined", ({ userId }: { userId: string }) => {
            if (userId === user?.id) return;

            const profile = participants.find(p => p.id === userId);
            if (profile?.displayName) {
                toast.info(`${profile.displayName} joined`);
            }
            const pc = createPeerConnection(userId, true);
            setPeerConnections((prev) => ({
                ...prev,
                [userId]: { connection: pc, remoteStream: new MediaStream() },
            }));
        });

        socket.on("signal", ({ signal, from }: { signal: any; from: string }) => {
            if (signal.type === "offer") {
                const pc = createPeerConnection(from, false, signal.sdp);
                setPeerConnections((prev) => ({
                    ...prev,
                    [from]: { connection: pc, remoteStream: new MediaStream() },
                }));
            } else if (signal.type === "answer") {
                const peerData = peerConnections[from];
                if (peerData) {
                    peerData.connection
                        .setRemoteDescription(new RTCSessionDescription(signal.sdp))
                        .catch((err) => console.error("Error setting remote description (answer):", err));
                }
            } else if (signal.type === "candidate") {
                const peerData = peerConnections[from];
                if (peerData) {
                    peerData.connection
                        .addIceCandidate(new RTCIceCandidate(signal.candidate))
                        .catch((err) => console.error("Error adding ICE candidate:", err));
                }
            }
        });

        socket.on("user-left", ({ userId }: { userId: string }) => {
            const profile = participants.find(p => p.id === userId);
            if (profile?.displayName) {
                toast.info(`${profile.displayName} left the meet`,);
            }

            const peerData = peerConnections[userId];
            if (peerData) {
                peerData.connection.close();
                setPeerConnections((prev) => {
                    const updated = { ...prev };
                    delete updated[userId];
                    return updated;
                });
            }
        });

        socket.on("mute-changed", ({ userId, muted }: { userId: string; muted: boolean }) => {
            setRemoteMuteStates((prev) => ({
                ...prev,
                [userId]: muted,
            }));
        });

        socket.on("video-state-changed", ({ userId, videoState }: { userId: string; videoState: boolean }) => {
            setRemoteVideoOffStates((prev) => ({
                ...prev,
                [userId]: videoState,
            }));
        });

        socket.on("meeting-ended", () => {
            toast.info("The meeting has been ended by the host.");
            socket.emit("leave-meeting", { roomId });
            window.location.href = getUserDashboardPath(user?.role!);
        });

        return () => {
            socket.off("user-joined");
            socket.off("signal");
            socket.off("user-left");
            socket.off("mute-changed");
            socket.off("video-state-changed");
            socket.off("meeting-ended");
        };
    }, [socket, peerConnections, stream, user]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            if (socket) {
                socket.emit("leave-meeting", { roomId });
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("unload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("unload", handleBeforeUnload);
        };
    }, [socket, roomId]);

    // Control functions.
    const toggleAudio = () => {
        if (stream) {
            stream.getAudioTracks().forEach((track) => {
                track.enabled = !track.enabled;
            });
            setAudioEnabled((prev) => {
                const newState = !prev;
                socket?.emit("mute-changed", { muted: !newState, roomId });
                return newState;
            });
        }
    };

    const toggleVideo = () => {
        if (stream) {
            stream.getVideoTracks().forEach((track) => {
                track.enabled = !track.enabled;
            });
            setVideoEnabled((prev) => {
                const newState = !prev;
                socket?.emit("video-state-changed", { videoState: !newState, roomId });
                return newState;
            });
        }
    };

    const handleEndCall = () => {
        if (user?.id === hostId) {
            const confirmed = window.confirm(
                "You are the host. Do you want to end the meeting for everyone?"
            );

            if (!confirmed) {
                return;
            }

            socket?.emit("end-meeting", { roomId });
            window.location.href = getUserDashboardPath(user?.role!);
            return;
        }

        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
        }
        Object.keys(peerConnections).forEach((peerId) => {
            peerConnections[peerId].connection.close();
        });
        if (socket) {
            socket.emit("leave-meeting", { roomId });
            window.location.reload();
        }
    };

    const handleNotifyParticipant = (participantId: string) => {
        socket?.emit("notify-participant-meeting", { participantId, roomId });
        toast.success("Notification sent to participant.");
    }

    const MY_PROFILE = participants.find((p) => p.id === user?.id);

    return (
        <MeetingPageLayout
            header={
                <MeetingHeader
                    myId={user?.id!}
                    hostId={hostId}
                    participants={participants}
                    onNotifyParticipant={handleNotifyParticipant}
                />
            }
        >
            <Box
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* Videos container */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                        boxShadow: "inset 0px 0px 10px rgba(0,0,0,0.2)",
                        background: colors.secondory.veryLight,
                        placeItems: "center",
                        gap: 2,
                        flexGrow: 1,
                        padding: 2,
                    }}
                >
                    {/* Local video */}
                    <VideoTile
                        displayName={MY_PROFILE?.displayName}
                        image={MY_PROFILE?.image}
                        muted={!audioEnabled}
                        videoOff={!videoEnabled}
                    >
                        <video
                            autoPlay
                            muted
                            ref={localVideoRef}
                            style={{
                                width: "100%",
                                height: "105%",
                                objectFit: "cover",
                            }}
                        />
                    </VideoTile>

                    {/* Render remote videos */}
                    {Object.keys(peerConnections).map((peerId) => {

                        const profile = participants.find((p) => p.id === peerId);

                        return (
                            <VideoTile key={peerId}
                                displayName={profile?.displayName}
                                image={profile?.image}
                                muted={!!remoteMuteStates[peerId]}
                                videoOff={!!remoteVideoOffStates[peerId]}
                            >
                                <RemoteVideo
                                    stream={peerConnections[peerId].remoteStream}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </VideoTile>
                        )
                    })}
                </Box>

                <Box sx={{ mt: "auto" }}>
                    <MeetingControls
                        audioEnabled={audioEnabled}
                        videoEnabled={videoEnabled}
                        onToggleAudio={toggleAudio}
                        onToggleVideo={toggleVideo}
                        onEndCall={handleEndCall}
                    />
                </Box>
            </Box>
        </MeetingPageLayout>
    );
};

export default VideoMeeting;
