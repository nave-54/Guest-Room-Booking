import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './over.css';
import axios from 'axios';



function Display() {
    const navigate = useNavigate();
  const location = useLocation();
  const property = location.state?.property || {};

  const [isFormVisible, setFormVisibility] = useState(false);


  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    numberOfDays: '',
    checkInDate: null,
    checkOutDate: null,
    hotel: property.name,
  });

  const requestData = {
    name: bookingData.name,
    phone: bookingData.phone,
    numberOfDays: bookingData.numberOfDays,
    checkInDate: bookingData.checkInDate ? bookingData.checkInDate.toISOString().slice(0, 19).replace('T', ' ') : null,
    checkOutDate: bookingData.checkOutDate ? bookingData.checkOutDate.toISOString().slice(0, 19).replace('T', ' ') : null,
    hotel: bookingData.hotel,
  };





const handleSubmit = (event) => {
  event.preventDefault();

  const minDuration = property.minDuration;
  const maxDuration = property.maxDuration;
  const stayingDays = bookingData.numberOfDays;

  if (stayingDays < minDuration || stayingDays > maxDuration) {
    alert(`Invalid staying days. Must be between ${minDuration} and ${maxDuration}.`);
    return;
  }


  axios.post('http://localhost:8080/Display', requestData) 
    .then(res => {
        console.log(res);
        if (res.data && res.data.error) {
            alert(res.data.error);
        } else {
            navigate('/Propu');
        }
    })
    .catch(err => console.log(err));
};


  const bookIe = () => {
    setFormVisibility(true);
  };
  const handleBookNow = async (event) => {
    const { name, value } = event.target;
    await setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    document.body.classList.add('override-background');

    return () => {
      document.body.classList.remove('override-background');
    };
  }, []);

  return (
    <div className="container mt-5">
      <div className="card">
      <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={`http://localhost:8080/upload/${property.image}`}
              alt="Property"
              style={{ width: '100%', height: '600px', objectFit: 'cover' }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={`http://localhost:8080/upload/${property.imagea}`}
              alt="Property"
              style={{ width: '100%', height: '600px', objectFit: 'cover' }}
            />
          </Carousel.Item>
        </Carousel>
        <div className="card-body">
          <h1 className="card-title text-light">{property.name}</h1>
          <p className="card-text">Available Rooms: {property.rooms}</p>
          <p className="card-text">Rent: {property.rent}</p>
          <p className="card-text">Amenities: {property.amenities}</p>
          <button className="btn btn-outline-secondary" onClick={bookIe}>
            Book Now
          </button>
        </div>
      
      </div>

      {isFormVisible && (
        <div className="mt-3">
          <h2>Booking Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={bookingData.name}
                onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                value={bookingData.phone}
                onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="numberOfDays" className="form-label">
                Number of Days
              </label>
              <input
                type="number"
                className="form-control"
                id="numberOfDays"
                value={bookingData.numberOfDays}
                onChange={(e) => setBookingData({ ...bookingData, numberOfDays: e.target.value })}
                placeholder="Enter number of days"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="checkInDate" className="form-label">
                Check-in Date
              </label>
              <DatePicker
                id="checkInDate"
                selected={bookingData.checkInDate}
                onChange={(date) => setBookingData({ ...bookingData, checkInDate: date })}
                dateFormat="yyyy-MM-dd"
                className="form-control"
                placeholderText="Select check-in date"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="checkOutDate" className="form-label">
                Check-out Date
              </label>
              <DatePicker
                id="checkOutDate"
                selected={bookingData.checkOutDate}
                onChange={(date) => setBookingData({ ...bookingData, checkOutDate: date })}
                dateFormat="yyyy-MM-dd"
                className="form-control"
                placeholderText="Select check-out date"
                required
              />
            </div>
           
            <button type="submit" className="btn btn-primary" onClick={handleBookNow}>
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Display;