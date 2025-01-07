import axios from "axios";

const googleApiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

export const getCountryCodeFromName = async (countryName: string): Promise<string | null> => {
    try {
        const response = await axios.get(
            "https://maps.googleapis.com/maps/api/geocode/json",
            {
                params: {
                    address: countryName,
                    key: googleApiKey,
                },
            }
        );

        const country = response.data.results?.[0]?.address_components?.find((component: any) =>
            component.types.includes("country")
        );
        
        return country.short_name;  
    } catch (error) {
        throw new Error("Failed to get country code");
    }
};

export const getCountries = async (value: string) => {
    try {
        const response = await axios.get(
            `/place/autocomplete/json`,
            {
                baseURL: "https://maps.googleapis.com/maps/api",
                params: {
                    input: value,
                    types: "(regions)", 
                    key: googleApiKey,
                },
            }
        );

        const countries = response.data.predictions.map((prediction: any) => prediction.description);
        return countries as string[]
    } catch (error) {
        throw new Error("Error fetching countries");
    }
}

export const getCities = async (value: string, countryCode: string) => {
    try {
        const response = await axios.get(
            `/place/autocomplete/json`,
            {
                baseURL: "https://maps.googleapis.com/maps/api",
                params: {
                    input: value,
                    types: "(cities)",
                    components: `country:${countryCode}`,
                    key: googleApiKey,
                },
            }
        );

        const cities =
            response.data.predictions?.map((prediction: any) => {
                const terms = prediction.terms || [];
                return terms.length > 0 ? terms[0].value : prediction.description;
            }) || [];

        return cities as string[];
    } catch (error) {
        throw new Error("Error fetching cities");
    }
}
