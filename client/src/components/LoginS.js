import React from 'react';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './style.css'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';

function LoginS() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      password: '',
      address: '',
      pincode: '',
      place: '',
    });
    const requestData = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
        password: formData.password,
        address: formData.address,
        pincode: formData.pincode,
        place: formData.place,
      };
  
    const handleSubmit = (event) => {
        event.preventDefault();
      
        const isFormValid = Object.values(formData).every((value) => value.trim() !== '' && value !== undefined);
        
        if (isFormValid) {
          axios.post('http://localhost:8080/LoginS', requestData)
          .then(res => {
              console.log(res);
              if (res.data && res.data.error) {
                  alert(res.data.error);
              } else {
                  navigate('/Login');
              }
          })
          .catch(err => console.log(err));
        } 
      };
  
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
  
  return (
    <>
    <Navbar />
   
    <div className="container mt-5 text-white">
      
    <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4 text-center glow-text">User Sign Up</h2>
          <form className='col-8 mx-auto' onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name:</label>
              <input type="text" className="form-control" id="name" name="name" required onChange={handleChange}/>
            </div>
            <div className="mb-3 ">
              <label htmlFor="email" className="form-label">Email:</label>
              <input type="email" className="form-control" id="email" name="email" required onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone Number:</label>
              <input type="number" className="form-control" id="phone" name="phone" required onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input type="password" className="form-control" id="password" name="password" required onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address:</label>
              <input type="text" className="form-control" id="address" name="address" required onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="pincode" className="form-label">Pincode:</label>
              <input type="text" className="form-control" id="pincode" name="pincode" required onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="place" className="form-label">Place:</label>
              <input type="text" className="form-control" id="place" name="place" required onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary" >Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <br/>
    <br/>
    <br/>
    </>
  );
}

export default LoginS;