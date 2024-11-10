import React, { useState } from "react";
import { geocodeAddress } from "./geocodeService";
import './AddressForm.css';
import { useLocation } from './LocationContext';

function AddressForm() {
    const [yourAddress, setYourAddress] = useState('');
    const [theirAddress, setTheirAddress] = useState('');
    const [error, setError] = useState('');
    const { location1, location2, updateLocation1, updateLocation2 } = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!yourAddress || !theirAddress) {
            setError("Both addresses are required.");
            return;
        }

        setError('');
        console.log("Your address:", yourAddress);
        console.log("Their address:", theirAddress);

        try {
            const locationData1 = await geocodeAddress(yourAddress);
            const locationData2 = await geocodeAddress(theirAddress);

            if (locationData1 && locationData2) {
                updateLocation1(locationData1);
                updateLocation2(locationData2);
            } else {
                setError("Unable to find one or both locations.");
            }
        } catch (error) {
            setError("An error occurred during geocoding.");
            console.error("Geocoding error:", error);
        }
    };
 
    return (
        <div className="background">
            <header className="header">
                <nav>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                    <a href="#help">Help</a>
                </nav>
            </header>
            <div className="container">
                <h1 className="welcome-text">Welcome to Two Duo Pair!</h1>
                <div className="box">
                    <h3>Find Your Meeting Spot</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="yourAddress">Your Address:</label>
                            <input
                                id="yourAddress"
                                type="text"
                                value={yourAddress}
                                onChange={(e) => setYourAddress(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="theirAddress">Their Address:</label>
                            <input
                                id="theirAddress"
                                type="text"
                                value={theirAddress}
                                onChange={(e) => setTheirAddress(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="error-text">{error}</p>}
                        <button type="submit">Submit</button>
                    </form>
                    {location1 && location2 && (
                        <div>
                            <h4>Geocoded Coordinates:</h4>
                            <p>Your Location: {location1.lat}, {location1.lon}</p>
                            <p>Their Location: {location2.lat}, {location2.lon}</p>
                        </div>
                    )}
                </div>
                <footer className="footer">
                    <p>
                        &copy; {new Date().getFullYear()} Two Duo Pair | <a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms of Service</a>
                    </p>
                </footer>
            </div>
        </div>
    );
}

export default AddressForm;