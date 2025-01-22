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
        return null;
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
        return [];
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
        return [];
    }
}

export const getCitiesAndCountries = async (
    query: string
): Promise<{ location: string; city: string; country: string }[]> => {
    try {
        const response = await axios.get("https://maps.googleapis.com/maps/api/place/autocomplete/json", {
            params: {
                input: query,
                types: "(regions)", 
                key: googleApiKey,
            },
        });

        const results: { location: string; city: string; country: string }[] = response.data.predictions?.map((prediction: any) => {
            const terms = prediction.terms || [];
            const isCountry = prediction.types.includes("country");
            const isCity = prediction.types.includes("locality") || prediction.types.includes("administrative_area_level_1");

            const city = isCity ? terms[0]?.value || "" : "";
            const country = isCity || isCountry ? terms[terms.length - 1]?.value || "" : "";

            return {
                location: prediction.description, 
                city,
                country,
            };
        });

        return results.filter((item) => item.city || item.country);
    } catch (error) {
        console.error("Error fetching cities and countries:", error);
        return [];
    }
};