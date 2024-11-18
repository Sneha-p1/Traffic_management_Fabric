// 
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TMACreateAccident = () => {
  const [accidentId, setAccidentId] = useState("");
  const [vehicleId, setVehicleId] = useState("");  // Ensure these are state-bound
  const [registrationNumber, setRegistrationNumber] = useState("");  // Ensure these are state-bound
  const [accidentDetails, setAccidentDetails] = useState("");

  const submitForm = (e) => {
    e.preventDefault();

    // Check that the required fields are available
    if (!vehicleId || !registrationNumber) {
      toast.error("Vehicle ID and Registration Number are required!");
      return;
    }

    const newAccidentReport = {
      accidentId,
      vehicleId,
      registrationNumber,
      accidentDetails,
    };

    addAccidentReport(newAccidentReport);
  };

  const addAccidentReport = async (newAccidentReport) => {
    try {
      const res = await fetch("http://localhost:5000/createAccident", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAccidentReport),
      });

      const result = await res.json();

      if (result.success) {
        toast.success(`${result.message}`);
      } else {
        toast.error(`Error: ${result.message}`);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <section className="bg-white mb-20 flex">
        <div className="container m-auto max-w-xl py-2">
          <div className="bg-red-100 px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form onSubmit={submitForm}>
              <h2 className="text-3xl text-red-800 text-center font-semibold mb-6">
                Report Accident
              </h2>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Accident ID
                </label>
                <input
                  type="text"
                  id="accidentId"
                  name="accidentId"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. A-01"
                  required
                  value={accidentId}
                  onChange={(e) => setAccidentId(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Vehicle ID
                </label>
                <input
                  type="text"
                  id="vehicleId"
                  name="vehicleId"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Vehicle ID"
                  required
                  value={vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Registration Number
                </label>
                <input
                  type="text"
                  id="registrationNumber"
                  name="registrationNumber"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Registration Number"
                  required
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Accident Details
                </label>
                <textarea
                  id="accidentDetails"
                  name="accidentDetails"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Describe the accident"
                  required
                  value={accidentDetails}
                  onChange={(e) => setAccidentDetails(e.target.value)}
                />
              </div>

              <div>
                <button
                  className="bg-red-500 hover:bg-red-600 my-10 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Report Accident
                </button>
                <ToastContainer />
              </div>

              <div>
                <Link to="/tmaDashboard">
                  <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline">
                    Back
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default TMACreateAccident;
