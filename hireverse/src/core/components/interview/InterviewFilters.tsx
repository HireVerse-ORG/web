import React from 'react';
import { Box, FormControl, InputLabel, Select, OutlinedInput, MenuItem, Checkbox, ListItemText, Typography, Button, Stack, SelectChangeEvent, Chip } from '@mui/material';
import { InterviewType, InterviewStatus } from '@core/types/interview.interface';

export interface InterviewFilterValues {
    types: InterviewType[];
    statuses: InterviewStatus[];
    upcoming: boolean;
}

export interface InterviewFiltersProps {
    filters: InterviewFilterValues;
    onFiltersChange: (filters: InterviewFilterValues) => void;
    onClearFilters: () => void;
    availableTypes?: InterviewType[];
    availableStatuses?: InterviewStatus[];
}

const defaultTypes: InterviewType[] = ['online', 'offline'];
const defaultStatuses: InterviewStatus[] = ['scheduled', 'accepted', 'rejected', 'canceled', 'expired'];

const InterviewFilters: React.FC<InterviewFiltersProps> = ({
    filters,
    onFiltersChange,
    onClearFilters,
    availableTypes = defaultTypes,
    availableStatuses = defaultStatuses,
}) => {
    const handleTypeChange = (e: SelectChangeEvent<InterviewType[]>) => {
        const value = e.target.value as InterviewType[];
        onFiltersChange({ ...filters, types: value });
    };

    const handleStatusChange = (e: SelectChangeEvent<InterviewStatus[]>) => {
        const value = e.target.value as InterviewStatus[];
        onFiltersChange({ ...filters, statuses: value });
    };

    const handleUpcomingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFiltersChange({ ...filters, upcoming: e.target.checked });
    };

    return (
        <Stack
            direction="row"
            spacing={2}
            sx={{
                mb: 3,
                flexWrap: 'wrap',
                gap: 2,
                alignItems: 'center'
            }}
        >
            {/* Type Filter */}
            <FormControl sx={{ minWidth: 120, maxWidth: 300 }} size="small">
                <InputLabel>Type</InputLabel>
                <Select
                    multiple
                    value={filters.types}
                    onChange={handleTypeChange}
                    input={<OutlinedInput label="Type" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} size="small" />
                            ))}
                        </Box>
                    )}
                >
                    {availableTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                            <Checkbox checked={filters.types.includes(type as InterviewType)} />
                            <ListItemText primary={type} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Status Filter */}
            <FormControl sx={{ minWidth: 140, maxWidth: 300 }} size="small">
                <InputLabel>Status</InputLabel>
                <Select
                    multiple
                    value={filters.statuses}
                    onChange={handleStatusChange}
                    input={<OutlinedInput label="Status" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {(selected as InterviewStatus[]).map((value) => (
                                <Typography key={value} variant="body2">{value}</Typography>
                            ))}
                        </Box>
                    )}
                >
                    {availableStatuses.map((status) => (
                        <MenuItem key={status} value={status}>
                            <Checkbox checked={filters.statuses.includes(status as InterviewStatus)} />
                            <ListItemText primary={status} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Upcoming Filter */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                    checked={filters.upcoming}
                    onChange={handleUpcomingChange}
                    color="primary"
                />
                <Typography variant="body2">Show Upcoming Only</Typography>
            </Box>

            {/* Reset Filters */}
            <Button variant="outlined" onClick={onClearFilters} size="small">
                Clear Filters
            </Button>
        </Stack>
    );
};

export default InterviewFilters;
