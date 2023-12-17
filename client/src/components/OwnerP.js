import { useRef,useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link ,useNavigate} from 'react-router-dom';
import './main.css';
import Axios from 'axios'

function OwnerP() {
  const navRef = useRef();
  const navigate=useNavigate()
  const [activeLink, setActiveLink] = useState('Property');

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    showNavbar();
  };

  const handleLogout =  () => {

      navigate('/Owner')
    }
  

  return (
    <div >
      <div className="image">
        <h3>
          <Link className="navbar-brand text-dark" to='/'>
            Guest Room Booking
            <p className="ft-1 fs-3">
              <span>Your Gateway to </span>Exceptional Stays
            </p>
          </Link>
        </h3>
        <nav ref={navRef}>
          <a href='#head' className="text-dark">About</a>
          <a href='#contact' className="text-dark">Contact</a>
          <Link
            to='/Property'
            className="text-dark"
            onClick={() => handleLinkClick('Property')}
            style={{ textDecoration: 'none', color: activeLink === 'Property' ? '#17a2b8' : 'inherit' }}
          >
            Property
          </Link>      
          <div className='di flex justify-content-evenly'>
        <button onClick={handleLogout} className='p-2 btn btn-outline-secondary mx-2'>
          Logout
        </button>
      </div>
              <button
            className="nav-btn nav-close-btn"
            onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
        <button
          className="nav-btn"
          onClick={showNavbar}>
          <FaBars />
        </button>
      </div>

      <section className="about-section container mt-5" id="head">
        <h2 className="mb-4 text-light glow-text">About</h2>
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

export default OwnerP
