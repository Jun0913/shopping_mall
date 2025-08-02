import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavItem from './Sections/NavItem';

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <section className="fixed top-0 left-0 w-full z-10 text-white bg-gradient-to-br from-neutral-900 to-neutral-700 shadow-md">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="text-2xl font-bold text-white-400">
          <Link to="/">WebShop</Link>
        </div>

        {/* Menu Button (Mobile) */}
        <div className="text-3xl sm:hidden">
          <button onClick={handleMenu}>
            {menu ? "−" : "≡"}
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden sm:block">
          <NavItem />
        </div>
      </div>

      {/* Mobile Nav */}
      {menu && (
        <div className="sm:hidden px-4 pb-4">
          <NavItem mobile />
        </div>
      )}
    </section>
  );
};

export default Navbar;
