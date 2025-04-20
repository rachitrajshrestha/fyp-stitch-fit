import MeasurementDetails from "./MeasurementDetails";
import { UserOrders } from "./OrderHistory";
import { ProfileDetails } from "./ProfileDetails";
import { ProfileLayout } from "./profileLayout";

export default function ProfilePage() {
  return (
    <ProfileLayout>
      <ProfileDetails />
      <MeasurementDetails />
      <UserOrders />
    </ProfileLayout>
  );
}
