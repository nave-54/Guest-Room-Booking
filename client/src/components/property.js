import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './main.css';

function Property() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [editMinDuration, setEditMinDuration] = useState('');
  const [editMaxDuration, setEditMaxDuration] = useState('');

  const getuserdata = async () => {
    try {
      const res = await Axios.get(`http://localhost:8080/getdata?phone=${parseInt(localStorage.getItem('phone'), 10)}`, {
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
    }
  };

  useEffect(() => {
    getuserdata();
  }, []);

  const handleViewDetails = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  const handleEdit = (propertyId, minDuration, maxDuration) => {
    setEditMinDuration(minDuration);
    setEditMaxDuration(maxDuration);
  };

  const handleEditSubmit = async (propertyId) => {
    try {
      const res = await Axios.put(`http://localhost:8080/editProperty/${propertyId}`, {
        minduration: editMinDuration,
        maxduration: editMaxDuration,
      });

      if (res.data.status === 200) {
        setEditMinDuration('');
        setEditMaxDuration('');
        getuserdata();
      } else {
        console.log('Error editing property');
      }
    } catch (error) {
      console.error('Error editing property:', error);
    }
  };

  const handleDelete = async (propertyId) => {
    try {
      const res = await Axios.delete(`http://localhost:8080/deleteProperty/${propertyId}`);

      if (res.data.status === 200) {
        getuserdata();
      } else {
        console.log('Error deleting property');
      }
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

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

      navigate('/Owner');
    } catch (error) {
      console.error('Error logging out:', error);
    }
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
          <Link to="/Prop" className="p-2 btn btn-outline-secondary mx-2">
            Add Property
          </Link>
        </div>
        <div className="di flex justify-content-evenly">
          <button onClick={handleLogout} className="p-2 btn btn-outline-secondary mx-2">
            Logout
          </button>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="property-container">
        {data.map((property) => (
          <div className="property-box" key={property.id}>
            <h1 className='glow-tex text-light' style={{fontFamily:'cursive'}}>{property.name}</h1>
            <img src={`http://localhost:8080/upload/${property.image}`} alt="Property" />
            <p>Available Rooms: {property.rooms}</p>
            <p>Duration min day: {property.minduration}</p>
            <p>Duration max day: {property.maxduration}</p>
            <p>Rent: {property.rent}</p>
            <p>Amenities: {property.amenities}</p>
            <div className="buttons">
              <button className="btn btn-outline-secondary" onClick={() => handleViewDetails(property.id)}>
                View Details
              </button>
              <button className="btn btn-outline-secondary" onClick={() => handleEdit(property.number, property.minduration, property.maxduration)}>
                Edit
              </button>
              <button className="btn btn-outline-secondary" onClick={() => handleDelete(property.name)}>
                Delete
              </button>
            </div>
            {editMinDuration !== '' && (
              <div className="edit-form">
                <label>Min Duration:</label>
                <input type="number" value={editMinDuration} onChange={(e) => setEditMinDuration(e.target.value)} />
                <label>Max Duration:</label>
                <input type="number" value={editMaxDuration} onChange={(e) => setEditMaxDuration(e.target.value)} />
                <button onClick={() => handleEditSubmit(property.number)}>Submit</button>
              </div>
            )}
          </div>
        ))}
      </div>
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

export default Property;
