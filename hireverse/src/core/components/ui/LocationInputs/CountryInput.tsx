import { useState, useEffect } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { getCountries } from "@core/api/external/googleApi";

type CountryInputProps = {
    onCountryChange: (country: string | null) => void;
    error?: boolean;
    helperText?: string | false;
    initialValue?: string; 
};

const CountryInput = ({ onCountryChange, error, helperText, initialValue }: CountryInputProps) => {
    const [options, setOptions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(initialValue || null);

    useEffect(() => {
        if (initialValue) {
            setSelectedCountry(initialValue); 
        }
    }, [initialValue]);

    const handleInputChange = async (_: any, value: string) => {
        if (!value) {
            setOptions([]);
            return;
        }
        setLoading(true);
        try {
            const countries = await getCountries(value);
            setOptions(countries);
        } catch (error) {
            console.error("Error fetching countries:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Autocomplete
            options={options}
            value={selectedCountry} 
            onChange={(_, newValue) => {
                setSelectedCountry(newValue); 
                onCountryChange(newValue); 
            }}
            onInputChange={handleInputChange}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Country"
                    slotProps={{
                        input: {
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }
                    }}
                    helperText={helperText}
                    error={error}
                />
            )}
            style={{ minWidth: 200 }}
        />
    );
};

export default CountryInput;
