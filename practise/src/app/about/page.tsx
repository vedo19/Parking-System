import React from 'react';
import Header from '../../components/Header';
import Navbar from '../../components/NavBar';
import Footer from '../../components/Footer';
import AboutMain from '../../components/AboutMain';

const About: React.FC = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div className="main-content p-5">
        <AboutMain />
      </div>
      <Footer />
    </div>
  );
};

export default About;

// Rendering Header, Navbar, AboutMain and Footer components in the About page.
// Routing to the About page from the Navbar component.