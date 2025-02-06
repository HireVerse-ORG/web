import { Box, Skeleton } from '@mui/material';

const InboxChatCardSkeleton = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 1.3,
        px: 1,
        borderBottom: `1px solid #e0e0e0`,
        cursor: 'pointer',
        transition: "all 300ms ease",
      }}
    >
      {/* Avatar Skeleton */}
      <Skeleton variant="circular" width={56} height={56} sx={{ mr: 2 }} />

      {/* Text Skeleton */}
      <Box sx={{ flex: 1, textWrap: "nowrap", overflow: "hidden" }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, mb: 0.5 }}>
          <Skeleton variant="text" width="50%" height={20} />
        </Box>
        <Skeleton variant="text" width="80%" height={18} />
      </Box>
    </Box>
  );
};

export default InboxChatCardSkeleton;
