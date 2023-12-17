import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Footer from './footer'
import axios from 'axios';


function Login() {
    const navigate=useNavigate();
    const [formData,setFormData]=useState({
        phone:'',
        password:''
    });
    const requestData={
      phone: formData.phone,
      password: formData.password
    };
    const handleSubmit=(event)=>{
       event.preventDefault();
       const isFormValid = Object.values(formData).every((value) => value.trim() !== '' && value !== undefined);
       const requestData ={
        phone: formData.phone,
        password: formData.password
      }
       if (isFormValid) {
        axios.post('http://localhost:8080/Login', requestData)
        .then(res => {
            console.log(res);
            if (res.data && res.data.error) {
                alert(res.data.error);
            } else if(res.data === 'Success') {
              localStorage.removeItem('phone');
              localStorage.setItem('phone',formData.phone)
                navigate('/LoginP');
            }
            else{
              alert('Wrong username or password ')
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
      <div className="container mt-4">
        <h2 className="text-center text-white glow-text">User Login</h2>
        <br />
        <div className="col-md-6 offset-md-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label text-white">
                Phone Number:
              </label>
              <input type="number" className="form-control" id="phone" placeholder="Phone number" name='phone' style={{maxWidth:'300px'}} required onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-white">
                Password:
              </label>
              <input type="password" className="form-control" id="password" placeholder="Password" name='password' style={{maxWidth:'300px'}}  required onChange={handleChange}/>
            </div>
            <button type="submit" className="btn btn-primary col-md-2">
              Login
            </button>
          </form>
          <p className="mt-3 text-white glow-text">
            New user? <Link to="/LoginS" className="text-crimson">Create an account</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
