import { Box, Typography } from "@mui/material";

interface SubscriptionUsageCardProps {
  title: string; 
  data: Record<string, number | string>; 
}

const SubscriptionUsageCard = ({ title, data }: SubscriptionUsageCardProps) => {
  return (
    <Box
      sx={{
        mt: 4,
        p: 4,
        borderRadius: 2,
        backgroundColor: "background.paper",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        maxWidth: 600,
        mx: "auto",
        textAlign: "left",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: "bold",
          color: "primary.main",
          textAlign: "center",
        }}
      >
        {title}
      </Typography>
      <Box
        component="ul"
        sx={{
          listStyle: "none",
          p: 0,
          m: 0,
        }}
      >
        {Object.entries(data).map(([key, value], index) => (
          <Typography
            key={index}
            component="li"
            variant="body1"
            color="text.primary"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
              fontWeight: 500,
            }}
          >
            <span>{key}</span>
            <span>{value}</span>
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default SubscriptionUsageCard;
