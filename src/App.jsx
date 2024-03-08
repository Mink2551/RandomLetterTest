import React, { useState, useEffect } from 'react';
import './App.css';
import Thai from './Sections/Thai';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuIcon, setMenuIcon] = useState('menu'); // Initial menu icon is 'menu'
  const [activeContent, setActiveContent] = useState(1);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    // Change menu icon when toggling sidebar
    setMenuIcon(sidebarOpen ? 'menu' : 'arrow-left');
  };

  const showContent = (content) => {
    setActiveContent(content);
  };

  useEffect(() => {
    const handleResize = () => {
      // Open sidebar on medium (md) and larger screens
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
      // Reset menu icon when sidebar is closed automatically on smaller screens
      setMenuIcon('menu');
    };

    // Call handleResize on initial render
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`sidebar sidebar-custom-color rounded-md w-64 ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="relative">

          <h1 className='text-4xl font-bold m-2 mt-5 text-gray-800 relative overflow-hidden'>
            Letter Guess
            <span className="absolute left-0 w-full h-1  bottom-0 bg-gradient-to-r from-green-200 via-green-500 to-green-700 animate-slide neon"></span>
          </h1>

          <div className='pb-64 pt-10 mt-20 bg-white m-2 rounded-3xl bg-opacity-40'>
            <div className={`p-4 cursor-pointer m-3 rounded-2xl font-bold text-lg hover:shadow-2xl bg-opacity-25 hover:bg-opacity-25 hover:bg-gray-200 ${activeContent === 1 ? 'shadow-2xl bg-gray-200' : ''}`} onClick={() => showContent(1)}>
              🇹🇭 Thai Letter
            </div>
            <div className={`p-4 cursor-pointer m-3 rounded-2xl font-bold text-lg hover:shadow-2xl bg-opacity-25 hover:bg-opacity-25 hover:bg-gray-200 ${activeContent === 2 ? 'shadow-2xl bg-gray-200' : ''}`} onClick={() => showContent(2)}>
              🇯🇵 Japanese Letter
            </div>
            <div className={`p-4 cursor-pointer m-3 rounded-2xl font-bold text-lg hover:shadow-2xl bg-opacity-25 hover:bg-opacity-25 hover:bg-gray-200 ${activeContent === 3 ? 'shadow-2xl bg-gray-200' : ''}`} onClick={() => showContent(3)}>
              🇰🇷 Korea Letter
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Menu bar */}
        <div className="bg-custom-color text-white p-4 flex justify-between items-center">
          <div className="inline-block rounded-2xl bg-opacity-40 hover:bg-opacity-55 transition-all p-1 shadow-lg bg-lime-500">
            <button onClick={toggleSidebar} className="text-white m-1  focus:outline-none">
              {/* Conditional rendering of menu icon */}
              {menuIcon === 'menu' ? (
                // Hamburger icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                // Arrow left icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              )}
            </button>
          </div>
          {/* Add additional content here if needed */}
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 bg-custom-color">
          {/* Render content based on activeContent */}
          {activeContent === 1 && <Thai/>}
          {activeContent === 2 && <div>Content 2</div>}
          {activeContent === 3 && <div>Content 3</div>}
        </div>
      </div>
    </div>
  );
}

export default App;
