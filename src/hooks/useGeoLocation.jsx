import { useEffect, useState } from "react";
import axios from "axios";

export default function useGeoLocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const getLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        setLocation(res.data.address);
      } catch (err) {
        setError("Failed to fetch location.");
      }
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { location, getLocation, error };
}
