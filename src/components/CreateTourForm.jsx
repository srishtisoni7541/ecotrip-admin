// import React, { useRef, useState } from "react";
// import axios from "axios";

// export default function CreateTourForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     tagline: "",
//     description: "",
//     price: "",
//     discountedPrice: "",
//     destination: "",
//     startDate: "",
//     endDate: "",
//   });

//   const [images, setImages] = useState([]);
//   const [errorMessages, setErrorMessages] = useState([]);
//   const fileInputRef = useRef(null);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     const validImages = selectedFiles.filter((file) =>
//       file.type.startsWith("image/")
//     );
//     if (validImages.length !== selectedFiles.length) {
//       alert("Some files are not valid images and will be ignored.");
//     }
//     setImages(validImages);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessages([]);

//     // Only one key frontend validation
//     if (
//       formData.discountedPrice &&
//       Number(formData.discountedPrice) > Number(formData.price)
//     ) {
//       setErrorMessages([
//         "Discounted price should not be greater than actual price.",
//       ]);
//       return;
//     }

//     try {
//       const data = new FormData();
//       const cleanedData = {
//         ...formData,
//         price: Number(formData.price),
//         discountedPrice: formData.discountedPrice
//           ? Number(formData.discountedPrice)
//           : 0,
//       };

//       for (const key in cleanedData) {
//         if (
//           cleanedData[key] !== null &&
//           cleanedData[key] !== undefined &&
//           cleanedData[key] !== ""
//         ) {
//           data.append(key, cleanedData[key]);
//         }
//       }

//       images.forEach((img) => data.append("images", img));

//       const token = localStorage.getItem("token");

//       const res = await axios.post("http://localhost:5000/api/trips", data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       alert("Tour Created Successfully!");
//       console.log("Tour Created:", res.data);

//       // Reset form
//       setFormData({
//         name: "",
//         tagline: "",
//         description: "",
//         price: "",
//         discountedPrice: "",
//         destination: "",
//         startDate: "",
//         endDate: "",
//       });
//       setImages([]);
//       if (fileInputRef.current) fileInputRef.current.value = null;
//     } catch (error) {
//       console.error("Error creating tour:", error.response?.data || error);

//       if (error.response?.data?.errors) {
//         // If backend sends multiple errors
//         const errorsArray = Array.isArray(error.response.data.errors)
//           ? error.response.data.errors.map((err) => err.msg || err.message)
//           : [error.response.data.errors];
//         setErrorMessages(errorsArray);
//       } else if (error.response?.data?.message) {
//         // Generic message
//         setErrorMessages([error.response.data.message]);
//       } else {
//         setErrorMessages(["Something went wrong"]);
//       }
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white p-5 py-10 rounded shadow space-y-4 max-w-lg mx-auto sm:p-6 sm:py-12"
//     >
//       <h2 className="text-xl font-bold mb-6 text-center">Create Tour</h2>

//       {errorMessages.length > 0 && (
//         <div className="bg-red-100 text-red-700 p-3 rounded mb-4 space-y-1">
//           {errorMessages.map((msg, idx) => (
//             <p key={idx}>• {msg}</p>
//           ))}
//         </div>
//       )}

//       <input
//         className="w-full border p-3 rounded"
//         placeholder="Tour Title"
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//       />
//       <input
//         className="w-full border p-3 rounded"
//         placeholder="Short Description"
//         name="tagline"
//         value={formData.tagline}
//         onChange={handleChange}
//       />
//       <textarea
//         className="w-full border p-3 rounded"
//         placeholder="Full Description"
//         name="description"
//         value={formData.description}
//         onChange={handleChange}
//         rows={4}
//       />
//       <input
//         className="w-full border p-3 rounded"
//         placeholder="Destination"
//         name="destination"
//         value={formData.destination}
//         onChange={handleChange}
//       />

//       <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
//         <input
//           className="flex-1 border p-3 rounded"
//           placeholder="Discounted Price"
//           name="discountedPrice"
//           type="number"
//           min="0"
//           value={formData.discountedPrice}
//           onChange={handleChange}
//         />
//         <input
//           className="flex-1 border p-3 rounded"
//           placeholder="Price"
//           name="price"
//           type="number"
//           min="0"
//           value={formData.price}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
//         <div className="flex-1">
//           <label className="block mb-1 font-semibold">Start Date</label>
//           <input
//             className="w-full border p-3 rounded"
//             type="date"
//             name="startDate"
//             value={formData.startDate}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="flex-1">
//           <label className="block mb-1 font-semibold">End Date</label>
//           <input
//             className="w-full border p-3 rounded"
//             type="date"
//             name="endDate"
//             value={formData.endDate}
//             onChange={handleChange}
//             required
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block mb-1 font-semibold">Upload Images</label>
//         <input
//           ref={fileInputRef}
//           type="file"
//           multiple
//           accept="image/*"
//           onChange={handleFileChange}
//           className="w-full"
//         />
//         {images.length > 0 && (
//           <p className="mt-2 text-sm text-gray-600">
//             {images.length} image{images.length > 1 ? "s" : ""} selected
//           </p>
//         )}
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-green-600 text-white rounded px-4 py-3 hover:bg-green-700 transition"
//       >
//         Create Tour
//       </button>
//     </form>
//   );
// }






import React, { useRef, useState } from "react";
import axios from "axios";

export default function CreateTourForm() {
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
  const [successMessage, setSuccessMessage] = useState("");
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
    setSuccessMessage("");

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
      const data = new FormData();
      const cleanedData = {
        ...formData,
        price: Number(formData.price),
        discountedPrice: formData.discountedPrice
          ? Number(formData.discountedPrice)
          : 0,
      };

      for (const key in cleanedData) {
        if (
          cleanedData[key] !== null &&
          cleanedData[key] !== undefined &&
          cleanedData[key] !== ""
        ) {
          data.append(key, cleanedData[key]);
        }
      }

      images.forEach((img) => data.append("images", img));

      const token = localStorage.getItem("token");

      const res = await axios.post("http://localhost:5000/api/trips", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMessage("✅ Tour created successfully!");
      console.log("Tour Created:", res.data);

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
      className="bg-white p-6 py-10 rounded shadow max-w-2xl mx-auto space-y-6"
    >
      <h2 className="text-2xl font-bold text-center">Create a New Tour</h2>

      {errorMessages.length > 0 && (
        <div className="bg-red-100 text-red-700 p-3 rounded space-y-1 border border-red-300">
          {errorMessages.map((msg, idx) => (
            <p key={idx}>• {msg}</p>
          ))}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-100 text-green-700 p-3 rounded border border-green-300 text-center">
          {successMessage}
        </div>
      )}

      <div>
        <label className="block font-medium mb-1">Tour Title</label>
        <input
          className="w-full border p-3 rounded"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Kashmir Delight"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Short Tagline</label>
        <input
          className="w-full border p-3 rounded"
          name="tagline"
          value={formData.tagline}
          onChange={handleChange}
          placeholder="e.g. A perfect winter escape"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Full Description</label>
        <textarea
          className="w-full border p-3 rounded"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          placeholder="Describe the tour in detail..."
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Destination</label>
        <input
          className="w-full border p-3 rounded"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          placeholder="e.g. Srinagar"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block font-medium mb-1">Price</label>
          <input
            className="w-full border p-3 rounded"
            name="price"
            type="number"
            min="0"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-1">
          <label className="block font-medium mb-1">Discounted Price</label>
          <input
            className="w-full border p-3 rounded"
            name="discountedPrice"
            type="number"
            min="0"
            value={formData.discountedPrice}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block font-medium mb-1">Start Date</label>
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
          <label className="block font-medium mb-1">End Date</label>
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
        <label className="block font-medium mb-1">Upload Images</label>
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
        className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
      >
        Create Tour
      </button>
    </form>
  );
}
