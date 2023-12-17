# Guest Room Booking Website

Welcome to the Guest Room Booking website project! This web application allows users to book guest rooms from various property owners. Users can create accounts, log in, view property listings, and make bookings.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Development Setup](#development-setup)
  - [Deployment](#deployment)
    - [Client Deployment](#client-deployment)
    - [Server Deployment](#server-deployment)
- [User Login](#user-login)
- [Owner Login](#owner-login)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User and Owner authentication
- User Dashboard displaying booking details
- Owner Dashboard managing properties with edit and delete functionality
- Property addition for Owners with detailed information and photos
- Booking functionality with detailed property view for Users

## Getting Started

### Development Setup

1. Clone the repository: `git clone https://github.com/your-username/your-repository.git`
2. Navigate to the `client` folder: `cd client`
3. Install client dependencies: `npm install`
4. Navigate to the `server` folder: `cd ../server`
5. Install server dependencies: `npm install`
6. Configure your database settings.

### Deployment

#### Client Deployment

1. Navigate to the `client` folder: `cd client`
2. Build the React app: `npm run build`
3. Deploy the build folder to your hosting provider (e.g., Netlify, Vercel, GitHub Pages).
4. Update the client-side API endpoint in the React app if necessary.

#### Server Deployment

1. Navigate to the `server` folder: `cd ../server`
2. Deploy your Node.js server to your chosen hosting provider (e.g., Heroku, AWS, DigitalOcean).
3. Set environment variables for production (e.g., database connection details, API keys).

## User Login

### Existing User

1. Click on the "User Login" button on the home page.
2. Enter your phone number and password.
3. Click "Login."

### New User

1. Click on the "User Login" button on the home page.
2. Click "Create New Account."
3. Fill in the required details: name, phone number, email, password, place, address, pincode.
4. Click "Submit."

## Owner Login

### Existing Owner

1. Click on the "Owner Login" button on the home page.
2. Enter your phone number and password.
3. Click "Login."

### New Owner

1. Click on the "Owner Login" button on the home page.
2. Click "Create New Account."
3. Fill in the required details: name, email, phone number, password, address, residency, pincode, place.
4. Click "Submit."

## Usage

### Owner Dashboard

1. Log in as an Owner.
2. View and manage existing properties with edit and delete buttons.
3. Click "Add Property" in the navbar to add a new property.

### User Dashboard

1. Log in as a User.
2. Click "Book Now" to view available properties.
3. Click "View Details" for a property to see detailed information.
4. Click "Book Now" on the property details page to make a booking.

## Contributing

We welcome contributions! If you'd like to contribute to the project, please follow the guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
