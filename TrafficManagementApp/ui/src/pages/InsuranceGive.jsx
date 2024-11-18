import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InsuranceGive = () => {
  const [accidentId, setAccidentId] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");

  const submitForm = (e) => {
    e.preventDefault();

    giveInsurance(accidentId, registrationNumber);
  };

  const giveInsurance = async (accidentId, registrationNumber) => {
    try {
      const res = await fetch("http://localhost:5000/giveInsurance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accidentId, registrationNumber }),
      });

      const result = await res.json();

      if (result.success) {
        toast.success(`Insurance granted successfully: ${result.message}`);
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
                Grant Insurance
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
                  placeholder="e.g., A-01"
                  required
                  value={accidentId}
                  onChange={(e) => setAccidentId(e.target.value)}
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

              <div>
                <button
                  className="bg-blue-500 hover:bg-blue-600 my-10 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Grant Insurance
                </button>
                <ToastContainer />
              </div>

              <div>
                <Link to="/insuranceDashboard">
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

export default InsuranceGive;
