
import React from "react";
export default function TourCard({ images, description, startDate, name }) {
  return (
    <div className="rounded flex gap-5 p-4 shadow">
      <img
        src={images[0] || "https://images.unsplash.com/photo-1656828059237-add66db82a2b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8anVuZ2xlJTIwc2FmYXJpfGVufDB8fDB8fHww"}
        alt="Tour"
        className="w-64 h-40 object-cover rounded"
      />
    <div>
          <h3 className="text-md font-semibold mt-2">{name}</h3>
      <p className="mt-1 text-sm text-gray-600">
        {description.slice(0, 100)}...
      </p>
      <p className="text-xs text-gray-500 mt-1">
        Start Date: {new Date(startDate).toLocaleDateString()}
      </p>
      <button className="p-2 rounded-md bg-green-600 text-white mt-6">Edit Tour</button>
    </div>
    </div>
  );
}
