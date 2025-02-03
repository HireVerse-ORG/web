import { formatCount } from "@core/utils/helper";
import { GroupOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

type FollowersCountProps = {
    count: number;
}

const FollowersCount = ({count}: FollowersCountProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                mt: 1,
                color: "lightgray",
            }}
        >
            <GroupOutlined sx={{ mr: 0.5, fontSize: 18, color: "text.secondary" }} />
            <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: "bold" }}>
                {`${formatCount(count)} ${count === 1 ? "follower" : "followers"}`}
            </Typography>
        </Box>
    );
}

export default FollowersCount;
