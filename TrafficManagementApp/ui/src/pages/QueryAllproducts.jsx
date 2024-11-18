import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const QueryAllProducts = () => {
  const [vehicleData, setVehicleData] = useState(null);

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const res = await fetch("http://localhost:5000/queryAllVehicles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await res.json();
        if (result.success) {
          setVehicleData(result.data.value);
          toast.success("Vehicle data retrieved successfully");
        } else {
          toast.error("No vehicle data found");
        }
      } catch (error) {
        toast.error("An error occurred while fetching the vehicle data");
      }
    };

    fetchVehicleData();
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-500 via-blue-400 to-blue-300 min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-xl max-w-6xl w-full p-10">
        <h2 className="text-4xl font-bold text-blue-800 mb-8 text-center">
          Vehicle Inventory
        </h2>

        {vehicleData && vehicleData.length > 0 ? (
          <div className="overflow-x-auto rounded-xl shadow-md">
            <h3 className="text-2xl font-medium text-blue-700 mb-6 text-center">
              Vehicle Details
            </h3>
            <table className="table-auto min-w-full bg-white border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-blue-700 text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase">
                    Vehicle ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase">
                    Owner Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase">
                    Registration Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase">
                    Model
                  </th>
                </tr>
              </thead>
              <tbody>
                {vehicleData.map((vehicle, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                    } hover:bg-gray-200 transition-colors`}
                  >
                    <td className="px-6 py-4 border-t border-gray-300">
                      {vehicle.Key}
                    </td>
                    <td className="px-6 py-4 border-t border-gray-300">
                      {vehicle.Record.ownerName}
                    </td>
                    <td className="px-6 py-4 border-t border-gray-300">
                      {vehicle.Record.registrationNumber}
                    </td>
                    <td className="px-6 py-4 border-t border-gray-300">
                      {vehicle.Record.model}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-6 p-6 bg-red-50 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold text-red-600 mb-4">
              No Vehicle Data Found
            </h3>
            <p className="text-gray-700">
              There is no vehicle data available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QueryAllProducts;
