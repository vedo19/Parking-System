import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/NavBar';
import MainSecond from '@/components/MainSecond';
import MainContent from '../components/MainContent';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <MainSecond />
      <MainContent />
      <Footer />
    </div>
  );
};

export default Home;

// Rendering main components to make home page
