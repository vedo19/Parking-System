import React from 'react';
import Header from '../../components/Header';
import Navbar from '../../components/NavBar';
import Footer from '../../components/Footer';
import BosmanMain from '../../components/BosmanMain';

const Bosman: React.FC = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div className="main-content p-5">
        <BosmanMain />
      </div>
      <Footer />
    </div>
  );
};

export default Bosman;