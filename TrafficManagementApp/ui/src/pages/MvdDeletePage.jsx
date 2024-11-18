import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MvdDeletePage = () => {
  const [vehicleId, setVehicleId] = useState('');
  const [message, setMessage] = useState('');

  const handleDeleteVehicle = async (e) => {
    e.preventDefault(); // Prevents the default form submission
    try {
      const response = await fetch("http://localhost:5000/deleteVehicle", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify({ vehicleId }), // Include vehicleId in the request body
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Failed to delete vehicle.');
      }
    } catch (error) {
      setMessage('An error occurred while deleting the vehicle.');
      console.error(error);
    }
  };

  return (
    <div className="bg-white flex items-center justify-center m-20">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center">Delete Vehicle</h2>
        <form onSubmit={handleDeleteVehicle} className="space-y-4">
          <div>
            <label
              htmlFor="vehicleId"
              className="block text-gray-700 font-bold mb-2"
            >
              Vehicle ID:
            </label>
            <input
              type="text"
              id="vehicleId"
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded w-full"
          >
            Delete Vehicle
          </button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}

        <div className="mt-4 text-center">
          <Link to="/mvddashboard">
            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
              Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MvdDeletePage;
