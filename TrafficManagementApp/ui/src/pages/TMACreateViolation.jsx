import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TMACreateViolation = () => {
  const [violationId, setViolationId] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [description, setDescription] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
  
    const newViolation = {
      violationId,
      vehicleId,
      registrationNumber,
      description,
    };
  
    // Call the backend API to create the violation
    try {
      const res = await fetch("http://localhost:5000/createViolation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newViolation),
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
          <div className="bg-blue-100 px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form onSubmit={submitForm}>
              <h2 className="text-3xl text-blue-800 text-center font-semibold mb-6">
                Create Violation
              </h2>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Violation Id
                </label>
                <input
                  type="text"
                  id="violationId"
                  name="violationId"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="e.g., vio-01"
                  required
                  value={violationId}
                  onChange={(e) => setViolationId(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Vehicle Id
                </label>
                <input
                  type="text"
                  id="vehicleId"
                  name="vehicleId"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="e.g., V-01"
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
                  placeholder="e.g., KL07CC1000"
                  required
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Violation description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <button
                  className="bg-blue-500 hover:bg-blue-600 my-10 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Create Violation
                </button>
                <ToastContainer /> {/* Ensure ToastContainer is included */}
              </div>

              <div>
                <Link to="/tmadashboard">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline">
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

export default TMACreateViolation;
