
import React from "react";
export default function TourCard({ images, description, startDate, name }) {
  return (
    <div className="rounded flex gap-5 p-4 shadow">
      <img
        src={images[0]}
        alt="Tour"
        className="w-full h-40 object-cover rounded"
      />
    <div>
          <h3 className="text-md font-semibold mt-2">{name}</h3>
      <p className="mt-1 text-sm text-gray-600">
        {description.slice(0, 100)}...
      </p>
      <p className="text-xs text-gray-500 mt-1">
        Start Date: {new Date(startDate).toLocaleDateString()}
      </p>
      <button className="p-2 rounded-md bg-blue-600 text-white mt-6">Edit Tour</button>
    </div>
    </div>
  );
}
