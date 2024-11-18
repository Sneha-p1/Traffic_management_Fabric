import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const LawReadAccident = () => {
  const [accidentId, setAccidentId] = useState("");
  const [accidentData, setAccidentData] = useState(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const readDetails = {
      accidentId,
    };

    try {
      // Fetch accident details from the backend API
      const res = await fetch("/api/readAccident", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(readDetails),
      });

      const result = await res.json();
      console.log(result);

      // Check if result.data is available and set accident details accordingly
      if (result.success && result.data && result.data.jsonObject) {
        const data = result.data.jsonObject;
          setAccidentData({
            accidentId: data.accidentId,
            vehicleId: data.vehicleId,
            registrationNumber: data.registrationNumber,
            accidentDetails: data.accidentDetails
       });
      } else {
        toast.error("Please check the accident ID");
      }
    } catch (error) {
      console.error("Error fetching accident details:", error);
      toast.error("Error fetching accident details");
    }
  };

  const resetForm = () => {
    setAccidentId(""); // Clear the input field
    setAccidentData(null); // Clear the fetched data
  };

  return (
    <div className="bg-white flex items-center justify-center m-20">
      <div className="bg-blue-100 p-10 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center">
          Read Accident Report
        </h2>
        <form onSubmit={submitForm}>
          <div className="mb-4">
            <label
              htmlFor="accidentId"
              className="block text-gray-700 font-bold mb-2"
            >
              Accident ID
            </label>
            <input
              type="text"
              id="accidentId"
              name="accidentId"
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={accidentId}
              onChange={(e) => setAccidentId(e.target.value)}
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
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Reset
            </button>
            <div>
              <Link to="/ledashboard">
                <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
                  Back
                </button>
              </Link>
            </div>
          </div>
        </form>

        {/* Conditionally render accident data */}
        {accidentData && (
          <div className="mt-6 bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">
              Accident Details
            </h3>
            <ul className="text-gray-700">
              {Object.entries(accidentData).map(([key, value]) => (
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

export default LawReadAccident;
