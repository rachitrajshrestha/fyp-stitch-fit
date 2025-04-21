import Footer from "../../component/Footer";
import Navbar from "../../component/Navbar";
import MeasurementDetails from "./MeasurementDetails";
import { UserOrders } from "./OrderHistory";
import { ProfileDetails } from "./ProfileDetails";
import { ProfileLayout } from "./profileLayout";

export default function ProfilePage() {
  return (
    <>
      <Navbar
        theme={"light"}
        setTheme={function (theme: "light" | "dark"): void {
          throw new Error("Function not implemented.");
        }}
      />
      <ProfileLayout>
        <ProfileDetails />
        <MeasurementDetails />
        <UserOrders />
      </ProfileLayout>
      <Footer />
    </>
  );
}
