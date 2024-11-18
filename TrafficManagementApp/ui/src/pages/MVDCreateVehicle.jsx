import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const MVDCreateVehicle = () => {
  const [vehicleId, setVehicleId] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [model, setModel] = useState("");

  const submitForm = (e) => {
    e.preventDefault();

    const newVehicle = {
      vehicleId,
      ownerName,
      registrationNumber,
      model,
    };

    addVehicle(newVehicle);
  };

  const addVehicle = async (newVehicle) => {
    try {
      const res = await fetch("http://localhost:5000/createVehicle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVehicle),
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
                Create Vehicle
              </h2>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Vehicle Id
                </label>
                <input
                  type="text"
                  id="vehicleId"
                  name="vehicleId"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. V-01"
                  required
                  value={vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Owner Name
                </label>
                <input
                  type="text"
                  id="ownerName"
                  name="ownerName"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Owner Name"
                  required
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
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
                  Model
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Model"
                  required
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
              </div>

              <div>
                <button
                  className="bg-blue-500 hover:bg-blue-600 my-10 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Create Vehicle
                </button>
                <ToastContainer /> {/* Make sure ToastContainer is included */}
              </div>

              
            <div>
              <Link to="/mvddashboard">
                <button className="bg-blue-500 hover:bg-blue-600  text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline">
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

export default MVDCreateVehicle;
