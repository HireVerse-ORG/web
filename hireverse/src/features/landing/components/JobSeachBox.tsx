import { Search, LocationOnOutlined } from '@mui/icons-material';
import { Box, Button, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';

const JobSeachBox = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [location, setLocation] = useState('');

    // Mock city and country data for the select dropdowns
    const locations = [
        { city: 'New York', country: 'USA' },
        { city: 'Los Angeles', country: 'USA' },
        { city: 'Chicago', country: 'USA' },
        { city: 'San Francisco', country: 'USA' },
        { city: 'Toronto', country: 'Canada' },
        { city: 'Vancouver', country: 'Canada' },
        { city: 'London', country: 'UK' },
        { city: 'Melbourne', country: 'Australia' },
    ];

    const handleLocationChange = (event: any) => {
        setLocation(event.target.value);
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
                flexDirection: {xs: "column", sm: "row"},
                gap: {xs: 3, sm: 2},
                paddingBlock: {xs: 5, sm: 3},
                paddingInline: 3,
                backgroundColor: "background.paper",
                boxShadow: 4,
            }}
        >
            {/* Job Title Input with Bottom Border */}
            <Box sx={{
                width: "100%",
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1
            }}>
                <Search />
                <TextField
                    size="small"
                    fullWidth
                    variant='standard'
                    placeholder="Job Title or Keyword"
                    onChange={(e) => setJobTitle(e.target.value)}
                />
            </Box>

            {/* Location Selection */}
            <Box sx={{
                width: "100%",
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1
            }}>

                <LocationOnOutlined />
                <Select
                    size="small"
                    variant='standard'
                    fullWidth
                    value={location}
                    onChange={handleLocationChange}
                    displayEmpty
                    renderValue={(selected) => (selected ? selected : 'Select Location')}
                >
                    {locations.map((loc, index) => (
                        <MenuItem key={index} value={`${loc.city}, ${loc.country}`}>
                            {`${loc.city}, ${loc.country}`}
                        </MenuItem>
                    ))}
                </Select>
            </Box>

            {/* Search Button */}
            <Button variant="contained" color="primary">
                Search My Jobs
            </Button>
        </Box>
    );
};

export default JobSeachBox;
