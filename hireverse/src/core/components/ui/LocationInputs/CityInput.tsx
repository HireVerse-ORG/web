import { useEffect, useState } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { getCities, getCountryCodeFromName } from "@core/api/external/googleApi";

interface CityInputProps {
    country: string | null;
    onCityChange: (city: string | null) => void;
    error?: boolean;
    helperText?: string | false;
    initialValue?: string; 
}

const CityInput = ({ country, onCityChange, error, helperText, initialValue }: CityInputProps) => {
    const [cityOptions, setCityOptions] = useState<string[]>([]);
    const [loadingCities, setLoadingCities] = useState(false);
    const [countryCode, setCountryCode] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string | null>(initialValue || null);

    useEffect(() => {
        if (country) {
            getCountryCodeFromName(country)
                .then(data => setCountryCode(data || ""));
        }
    }, [country]);

    useEffect(() => {
        if (initialValue) {
            setSelectedCity(initialValue); 
        }
    }, [initialValue]);

    const handleCityInputChange = async (_: any, value: string) => {
        if (!country || !value) {
            setCityOptions([]);
            return;
        }
    
        setLoadingCities(true);
        try {
            const cities = await getCities(value, countryCode);
            setCityOptions(cities);
        } catch (error) {
            console.error("Error fetching cities:", error);
        } finally {
            setLoadingCities(false);
        }
    };

    return (
        <Autocomplete
            fullWidth
            value={selectedCity} 
            options={cityOptions}
            onInputChange={handleCityInputChange}
            onChange={(_, newValue) => {
                setSelectedCity(newValue); 
                onCityChange(newValue); 
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="City"
                    slotProps={{
                        input: {
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loadingCities ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }
                    }}
                    helperText={helperText}
                    error={error}
                />
            )}
            disabled={!country}
            style={{ minWidth: 200 }}
        />
    );
};

export default CityInput;
