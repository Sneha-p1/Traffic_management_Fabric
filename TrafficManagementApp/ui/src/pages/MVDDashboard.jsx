import React from "react";
import { Link } from "react-router-dom";
import img from '../assets/images/MVD.png'
const MVDDashboard = () => {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center overflow-hidden">
    <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full text-center">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">
         Motor Vehicles Department
      </h1>

      <img
        src={img} // Replace with your image URL
        alt="Car Image"
        className="mx-auto mb-6 rounded-lg shadow-md max-h-48 w-auto" // Limit image height
      />

      {/* Button Container with Flexbox */}
      <div className="flex flex-col gap-4">
        <Link to="/createvehicle">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-full w-full hover:bg-blue-600">
            Vehicle Registration
          </button>
        </Link>

        <Link to="/readvehicle">
          <button className="bg-green-500 text-white py-2 px-4 rounded-full w-full hover:bg-green-600">
            Review Vehicle
          </button>
        </Link>
          
        <Link to="/queyallvehicle">
          <button className="bg-yellow-500 text-white py-2 px-4 rounded-full w-full hover:bg-yellow-500">
            All Vehicle List
          </button>
        </Link>
          
        <Link to="/deletevehicle">
          <button className="bg-black text-white py-2 px-4 rounded-full w-full hover:bg-grey-100">
             Delete Vehicle
          </button>
        </Link>
                  
        <Link to="/readvehicle">
          <button className="bg-red-500 text-white py-2 px-4 rounded-full w-full hover:bg-red-600">
             Violation Details
          </button>
        </Link>
                  
        <Link to="/">
          <button className="bg-pink-500 text-white py-2 px-4 rounded-full w-full mb-4 hover:bg-pink-600">
            Home
          </button>
        </Link>
      </div>
    </div>
  </div>
  );
};

export default MVDDashboard;
