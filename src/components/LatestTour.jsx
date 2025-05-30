



import React, { useEffect, useState } from "react";
import axios from "axios";
import TourCard from "./TourCard";

export default function LatestTours({refreshTrigger}) {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/trips"); 
        console.log(res.data.data);
        setTours(res.data.data || []); 
      } catch (err) {
        setError(err.message || "Failed to fetch tours");
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [refreshTrigger]);

  return (
    <div className="h-screen overflow-y-auto">
      <div className="flex justify-between mb-3 w-full">
        <h2 className="font-bold text-lg">Latest tours</h2>
        <button className="text-xs bg-green-500 text-white px-2 py-1 rounded">
          All Tours
        </button>
      </div>

      <div className="space-y-4 h-[85%] overflow-y-auto pr-2">
        {loading && <p className="text-gray-500">Loading tours...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && tours.length === 0 && (
          <p className="text-gray-500">No tours found.</p>
        )}
        {!loading &&
          !error &&
          tours.map((tour, idx) => <TourCard key={idx} {...tour} />)}
      </div>
    </div>
  );
}
