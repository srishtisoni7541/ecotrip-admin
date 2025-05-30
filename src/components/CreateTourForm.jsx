import React, { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreateTourForm({onCreated}) {
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    description: "",
    price: "",
    discountedPrice: "",
    destination: "",
    startDate: "",
    endDate: "",
  });

  const [images, setImages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
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
    const validImages = selectedFiles.filter((file) =>
      file.type.startsWith("image/")
    );
    if (validImages.length !== selectedFiles.length) {
      alert("Some files are not valid images and will be ignored.");
    }
    setImages(validImages);
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMessages([]);

  // Price Validation
  if (
    formData.discountedPrice &&
    Number(formData.discountedPrice) > Number(formData.price)
  ) {
    setErrorMessages([
      "Discounted price should not be greater than actual price.",
    ]);
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const cleanedData = {
      ...formData,
      price: Number(formData.price),
      discountedPrice: formData.discountedPrice
        ? Number(formData.discountedPrice)
        : 0,
    };

    const res = await axios.post("http://localhost:5000/api/trips", cleanedData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Tour Created Successfully!");
    console.log("Tour Created:", res.data);
     if (onCreated) {
      onCreated();
    }

    // Reset form
    setFormData({
      name: "",
      tagline: "",
      description: "",
      price: "",
      discountedPrice: "",
      destination: "",
      startDate: "",
      endDate: "",
    });

    // Clear file input and images even if unused
    setImages([]);
    if (fileInputRef.current) fileInputRef.current.value = null;

  } catch (error) {
    console.error("Error creating tour:", error.response?.data || error);

    if (error.response?.data?.errors) {
      const errorsArray = Array.isArray(error.response.data.errors)
        ? error.response.data.errors.map((err) => err.msg || err.message)
        : [error.response.data.errors];
      setErrorMessages(errorsArray);
    } else if (error.response?.data?.message) {
      setErrorMessages([error.response.data.message]);
    } else {
      setErrorMessages(["Something went wrong"]);
    }
  }
};


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 py-10 rounded shadow space-y-4 max-w-lg mx-auto sm:p-6 sm:py-12"
    >
      <h2 className="text-xl font-bold mb-6 text-center">Create Tour</h2>

      {errorMessages.length > 0 && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 space-y-1">
          {errorMessages.map((msg, idx) => (
            <p key={idx}>• {msg}</p>
          ))}
        </div>
      )}

      <input
        className="w-full border p-3 rounded"
        placeholder="Tour Title"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        className="w-full border p-3 rounded"
        placeholder="Short Description"
        name="tagline"
        value={formData.tagline}
        onChange={handleChange}
      />
      <textarea
        className="w-full border p-3 rounded"
        placeholder="Full Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows={4}
      />
      <input
        className="w-full border p-3 rounded"
        placeholder="Destination"
        name="destination"
        value={formData.destination}
        onChange={handleChange}
      />

      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <input
          className="flex-1 border p-3 rounded"
          placeholder="Discounted Price"
          name="discountedPrice"
          type="number"
          min="0"
          value={formData.discountedPrice}
          onChange={handleChange}
        />
        <input
          className="flex-1 border p-3 rounded"
          placeholder="Price"
          name="price"
          type="number"
          min="0"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <div className="flex-1">
          <label className="block mb-1 font-semibold">Start Date</label>
          <input
            className="w-full border p-3 rounded"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-1">
          <label className="block mb-1 font-semibold">End Date</label>
          <input
            className="w-full border p-3 rounded"
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 font-semibold">Upload Images</label>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />
        {images.length > 0 && (
          <p className="mt-2 text-sm text-gray-600">
            {images.length} image{images.length > 1 ? "s" : ""} selected
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white rounded px-4 py-3 hover:bg-green-700 transition"
      >
        Create Tour
      </button>
    </form>
  );
}
