import React, { useState } from "react";

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchFlights = async () => {
    const clientId = 'y7sXBTfgJZqstDIvdJplxb9THVw3FcbC';
    const clientSecret = '4GTCuEWlr6ShF1fr';
    const clientId2 = process.env.CLIENT_ID;
    const clientSecret2 = process.env.CLIENT_SECRET;

    const tokenEndpoint = "https://test.api.amadeus.com/v1/security/oauth2/token";
    const flightsEndpoint = "https://test.api.amadeus.com/v2/shopping/flight-offers";
    console.log("Client ID:", clientId);
    console.log("Client Secret:", clientSecret);
    console.log(import.meta.env);
    console.log(clientId2);

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
      // Step 1: Request Access Token
      const tokenResponse = await fetch(tokenEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: clientId,
          client_secret: clientSecret,
        }),
      });

      if (!tokenResponse.ok) {
        throw new Error(`Token Error: ${tokenResponse.status}`);
      }

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      // Step 2: Fetch Flights
      const response = await fetch(`${flightsEndpoint}?${params}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Flights Error: ${response.status} - ${response.statusText}`);
      }

      const flightData = await response.json();
      setFlights(flightData.data || []);
    } catch (err) {
      console.error("Error fetching flights:", err);
      setError("Failed to fetch flights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Flight Search: NYC to SFO</h1>
      <button
        onClick={fetchFlights}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Get Flights
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mt-6">
        {flights.length === 0 && !loading && !error && (
          <p>No flights found.</p>
        )}
        {flights.map((flight, index) => {
          const itinerary = flight.itineraries[0].segments[0];
          return (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded shadow-md mb-4"
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
