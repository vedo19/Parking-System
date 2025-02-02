import React from 'react';
import Header from '../../components/Header';
import Navbar from '../../components/NavBar';
import Footer from '../../components/Footer';
import ProfileMain from '../../components/ProfileMain';

const Profile: React.FC = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div className="main-content p-5">
        <ProfileMain />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;