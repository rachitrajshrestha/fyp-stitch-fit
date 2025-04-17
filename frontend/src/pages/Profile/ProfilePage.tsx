import { useState } from "react";
import ProfileDetails from "./ProfileDetails";
import MeasurementDetails from "./MeasurementDetails";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileDetails />;
      case "measurement":
        return <MeasurementDetails />;
      // case "order":
      //   return <OrderHistory />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-gray-100 p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
        <ul className="space-y-4">
          <li
            onClick={() => setActiveTab("profile")}
            className={`cursor-pointer ${
              activeTab === "profile" && "font-bold"
            }`}
          >
            My Profile
          </li>
          <li
            onClick={() => setActiveTab("measurement")}
            className={`cursor-pointer ${
              activeTab === "measurement" && "font-bold"
            }`}
          >
            Measurement
          </li>
          <li
            onClick={() => setActiveTab("order")}
            className={`cursor-pointer ${activeTab === "order" && "font-bold"}`}
          >
            Orders
          </li>
        </ul>
      </div>
      <div className="flex-1 p-6">{renderContent()}</div>
    </div>
  );
};

export default ProfilePage;
