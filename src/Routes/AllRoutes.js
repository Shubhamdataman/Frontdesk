import React from "react";
import { Route, Routes } from "react-router-dom";
import { StaffSchedule } from "../Components/StaffSchedule";
import CurrentOccupancy from "../Components/CurrentOccupancy";
import Arrivals from "../Components/Arrivals";
import Departures from "../Components/Departures";
import ExpectedDepartures from "../Components/ExpectedDepartures";
import ExpectedArrivals from "../Components/ExpectedArrivals";
import PendingGuestBills from "../Components/PendingGuestBills"
import CurrentOccupancyDashboard from "../Components/Dashboard/CurrentOccupancyDashboard/index.js";
import ReservationDashboard from "../Components/Dashboard/ReservationDashboard/index.js";
import GuestReservation from "../Components/Transactions/GuestReservation"
import GuestCheckIn from '../Components/Transactions/GuestCheckIn'
import GuestServics from "../Components/Transactions/GuestServices"
import PaymentReceipt from "../Components/Transactions/PaymentReceipt"
import PaymentRefund from "../Components/Transactions/PaymentRefund"
import RoomChangeEntry from "../Components/Transactions/RoomChangeEntry"
import RoomCheckOut from '../Components/Transactions/RoomCheckOut'
import CheckOutBill from '../Components/Transactions/CheckOutBill'
import RoomDisplayDashboard from "../Components/Dashboard/RoomDisplayDashboard/index.js";
const AllRoutes = () => {
  return (
    <Routes>
      {/* dashboard */}
      <Route path="/" element={<CurrentOccupancyDashboard/>}/>
      <Route path="dashboard/reservation" element={<ReservationDashboard/>}/>
      <Route path="dashboard/room-display" element={<RoomDisplayDashboard/>}/>
      {/* transactions */}
      <Route path="transactions/guest-reservation" element={<GuestReservation/>}/>
      <Route path="transactions/guest-checkin" element={<GuestCheckIn/>}/>
      <Route path="transactions/guest-services" element={<GuestServics/>}/>
      <Route path="transactions/payment-receipt" element={<PaymentReceipt/>}/>
      <Route path="transactions/payment-refund" element={<PaymentRefund/>}/>
      <Route path="transactions/room-change" element={<RoomChangeEntry/>}/>
      <Route path="transactions/room-checkout" element={<RoomCheckOut/>}/>
      <Route path="transactions/checkout-bill" element={<CheckOutBill/>}/>

    
      {/* dashboard Component */}
      <Route path="/schedule" element={<StaffSchedule />} />
      <Route path="/currentoccupancy" element={<CurrentOccupancy />} />
      <Route path="/arrivals" element={<Arrivals />} />
      <Route path="/departures" element={<Departures />} />
      <Route path="/expecteddepartures" element={<ExpectedDepartures />} />
      <Route path="/expectedarrivals" element={<ExpectedArrivals/>}/>
      <Route path="/pendingguestbills" element={<PendingGuestBills/>}/>
    </Routes>
  );
};

export default AllRoutes;
