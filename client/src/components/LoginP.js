import { useRef,useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link,useNavigate } from 'react-router-dom';
import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

function LoginP() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };


  return (
    <div >
      <div className="image">
        <h3>
          <Link className="navbar-brand text-dark">
            Guest Room Booking
            <p className="ft-1 fs-3">
              <span>Your Gateway to </span>Exceptional Stays
            </p>
          </Link>
        </h3>
        <nav ref={navRef}>
          <p></p>
          <a href='#head' className="text-dark">About</a>
          <a href='#contact' className="text-dark">Contact</a>
          <div className="di flex justify-content-evenly">
          <Link to="/Propu" className="p-2 btn btn-outline-secondary mx-2">
            Book Rooms
          </Link>
        </div>         
        </nav>
       
      </div>

      <section className="about-section container mt-5" id="head">
        <h2 className="mb-4 text-light glow-text">About Guest Room Booking</h2>
        <p className="text-light glow-text">
          Welcome to Guest Room Booking, your go-to platform for finding exceptional stays. 
          Whether you're planning a business trip, a weekend getaway, or a family vacation, 
          we provide a seamless booking experience to ensure your stay is comfortable and memorable.
        </p>
        <p className="text-light glow-text">
          Our platform connects travelers with a diverse range of accommodations, from luxurious 
          hotels to cozy bed and breakfasts. We prioritize user-friendly navigation and strive to 
          offer the best possible booking options for your unique preferences and requirements.
        </p>
        <p className="text-light glow-text">
          At Guest Room Booking, we understand the importance of a hassle-free booking process. 
          Our team is dedicated to providing you with a user-friendly interface, reliable information, 
          and excellent customer service to make your travel planning stress-free.
        </p>
      </section>

      <footer id="contact" className="contact-footer fixed-bottom bg-dark text-light py-4">
        <div className="container text-center">
          <h3>Contact Us</h3>
          <p>Email: booking@gmail.com</p>
          <p>Phone: 12345678</p>
        </div>
      </footer>
    </div>
  );
}

export default LoginP;
