import React from 'react';

const AboutMain: React.FC = () => {
  return (
    <div className="p-5"> {/* Padding 5 units */}
      {/* Enjoy the Best Parking Experience */}
      <section className="bg-gradient-to-r from-blue-400 to-purple-500 text-white p-6 rounded-lg shadow-lg mb-8"> {/* Background gradient color from blue to purple, white text, rounded corners, shadow, margin bottom */}
        <h1 className="text-4xl font-extrabold mb-4 text-center animate-pulse"> {/* Extra bold text, pulsing animation */}
          Enjoy the Best Parking Experience
        </h1>
        <p className="text-center text-lg animate-fade-in">
          Park with ease, comfort, and security at your favorite spots in the city.
        </p>
      </section>

      {/* Our Mission */}
      <h2 className="text-3xl font-bold mb-4 text-blue-700">Our Mission</h2>
      <p className="mb-4">
        Our mission is to provide the best parking solutions in the city. We aim to make parking easy, convenient, and affordable for everyone.
      </p>

      {/* Our Team */}
      <h2 className="text-3xl font-bold mb-4 text-blue-700">Our Team</h2>
      <p className="mb-4">
        We have a dedicated team of professionals who work tirelessly to ensure our customers have the best experience. Our team is our greatest asset.
      </p>

      {/* Contact Us */}
      <h2 className="text-3xl font-bold mb-4 text-blue-700">Contact Us</h2>
      <p>
        If you have any questions or need assistance, feel free to contact us at{' '}
        <a
          href="mailto:infoPlatz@parking.com"
          className="text-blue-500 hover:underline transition-transform transform hover:scale-105"
        >
          infoPlatz@parking.com
        </a>.
      </p>
    </div>
  );
};

export default AboutMain;
