import React, { useState } from "react";
import { Box, Button, IconButton, Popover, Typography, Avatar } from "@mui/material";
import Logo from "@core/components/ui/Logo";
import PeopleIcon from "@mui/icons-material/People";

interface Participant {
  id: string;
  displayName: string;
  image?: string;
}

interface MeetingHeaderProps {
  myId: string;
  hostId: string;
  participants: Participant[];
  onNotifyAll?: () => void;
  onNotifyParticipant?: (participantId: string) => void;
}

const MeetingHeader = ({
  myId,
  hostId,
  participants,
  onNotifyAll,
  onNotifyParticipant,
}: MeetingHeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleParticipantsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleParticipantsClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "participants-popover" : undefined;

  // Sort participants alphabetically by displayName
  const sortedParticipants = [...participants].sort((a, b) =>
    a.displayName.localeCompare(b.displayName)
  );

  return (
    <Box
      sx={{
        width: "100%",
        px: 2,
        py: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #ddd",
      }}
    >
      {/* Left side: Logo */}
      <Logo />

      {/* Right side: People icon button */}
      <IconButton onClick={handleParticipantsClick} color="inherit">
        <PeopleIcon />
      </IconButton>

      {/* Popover showing the participants list */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleParticipantsClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={{ 
                p: 2, 
                width: "400px", 
                maxHeight: "70vh", 
                overflowY: "auto" 
            }}>

          {/* Header in the popover */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Participants</Typography>
            {myId === hostId && onNotifyAll && (
              <Button
                variant="text"
                size="small"
                onClick={onNotifyAll}
              >
                Notify All
              </Button>
            )}
          </Box>

          {/* List of participants */}
          {sortedParticipants.map((participant) => (
            <Box
              key={participant.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
                flexWrap: "wrap",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  flexGrow: 1,
                }}
              >
                <Avatar src={participant.image} alt={participant.displayName}>
                  {!participant.image &&
                    (participant.id === myId
                      ? "You"
                      : participant.displayName.charAt(0).toUpperCase())}
                </Avatar>
                <Typography variant="body2">
                  {participant.id === myId ? "You" : participant.displayName}{" "}
                  {participant.id === hostId && "(host)"}
                </Typography>
              </Box>
              {myId === hostId && onNotifyParticipant && participant.id !== hostId && (
                <Button
                  variant="text"
                  size="small"
                  onClick={() => onNotifyParticipant(participant.id)}
                  sx={{ mt: { xs: 1, sm: 0 } }}
                >
                  Notify
                </Button>
              )}
            </Box>
          ))}
        </Box>
      </Popover>
    </Box>
  );
};

export default MeetingHeader;
