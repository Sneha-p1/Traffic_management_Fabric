import React from "react";
import { Link } from "react-router-dom";
import img from '../assets/images/TMA.png';

const TMADashboard = () => {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center overflow-hidden">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-6">
          Traffic Management Authority
        </h1>

        <div className="mb-6">
          <img
            src={img}
            alt="Traffic Management Authority"
            className="mx-auto rounded-lg shadow-md max-h-48 w-auto"
          />
        </div>

        {/* Vehicle Details Button */}

        <Link to="/queyallvehicle">
          <button className="bg-yellow-500 text-white py-2 px-4 rounded-full w-full hover:bg-yellow-500">
            All Vehicle List
          </button>
        </Link>

        <Link to="/tmareadvehicle">
          <button className="bg-green-500 text-white py-2 px-4 rounded-full w-full mb-4 hover:bg-green-600">
            Vehicle Details
          </button>
        </Link>

        {/* Create Violation Button */}
        <Link to="/createviolation">
          <button className="bg-red-500 text-white py-2 px-4 rounded-full w-full hover:bg-red-600">
            Create Violation Data
          </button>
              </Link>
              
        <Link to="/createaccident">
          <button className="bg-blue-500 text-white py-2 px-4 mt-2 rounded-full w-full hover:bg-blue-600">
            Create Accident Data
          </button>
        </Link>
              
        <Link to="/">
          <button className="bg-pink-500 text-white py-2 px-4 mt-2 rounded-full w-full mb-4 hover:bg-pink-600">
            Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TMADashboard;
