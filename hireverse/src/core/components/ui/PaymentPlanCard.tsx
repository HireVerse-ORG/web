import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Chip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

interface PaymentPlanCardProps {
  planName: string;
  rate: string;
  duration: string;
  features: { name: string; available: boolean }[];
  isPopular?: boolean;
  isActive?: boolean;
  isCurrentPlan?: boolean;
  buttonText?: string;
  disabled?: boolean;
  onSubscribe: () => void;
}

const PaymentPlanCard: React.FC<PaymentPlanCardProps> = ({
  planName,
  rate,
  duration,
  features,
  isPopular = false,
  isActive = true,
  isCurrentPlan = false,
  onSubscribe,
  buttonText = "Subscribe",
  disabled = false
}) => {
  return (
    <Card
      sx={{
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        overflow: 'visible',
        borderRadius: 1,
        opacity: isActive ? 1 : 0.5,
        pointerEvents: isActive ? 'auto' : 'none',
        backgroundColor: isPopular ? 'primary.main' : 'white',
        color: isPopular ? 'white' : 'text.primary',
      }}
    >
      {isPopular && (
        <Chip
          label="Popular"
          size='small'
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            fontWeight: 'bold',
            color: "primary",
            backgroundColor: "white"
          }}
        />
      )}
      {isCurrentPlan && (
        <Chip
          label="Active"
          color="success"
          size='small'
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            fontWeight: 'bold',
            color: (theme) => theme.palette.success.contrastText,
            backgroundColor: (theme) => theme.palette.success.main, 
          }}
        />
      )}
      <CardContent>
        <Typography
          variant="h5"
          fontWeight="bold"
          align="center"
          gutterBottom
        >
          {planName}
        </Typography>
        <Typography variant="h6" align="center" sx={{ mb: 2 }}>
          <span style={{ fontWeight: 600, fontSize: '40px' }}>{rate}</span>{' '}
          <span style={{ fontWeight: 400 }}>/{duration}</span>
        </Typography>
        <List>
          {features.map((feature, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: '24px',
                }}
              >
                {feature.available ? (
                  <CheckCircleIcon sx={{ fontSize: '18px', color: isPopular ? "white" : "primary.main" }} />
                ) : (
                  <CancelIcon color="error" sx={{ fontSize: '18px' }} />
                )}
              </ListItemIcon>
              <ListItemText primary={feature.name} />
            </ListItem>
          ))}
        </List>
        <Box textAlign="center" mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={onSubscribe}
            fullWidth
            disabled={!isActive || disabled}
            sx={{
              background: isPopular ? "white" : "primary",
              color: isPopular ? "black" : "white",
            }}
          >
            {buttonText}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PaymentPlanCard;
