import React, { useState } from 'react';
import {
  DashboardIcon,
  POSIcon,
  PurchaseIcon,
  SaleIcon,
  ExpenseIcon,
  FinanceIcon,
  SettingIcon,
  ChevronDownIcon,
  LogoIcon
} from './Icons';

interface SidebarProps {
  isCollapsed: boolean;
  activePage: string;
  setActivePage: (page: string) => void;
}

const navItems = [
  { name: 'Dashboard', icon: <DashboardIcon />, path: '#' },
  { name: 'POS', icon: <POSIcon />, path: '#' },
  {
    name: 'Purchase',
    icon: <PurchaseIcon />,
    subItems: ['Manage Purchase', 'Manage Inventory', 'Manage Supplier', 'Manage Category'],
  },
  {
    name: 'Sale',
    icon: <SaleIcon />,
    subItems: ['Cash Sale', 'Credit Sale', 'Return Sale'],
  },
  {
    name: 'Expense',
    icon: <ExpenseIcon />,
    subItems: ['Manage Expense', 'Manage Expense Category'],
  },
  { name: 'Finance', icon: <FinanceIcon />, path: '#' },
  { name: 'Setting', icon: <SettingIcon />, path: '#' },
];

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, activePage, setActivePage }) => {
  const sidebarContent = (
     <SidebarInner isCollapsed={isCollapsed} activePage={activePage} setActivePage={setActivePage}/>
  );

  return (
    <>
      <div 
        className={`bg-dark text-white d-flex-column flex-shrink-0 d-none d-lg-flex transition-width ${isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}
      >
        {sidebarContent}
      </div>

      <div className="offcanvas offcanvas-start bg-dark text-white d-lg-none" tabIndex={-1} id="sidebarOffcanvas" aria-labelledby="sidebarOffcanvasLabel">
        <div className="offcanvas-header border-bottom border-secondary">
          <h5 className="offcanvas-title d-flex align-items-center" id="sidebarOffcanvasLabel">
            <LogoIcon className="h-8 w-8 text-primary me-2" />
            <span>POS Menu</span>
          </h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body p-0">
          <SidebarInner isCollapsed={false} activePage={activePage} setActivePage={setActivePage}/>
        </div>
      </div>
      
      <style>{`
        .sidebar-expanded { width: 256px; }
        .sidebar-collapsed { width: 80px; }
        .transition-width { transition: width 0.3s ease-in-out; }
        .hover-bg-secondary:hover { background-color: #6c757d40; }
        .rotate-180 { transform: rotate(180deg); }
        .transition-transform { transition: transform 0.3s ease-in-out; }
      `}</style>
    </>
  );
};

const SidebarInner: React.FC<SidebarProps> = ({ isCollapsed, activePage, setActivePage }) => {
    const [openMenu, setOpenMenu] = useState<string | null>('Purchase');

    const handleMenuClick = (name: string) => {
      setOpenMenu(openMenu === name ? null : name);
    };
    
    const handleItemClick = (name: string) => {
      setActivePage(name);
    };
  return (
    <nav className="flex-grow-1 p-2 overflow-auto w-100">
        {!isCollapsed && <div className="text-muted small text-uppercase p-2"><small>Menu</small></div>}
      {navItems.map((item) =>
        item.subItems ? (
          <div key={item.name}>
            <button
              onClick={() => handleMenuClick(item.name)}
              className={`w-100 d-flex btn btn-dark text-start align-items-center p-2 my-1 ${isCollapsed ? 'justify-content-center' : 'justify-content-between'}`}
              data-bs-toggle="collapse"
              data-bs-target={`#${item.name.replace(' ', '-')}-menu`}
              aria-expanded={openMenu === item.name}
            >
              <div className="d-flex align-items-center">
                {item.icon}
                <span className={`ms-3 ${isCollapsed && 'd-none'}`}>{item.name}</span>
              </div>
              {!isCollapsed && <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${openMenu === item.name ? 'rotate-180' : ''}`} />}
            </button>
            <div className={`collapse ${openMenu === item.name ? 'show' : ''}`} id={`${item.name.replace(' ', '-')}-menu`}>
                {!isCollapsed && (
                  <ul className="nav flex-column ps-4">
                    {item.subItems.map((subItem) => (
                      <li className="nav-item" key={subItem}>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleItemClick(subItem);
                          }}
                          className={`nav-link text-white-50 p-2 my-1 ${activePage === subItem ? 'active bg-primary text-white rounded' : ''}`}
                          data-bs-dismiss="offcanvas"
                        >
                          {subItem}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          </div>
        ) : (
          <a
            key={item.name}
            href={item.path}
            onClick={(e) => {
              e.preventDefault();
              handleItemClick(item.name);
            }}
            className={`d-flex align-items-center p-2 my-1 rounded text-decoration-none ${
              activePage === item.name ? 'bg-primary text-white' : 'text-white-50 hover-bg-secondary'
            } ${isCollapsed && 'justify-content-center'}`}
            data-bs-dismiss="offcanvas"
          >
            {item.icon}
            <span className={`ms-3 ${isCollapsed && 'd-none'}`}>{item.name}</span>
          </a>
        )
      )}
    </nav>
  )
}

export default Sidebar;
