import React from 'react';
import Header from '../../components/Header';
import Navbar from '../../components/NavBar';
import Footer from '../../components/Footer';
import RegistrationMain from '../../components/RegistrationMain';

const Registration: React.FC = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div className="main-content p-5">
        <RegistrationMain />
      </div>
      <Footer />
    </div>
  );
};

export default Registration;
