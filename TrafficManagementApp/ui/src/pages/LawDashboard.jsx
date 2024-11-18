import React from "react";
import { Link } from "react-router-dom";
import img from '../assets/images/Law.png';

const LawDashboard = () => {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center overflow-hidden">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-6">
          Law Enforcement Authority
        </h1>

        <div className="mb-6">
          <img
            src={img}
            alt="Traffic Management Authority"
            className="mx-auto rounded-lg shadow-md max-h-48 w-auto"
          />
        </div>

        {/* Vehicle Details Button */}
        <Link to="/lawreadaccident">
          <button className="bg-green-500 text-white py-2 px-4 rounded-full w-full mb-4 hover:bg-green-600">
            Accident Details
          </button>
        </Link>
              
        <Link to="/">
          <button className="bg-pink-500 text-white py-2 px-4 rounded-full w-full mb-4 hover:bg-pink-600">
            Home
          </button>
        </Link>

      
      </div>
    </div>
  );
};

export default LawDashboard;
