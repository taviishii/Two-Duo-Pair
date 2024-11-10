import axios from "axios";

export const geocodeAddress = async (address) => {
    try {
        const response = await axios.get("https://nominatim.openstreetmap.org/search", {
            params: {
                q: address,
                format: "json",
            },
        });
        return response.data.length > 0 ? response.data[0] : null;
    } catch (error) {
        console.error("Error with geocoding:", error);
        throw error;
    }
};