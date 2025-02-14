import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { getMeetingRoomDetails } from "@core/api/shared/meetingApi";
import { IMeeting } from "@core/types/meeting.interface";
import JoinMeeting from "../components/JoinMeeting";
import VideoMeeting from "../components/VideoMeeting";
import PageLoader from "@core/components/ui/PageLoader";
import { useChatSocket } from "@core/contexts/ChatSocketContext";
import useAppSelector from "@core/hooks/useSelector";

const RoomPage = () => {
    const { roomId } = useParams<{ roomId: string }>();
    const [meeting, setMeeting] = useState<IMeeting | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [joined, setJoined] = useState<boolean>(false);
    const [stream, setStream] = useState<MediaStream | null>(null);

    const user = useAppSelector((state) => state.auth.user);
    const {socket} = useChatSocket();

    // Fetch meeting details on mount
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const details = await getMeetingRoomDetails(roomId || "");
                setMeeting(details);
            } catch (err) {
                setMeeting(null);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [roomId]);

    const handleJoin = (stream: MediaStream) => {
        if(socket){
            socket.emit('join-meeting', {roomId});
            setStream(stream);
            setJoined(true);
        }
    }

    const isParticipant = meeting?.participants.some((p) => p.id === user?.id);

    if (loading) return <PageLoader />;
    if (!meeting) return <Navigate to={"/not-found"} replace />

    if (meeting.status === "active" && !isParticipant) {
        return (
          <Box p={2}>
            <Typography variant="h6" color="error" textAlign={"center"}>
              You are not authorized to join this meeting.
            </Typography>
          </Box>
        );
      }

    return (
        <Box>
            {meeting.status === "active" && !joined && (
                <JoinMeeting onJoin={handleJoin} />
            )}
            {joined && stream && <VideoMeeting stream={stream} roomId={roomId!} participants={meeting.participants} hostId={meeting.host}/>}
            {meeting.status !== "active" &&  (
                <Typography variant="h6" p={2} textAlign={"center"}>
                    This meeting is not active.
                </Typography>
            )}
        </Box>
    );
};

export default RoomPage;