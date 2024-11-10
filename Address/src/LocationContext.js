import React, { createContext, useState, useContext } from 'react';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [location1, setLocation1] = useState(null);
    const [location2, setLocation2] = useState(null);

    const updateLocation1 = (locationData) => {
        setLocation1(locationData);
    };

    const updateLocation2 = (locationData) => {
        setLocation2(locationData);
    };

    return (
        <LocationContext.Provider value={{ location1, location2, updateLocation1, updateLocation2 }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => useContext(LocationContext);
