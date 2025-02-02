import React from 'react';
import Header from '../../components/Header';
import Navbar from '../../components/NavBar';
import Footer from '../../components/Footer';
import SccMain from '../../components/SccMain';

const Scc: React.FC = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div className="main-content p-5">
        <SccMain />
      </div>
      <Footer />
    </div>
  );
};

export default Scc;