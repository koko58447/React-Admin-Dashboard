import React, { useState } from 'react';
import { MenuIcon, GlobeIcon, LogoutIcon, LogoIcon } from './Icons';
import LogoutConfirmModal from './LogoutConfirmModal';

interface HeaderProps {
  toggleSidebar: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, onLogout }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="d-flex align-items-center justify-content-center p-2 border-bottom">
          <LogoIcon className="h-8 w-8 text-primary flex-shrink-0" style={{width: '2rem', height: '2rem'}} />
          <span className="ms-2 fs-4 fw-bold">
            POS Admin Panel
          </span>
        </div>
        <div className="d-flex align-items-center justify-content-between p-2">
          <div>
            {/* Mobile Toggle */}
            <button className="btn btn-outline-secondary border-0 d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarOffcanvas" aria-controls="sidebarOffcanvas">
              <MenuIcon className="w-6 h-6" />
            </button>
            {/* Desktop Toggle */}
            <button onClick={toggleSidebar} className="btn btn-outline-secondary border-0 d-none d-lg-block">
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="d-flex align-items-center">
            <div className="dropdown">
              <button className="btn btn-outline-secondary border-0 d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <GlobeIcon className="w-6 h-6" />
                <span className="ms-2 d-none d-sm-inline">Language</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="#">English</a></li>
                <li><a className="dropdown-item" href="#">Spanish</a></li>
                <li><a className="dropdown-item" href="#">French</a></li>
              </ul>
            </div>
            
            <button className="btn btn-outline-secondary border-0 d-flex align-items-center ms-2" onClick={() => setShowLogoutConfirm(true)}>
                <LogoutIcon className="w-6 h-6" />
                <span className="ms-2 d-none d-sm-inline">Logout</span>
            </button>

            <div className="ms-3">
                <img 
                    className="rounded-circle"
                    src="https://picsum.photos/100" 
                    alt="User avatar" 
                    style={{width: '40px', height: '40px', objectFit: 'cover'}}
                />
            </div>
          </div>
        </div>
      </header>
      <LogoutConfirmModal 
        show={showLogoutConfirm} 
        handleClose={() => setShowLogoutConfirm(false)}
        handleConfirm={onLogout}
      />
    </>
  );
};

export default Header;