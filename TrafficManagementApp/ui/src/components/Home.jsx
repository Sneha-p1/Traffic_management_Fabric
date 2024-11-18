import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import img1 from '../assets/images/image.jpg';
import MVDImg from '../assets/images/MVD.png';
import TMAImg from '../assets/images/TMA.png';
import LawEnfImg from '../assets/images/Law.png';
import InsuCImg from '../assets/images/InsC.png';
import { toast } from 'react-toastify';

function HomePage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || 'mvd';

  // Sample predefined users for demonstration
  const predefinedUsers = {
    mvd: { username: 'mvdUser', passphrase: 'mvdPass' },
    tma: { username: 'tmaUser', passphrase: 'tmaPass' },
    lawenforcement: { username: 'lawUser', passphrase: 'lawPass' },
    insurance: { username: 'insUser', passphrase: 'insPass' },
  };

  // State to handle credentials
  const [username, setUsername] = useState('');
  const [passphrase, setPassphrase] = useState('');

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);

  const handleRoleSelect = (role) => {
    setUsername(predefinedUsers[role].username);
    setPassphrase(predefinedUsers[role].passphrase);
    loginSubmit(role);
  };

  const loginSubmit = (role) => {
    const user = predefinedUsers[role];
    if (user && user.username === username && user.passphrase === passphrase) {
      toast.success(`Logged in as: ${role}`);

      // Redirect based on userType
      if (role === 'mvd') {
        navigate('/mvddashboard');
      } else if (role === 'tma') {
        navigate('/tmadashboard');
      } else if (role === 'lawenforcement') {
        navigate('/ledashboard');
      } else if (role === 'insurance') {
        navigate('/insurancedashboard');
      }
    } else {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="font-sans bg-white min-h-screen">
      {/* Navbar */}
      <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-md">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="TrafficTrace Logo" className="h-8" />
          <h1 className="text-2xl font-extrabold text-blue-700 tracking-wide">TrafficTrace</h1>
        </div>
        {/* <nav className="space-x-8">
          <a href="#home" className="text-gray-700 font-medium hover:text-blue-700 transition duration-300">
            Home
          </a>
          <a href="#about" className="text-gray-700 font-medium hover:text-blue-700 transition duration-300">
            About
          </a>
        </nav> */}
        <div className="space-x-4">
          <button
            onClick={openLoginModal}
            className="px-4 py-2 border border-green-700 text-green-700 rounded hover:bg-green-700 hover:text-white transition duration-300"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center md:space-x-10">
          <div className="md:w-1/2 text-left">
            <h2 className="text-5xl font-bold text-gray-800 leading-tight mb-4">
              Blockchain <span className="text-blue-700">Traffic Management</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              A decentralized Traffic Management system built with Hyperledger Fabric, enhancing vehicle registration,
              accident reporting, and violation management. It ensures secure and transparent data exchange among
              organizations, including the Traffic Management Authority, MVD, Law Enforcement, and Insurance Company,
              while protecting sensitive information using private data collections.
            </p>
          </div>
          <div className="mt-8 md:mt-0 md:w-1/2">
            <img src={img1} alt="Dashboard Mockup" className="w-full rounded" />
          </div>
        </div>
      </main>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Choose Your Role</h2>
              <button onClick={closeLoginModal} className="text-gray-600 hover:text-gray-800">
                &times;
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center cursor-pointer" onClick={() => handleRoleSelect('mvd')}>
                <img src={MVDImg} alt="MVD" className="h-24 mx-auto mb-2" />
                <p className="text-gray-700 font-medium">Motor Vehicles Department</p>
              </div>
              <div className="text-center cursor-pointer" onClick={() => handleRoleSelect('tma')}>
                <img src={TMAImg} alt="TMA" className="h-24 mx-auto mb-2" />
                <p className="text-gray-700 font-medium">Traffic Management Authority</p>
              </div>
              <div className="text-center cursor-pointer" onClick={() => handleRoleSelect('lawenforcement')}>
                <img src={LawEnfImg} alt="Law Enforcement" className="h-24 mx-auto mb-2" />
                <p className="text-gray-700 font-medium">Law Enforcement</p>
              </div>
              <div className="text-center cursor-pointer" onClick={() => handleRoleSelect('insurance')}>
                <img src={InsuCImg} alt="Insurance Company" className="h-24 mx-auto mb-2" />
                <p className="text-gray-700 font-medium">Insurance Company</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
