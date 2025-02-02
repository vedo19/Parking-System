import React from 'react';
import Header from '../../components/Header';
import Navbar from '../../components/NavBar';
import Footer from '../../components/Footer';
import BbiMain from '../../components/BbiMain';

const Bbi: React.FC = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div className="main-content p-5">
        <BbiMain />
      </div>
      <Footer />
    </div>
  );
};

export default Bbi;