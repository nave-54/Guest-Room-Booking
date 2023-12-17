import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './main.css';
import { Button, Carousel } from 'react-bootstrap';

function Propu() {
  const phone = localStorage.getItem('phone');
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getuserdata = async () => {
    try {
      const res = await Axios.get(`http://localhost:8080/getf`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.data.status === 201) {
        console.log('Data get');
        setData(res.data.data);
      } else {
        console.log('Error');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getuserdata();
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token);

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      await Axios.post('http://localhost:8080/logout', {}, { headers });

      localStorage.removeItem('token');
      localStorage.removeItem('phone');

      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const navigateToUserDashboard = () => {
    navigate('/user/dashboard');
  };

  return (
    <>
      <div className="image d-flex justify-content-around">
        <h3 className="p-3 flex-grow-2">
          <Link className="navbar-brand text-dark" to='/'>
            Guest Room Booking
            <p className="ft-1 fs-3">
              <span>Your Gateway to </span>Exceptional Stays
            </p>
          </Link>
        </h3>
        <div className="di flex justify-content-evenly">
          <button onClick={handleLogout} className="p-2 btn btn-outline-secondary mx-2">
            Logout
          </button>
          
          <button onClick={navigateToUserDashboard} className="p-2 btn btn-primary mx-2">
            User Dashboard
          </button>
        </div>
      </div>
      <br />
      <br />
      <br />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="property-container">
          {data.map((property, index) => (
            <div key={index} className="property-box">
              <h1 className="glow-tex text-light" style={{ fontFamily: 'cursive' }}>
                {property.name}
              </h1>
              <div className="container mt-5">
                <Carousel>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={`http://localhost:8080/upload/${property.image}`}
                      alt="Property"
                      style={{ width: '300px', height: '300px', objectFit: 'cover' }}
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={`http://localhost:8080/upload/${property.imagea}`}
                      alt="Property"
                      style={{ width: '300px', height: '300px', objectFit: 'cover' }}
                    />
                  </Carousel.Item>
                </Carousel>
              </div>
              <p>Available Rooms: {property.rooms}</p>
              <p>Rent: {property.rent}</p>
              <p>Amenities: {property.amenities}</p>
              <Button
                className="btn btn-close-white"
                onClick={() => {
                  console.log('Navigating to /display with property:', property);
                  navigate('/Display', { state: { property } });
                }}
              >
                View details
              </Button>
            </div>
          ))}
        </div>
      )}

    

      <footer className="contact-footer bg-dark text-light py-3">
        <div className="container text-center">
          <h3>Contact Us</h3>
          <p>Email: booking@gmail.com</p>
          <p>Phone: 12345678</p>
        </div>
      </footer>
    </>
  );
}

export default Propu;