import React, { useState } from "react";
import Amadeus from 'amadeus';
import express from 'express';
import axios from 'axios';


const amadeus = new Amadeus({
  client_id: process.env.API_KEY,
  client_secret: process.env.API_SECRET
})



const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchFlights = async () => {
    const accessToken = process.env.ACCESS_TOKEN;
    const endpoint = "https://test.api.amadeus.com/v2/shopping/flight-offers";

    const params = new URLSearchParams({
      originLocationCode: "NYC",
      destinationLocationCode: "SFO",
      departureDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 1 week from today
        .toISOString()
        .split("T")[0],
      adults: "1",
    });

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${endpoint}?${params}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setFlights(data.data || []);
    } catch (err) {
      console.error("Failed to fetch flights:", err);
      setError("Failed to fetch flights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1>Flight Search: NYC to SFO</h1>
      <button
        onClick={fetchFlights}

      >
        Get Flights
      </button>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      <div className="mt-6">
        {flights.length === 0 && !loading && !error && (
          <p>No flights found.</p>
        )}
        {flights.map((flight, index) => {
          const itinerary = flight.itineraries[0].segments[0];
          return (
            <div
              key={index}
              className="results"
            >
              <p>
                <strong>Flight:</strong> {itinerary.carrierCode}
                {itinerary.number}
              </p>
              <p>
                <strong>Departure:</strong> {itinerary.departure.iataCode} at{" "}
                {itinerary.departure.at}
              </p>
              <p>
                <strong>Arrival:</strong> {itinerary.arrival.iataCode} at{" "}
                {itinerary.arrival.at}
              </p>
              <p>
                <strong>Price:</strong> {flight.price.currency}{" "}
                {flight.price.total}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Flights;





