import React, { useRef, useState } from "react";
import axios from "axios";

export default function CreateTourForm() {
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    description: "",
    price: "",
    discountedPrice: "",
    duration: "",
    startDate: "",
    endDate: "",
    maxGroupSize: "",
    destination: "",
    difficulty: "medium",
    activities: "",
    includedServices: "",
    excludedServices: "",
    featured: false,
  });
  const [images, setImages] = useState([]); // For multiple images
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validImages = selectedFiles.filter(file => file.type.startsWith("image/"));
    if (validImages.length !== selectedFiles.length) {
      alert("Some files are not valid images and will be ignored.");
    }
    setImages(validImages);
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    formData.discountedPrice &&
    Number(formData.discountedPrice) > Number(formData.price)
  ) {
    alert("Discounted price should not be greater than price.");
    return;
  }

  // Validate required fields before sending
  if (!formData.name.trim()) {
    alert("Tour name is required");
    return;
  }
  if (!formData.price || isNaN(Number(formData.price))) {
    alert("Price must be a number");
    return;
  }
  if (!formData.startDate) {
    alert("Start date is required");
    return;
  }
  if (!formData.endDate) {
    alert("End date is required");
    return;
  }
  if (!formData.destination.trim()) {
    alert("Destination is required");
    return;
  }
  if (!formData.description.trim()) {
    alert("Description is required");
    return;
  }

  try {
    const data = new FormData();

    // Convert date strings to ISO only if valid
    const startDateISO = formData.startDate
      ? new Date(formData.startDate).toISOString()
      : null;
    const endDateISO = formData.endDate
      ? new Date(formData.endDate).toISOString()
      : null;

    // Build cleaned data with proper type conversions
    const cleanedData = {
      ...formData,
      price: Number(formData.price),
      discountedPrice: formData.discountedPrice
        ? Number(formData.discountedPrice)
        : 0,
      duration: Number(formData.duration),
      maxGroupSize: Number(formData.maxGroupSize),
      startDate: startDateISO,
      endDate: endDateISO,
      activities: formData.activities
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
      includedServices: formData.includedServices
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
      excludedServices: formData.excludedServices
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
    };

    console.log("cleanedData to send:", cleanedData);

    // Append fields to FormData
    for (const key in cleanedData) {
      if (Array.isArray(cleanedData[key])) {
        cleanedData[key].forEach((val) => data.append(key, val));
      } else if (cleanedData[key] !== null && cleanedData[key] !== undefined) {
        data.append(key, cleanedData[key]);
      }
    }

    // Append images (files)
    images.forEach((img) => data.append("images", img));

    const token = localStorage.getItem("token");

    const res = await axios.post("http://localhost:5000/api/trips", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Tour Created Successfully!");
    console.log("Tour Created:", res.data);

    // Reset form
    setFormData({
      name: "",
      tagline: "",
      description: "",
      price: "",
      discountedPrice: "",
      duration: "",
      startDate: "",
      endDate: "",
      maxGroupSize: "",
      destination: "",
      difficulty: "medium",
      activities: "",
      includedServices: "",
      excludedServices: "",
      featured: false,
    });
    setImages([]);
    if (fileInputRef.current) fileInputRef.current.value = null;
  } catch (error) {
    console.error("Error creating tour:", error.response?.data || error);
    alert("Error creating tour");
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded shadow space-y-4 max-w-lg mx-auto"
    >
      <h2 className="text-lg font-bold mb-4">Create Tour</h2>

      <input
        className="w-full border p-2 rounded"
        placeholder="Tour Title"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="Short Description"
        name="tagline"
        value={formData.tagline}
        onChange={handleChange}
        required
      />
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Full Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        rows={4}
      />

      <div className="flex space-x-2">
        <input
          className="w-1/2 border p-2 rounded"
          placeholder="Discounted Price"
          name="discountedPrice"
          type="number"
          min="0"
          value={formData.discountedPrice}
          onChange={handleChange}
        />
        <input
          className="w-1/2 border p-2 rounded"
          placeholder="Price"
          name="price"
          type="number"
          min="0"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>

      <input
        className="w-full border p-2 rounded"
        placeholder="Duration (in days)"
        name="duration"
        type="number"
        min="1"
        value={formData.duration}
        onChange={handleChange}
        required
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="Start Date"
        name="startDate"
        type="date"
        value={formData.startDate}
        onChange={handleChange}
        required
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="End Date"
        name="endDate"
        type="date"
        value={formData.endDate}
        onChange={handleChange}
        required
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="Group Size"
        name="maxGroupSize"
        type="number"
        min="1"
        value={formData.maxGroupSize}
        onChange={handleChange}
        required
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="Destination ID"
        name="destination"
        value={formData.destination}
        onChange={handleChange}
        required
      />

      <select
        name="difficulty"
        className="w-full border p-2 rounded"
        value={formData.difficulty}
        onChange={handleChange}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="difficult">Difficult</option>
      </select>

      {/* Activities */}
      <input
        className="w-full border p-2 rounded"
        placeholder="Activities (comma separated)"
        name="activities"
        value={formData.activities}
        onChange={handleChange}
      />
      {/* Included Services */}
      <input
        className="w-full border p-2 rounded"
        placeholder="Included Services (comma separated)"
        name="includedServices"
        value={formData.includedServices}
        onChange={handleChange}
      />
      {/* Excluded Services */}
      <input
        className="w-full border p-2 rounded"
        placeholder="Excluded Services (comma separated)"
        name="excludedServices"
        value={formData.excludedServices}
        onChange={handleChange}
      />

      {/* Featured Checkbox */}
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
        />
        <span>Featured Tour</span>
      </label>

      {/* File Upload Box */}
      <div
        className="border-dashed border-2 border-gray-300 rounded h-32 flex flex-col justify-center items-center cursor-pointer"
        onClick={handleBoxClick}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === "Enter" || e.key === " ") handleBoxClick();
        }}
      >
        <span className="text-3xl">⬆</span>
        <p className="text-xs text-gray-600">Click to upload images (multiple allowed)</p>
        {images.length > 0 && (
          <p className="text-xs mt-2 text-green-600">{images.length} image(s) selected</p>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          hidden
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
      >
        Create Tour
      </button>
    </form>
  );
}
