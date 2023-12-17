import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const UserDashboard = () => {
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserBookings = async () => {
    const phone = localStorage.getItem('phone');
    try {
      const res = await Axios.get(`http://localhost:8080/getUserBookings/${phone}`);
      if (res.data.status === 201) {
        const bookingsWithPayments = await Promise.all(
          res.data.data.map(async (booking) => {
            const picsResponse = await Axios.get(`http://localhost:8080/getPic/${booking.hotel}`);
            const pic = picsResponse.data.data[0];

            const payment = booking.days * pic.rent;

            return { ...booking, payment };
          })
        );

        setUserBookings(bookingsWithPayments);
      } else {
        console.log('Error fetching user bookings');
      }
    } catch (error) {
      console.error('Error fetching user bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserBookings();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-light">User Dashboard</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <ul className="list-group">
          {userBookings.map((booking, index) => (
            <li key={index} className="list-group-item">
              <h5 className="mb-3">Hotel: {booking.hotel}</h5>
              <p>Check-in: {booking.checkin}</p>
              <p>Check-out: {booking.checkout}</p>
              <p>Payment: {booking.payment}</p>
              <p className='glow-tex'>FEEL FREE TO PAY AT THE TIME OF CHECKIN</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDashboard;
