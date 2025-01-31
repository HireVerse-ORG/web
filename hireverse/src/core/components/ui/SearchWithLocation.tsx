import { useEffect, useRef, useState } from 'react';
import { getCitiesAndCountries } from '@core/api/external/googleApi';
import colors from '@core/theme/colors';
import { Search, LocationOnOutlined } from '@mui/icons-material';
import { Box, Button, CircularProgress, debounce, MenuItem, TextField } from '@mui/material';

type SearchWithLocationProps = {
    onSearch: (searchQuery: string, location: { location: string; city: string; country: string }) => void;
    searching?: boolean;
    placeholder?: string; 
};

const SearchWithLocation = ({ onSearch, searching = false, placeholder = 'Search' }: SearchWithLocationProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState<{ location: string; city: string; country: string }>({ location: '', city: '', country: '' });
    const [locationSuggestions, setLocationSuggestions] = useState<{ location: string; city: string; country: string }[]>([]);
    const [loading, setLoading] = useState(false);

    const locationInputRef = useRef<HTMLInputElement>(null);
    const suggestionsBoxRef = useRef<HTMLDivElement>(null);

    const handleLocationInput = debounce(async (value: string) => {
        if (value.trim() === '') {
            setLocationSuggestions([]);
            return;
        }
        setLoading(true);
        try {
            const suggestions = await getCitiesAndCountries(value);
            setLocationSuggestions(suggestions);
        } catch (error) {
            setLocationSuggestions([]);
        } finally {
            setLoading(false);
        }
    }, 500);

    const handleSearch = () => {
        onSearch(searchQuery, location);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            locationInputRef.current && !locationInputRef.current.contains(event.target as Node) &&
            suggestionsBoxRef.current && !suggestionsBoxRef.current.contains(event.target as Node)
        ) {
            setLocationSuggestions([]);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 3, sm: 2 },
                paddingBlock: { xs: 5, sm: 3 },
                paddingInline: 3,
                backgroundColor: 'background.paper',
                border: `1px solid ${colors.borderColour}`,
            }}
        >
            {/* Search Input */}
            <Box
                sx={{
                    width: '100%',
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1,
                }}
            >
                <Search />
                <TextField
                    size="small"
                    fullWidth
                    variant="standard"
                    placeholder={placeholder} // Placeholder passed as prop
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Box>

            {/* Location Auto-complete */}
            <Box
                sx={{
                    width: '100%',
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1,
                }}
            >
                <LocationOnOutlined />
                <Box sx={{ position: 'relative', width: '100%' }}>
                    <TextField
                        size="small"
                        fullWidth
                        variant="standard"
                        placeholder="Enter city or country"
                        value={location.location}
                        onChange={(e) => {
                            setLocation({ location: e.target.value, city: '', country: '' });
                            handleLocationInput(e.target.value);
                        }}
                        inputRef={locationInputRef}
                    />
                    {loading && (
                        <CircularProgress
                            size={20}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                right: 10,
                                transform: 'translateY(-50%)',
                            }}
                        />
                    )}
                    {locationSuggestions.length > 0 && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                right: 0,
                                background: 'white',
                                boxShadow: 3,
                                zIndex: 10,
                                maxHeight: 200,
                                overflowY: 'auto',
                            }}
                            ref={suggestionsBoxRef}
                        >
                            {locationSuggestions.map((loc, index) => (
                                <MenuItem
                                    key={index}
                                    onClick={() => {
                                        setLocation(loc);
                                        setLocationSuggestions([]);
                                    }}
                                >
                                    {loc.location}
                                </MenuItem>
                            ))}
                        </Box>
                    )}
                </Box>
            </Box>

            {/* Search Button */}
            <Button
                variant="contained"
                color="primary"
                sx={{ width: { xs: '100%', sm: 'auto' } }}
                onClick={handleSearch}
                disabled={searching}
            >
                {searching ? <CircularProgress size={20} color="inherit" /> : 'Search'}
            </Button>
        </Box>
    );
};

export default SearchWithLocation;
