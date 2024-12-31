import { Box, TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

interface SearchBoxProps {
    placeholder?: string; // Optional placeholder text
    onSearch?: (value: string) => void; // Callback function to handle search
}

const SearchBox: React.FC<SearchBoxProps> = ({ placeholder = "Search...", onSearch }) => {
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onSearch) {
            onSearch(event.target.value);
        }
    };

    return (
        <Box sx={{ maxWidth: 300, width: "100%" }}>
            <TextField
                size="small"
                fullWidth
                variant="outlined"
                placeholder={placeholder}
                onChange={handleSearch}
                slotProps={{
                    input: {startAdornment: (
                        <InputAdornment position="start">
                            <Search sx={{ color: "text.disabled" }} />
                        </InputAdornment>
                    )}
                }}
            />
        </Box>
    );
};

export default SearchBox;
