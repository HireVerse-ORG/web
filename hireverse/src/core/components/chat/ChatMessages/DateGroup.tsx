import colors from '@core/theme/colors';
import { Box, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';

type DateGroupProps = {
    date: string;
    children: React.ReactNode;
};

const DateGroup = ({ date, children }: DateGroupProps) => (
    <Box>
      <Typography
        component="div"
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: colors.secondory.veryLight,
          color: "text.primary",
          fontSize: "12px",
          fontWeight: "bold",
          padding: "5px 10px",
          borderRadius: "12px",
          width: "fit-content",
          margin: "10px auto",
        }}
      >
        {moment(date).calendar(null, {
          sameDay: "[Today]",
          lastDay: "[Yesterday]",
          lastWeek: "dddd",
          sameElse: "DD MMM YYYY",
        })}
      </Typography>
      {children}
    </Box>
  )

export default DateGroup;
