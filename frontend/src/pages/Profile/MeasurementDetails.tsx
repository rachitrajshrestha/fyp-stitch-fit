// components/MeasurementDetails.tsx
import { useEffect, useState } from "react";
import axios from "axios";

const MeasurementDetails = () => {
  const [measurement, setMeasurement] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://localhost:8081/measurements", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const userId = JSON.parse(atob(token.split(".")[1])).id;
          const userMeasurement = res.data.find(
            (m: any) => m.userId === userId
          );
          setMeasurement(userMeasurement);
        })
        .catch((err) => console.error("Failed to fetch measurement", err));
    }
  }, []);

  if (!measurement) return <div>No measurement data available.</div>;

  const fields = [
    { id: "chest", label: "Chest" },
    { id: "waist", label: "Waist" },
    { id: "hips", label: "Hips" },
    { id: "shoulderWidth", label: "Shoulder Width" },
    { id: "sleeveLength", label: "Sleeve Length" },
    { id: "inseam", label: "Inseam" },
    { id: "neck", label: "Neck" },
    { id: "height", label: "Height" },
    { id: "legLength", label: "Leg Length" },
    { id: "thighWidth", label: "Thigh Width" },
    { id: "calvesWidth", label: "Calves Width" },
  ];

  return (
    <section id="measurements" className="mb-10">
      <h2 className="text-2xl font-bold mb-6">My Measurements</h2>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold">Body Measurements</h3>
          <p className="text-sm text-gray-500">
            Keep your measurements up to date for better fitting
            recommendations.
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {fields.map(({ id, label }) => (
              <div key={id} className="space-y-2">
                <label
                  htmlFor={id}
                  className="block text-sm font-medium text-gray-700"
                >
                  {label}
                </label>
                <input
                  id={id}
                  defaultValue={measurement[id]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                />
              </div>
            ))}
          </div>
        </div>

        {/* <div className="p-6 border-t border-gray-200">
          <button className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
            Update Measurements
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default MeasurementDetails;
