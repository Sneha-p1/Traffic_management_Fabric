import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const MVDReadVehicle = () => {
  const [vehicleId, setVehicleId] = useState("");
  const [vehicleData, setVehicleData] = useState(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const readDetails = {
      vehicleId,
    };

    const res = await fetch("/api/readVehicle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(readDetails),
    });

    const result = await res.json();
    console.log(result);

    // Check if result.data is available and set application details accordingly
    if (result.success && result.data && result.data.jsonObject) {
      const data = result.data.jsonObject;
      setVehicleData({
        model: data.model,
        ownerName: data.ownerName,
        registrationNumber: data.registrationNumber,
        status: data.status,
        vehicleId: data.vehicleId,
      });
    } else {
      toast.error("Please check vehicle id");
    }
  };

  const resetForm = () => {
    setVehicleId(""); // Clear the input field
    setVehicleData(null); // Clear the fetched data
  };

  return (
    <div className="bg-white flex items-center justify-center m-20">
      <div className="bg-blue-100 p-10 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center">
          Read Vehicle
        </h2>
        <form onSubmit={submitForm}>
          <div className="mb-4">
            <label
              htmlFor="vehicleId"
              className="block text-gray-700 font-bold mb-2"
            >
              Vehicle Id
            </label>
            <input
              type="text"
              id="vehicleId"
              name="vehicleId"
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Read
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400" >
                          Reset</button>
                          <div>
              <Link to="/mvddashboard">
                <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
                  Back
                  </button>
              </Link>
            </div>
                      

          </div>
        </form>

        {/* Conditionally render vehicle data */}
        {vehicleData && (
          <div className="mt-6 bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">
              Vehicle Details
            </h3>
            <ul className="text-gray-700">
              {Object.entries(vehicleData).map(([key, value]) => (
                <li key={key} className="mb-1">
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
                  </div>
                  
              )}
      </div>
    </div>
  );
};

export default MVDReadVehicle;

