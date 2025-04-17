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

  return (
    <div>
      <h2>Measurement Details</h2>
      <p>
        <strong>Chest:</strong> {measurement.chest}
      </p>
      <p>
        <strong>Waist:</strong> {measurement.waist}
      </p>
      <p>
        <strong>Hips:</strong> {measurement.hips}
      </p>
      <p>
        <strong>Shoulder Width:</strong> {measurement.shoulderWidth}
      </p>
      <p>
        <strong>Sleeve Length:</strong> {measurement.sleeveLength}
      </p>
      <p>
        <strong>Inseam:</strong> {measurement.inseam}
      </p>
      <p>
        <strong>Neck:</strong> {measurement.neck}
      </p>
      <p>
        <strong>Height:</strong> {measurement.height}
      </p>
      <p>
        <strong>Leg Length:</strong> {measurement.legLength}
      </p>
      <p>
        <strong>Thigh Width:</strong> {measurement.thighWidth}
      </p>
      <p>
        <strong>Calves Width:</strong> {measurement.calvesWidth}
      </p>
    </div>
  );
};

export default MeasurementDetails;
