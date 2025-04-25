import React, { ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
// Using only FontAwesome icons
import { 
  FaSearch, 
  FaBell, 
  FaGraduationCap, 
  FaChevronDown, 
  FaUserCircle,
  FaGraduationCap as FaGradCap,
  FaUserAlt,
  FaStar,
  FaBook,
  FaLaptop,
  FaCopy,
  FaFolder,
  FaUserCog
} from "react-icons/fa";
import logo from '../assets/logo-myefrei-pantheon-white.png';

interface DropdownItem {
  icon: ReactElement;
  title: string;
  path: string;
}

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/portal/admin');

  const scolariteItems: DropdownItem[] = [
    { 
      icon: <FaGradCap className="text-xl text-gray-600" />,
      title: 'Notes et crédits',
      path: '/portal/student/grades'
    },
    {
      icon: <FaUserAlt className="text-xl text-gray-600" />,
      title: 'Absences',
      path: '/portal/student/absences'
    },
    {
      icon: <FaStar className="text-xl text-gray-600" />,
      title: 'Répondre à mes enquêtes Efrei',
      path: '/portal/student/enquetes'
    },
    {
      icon: <FaBook className="text-xl text-gray-600" />,
      title: 'Mes espaces Moodle',
      path: '/portal/student/moodle'
    },
    {
      icon: <FaLaptop className="text-xl text-gray-600" />,
      title: 'LXP Learning XP',
      path: '/portal/student/lxp'
    },
    {
      icon: <FaCopy className="text-xl text-gray-600" />,
      title: 'Copies d\'examen scannées',
      path: '/portal/student/copies'
    },
    {
      icon: <FaFolder className="text-xl text-gray-600" />,
      title: 'Bulletins, certificats et factures...',
      path: '/portal/student/documents'
    }
  ];

  const navItems = [
    { title: 'ACCUEIL', path: '/portal/student/home' },
    { title: 'PLANNING', path: '/portal/student/planning' },
    { title: 'SCOLARITÉ', path: '/portal/student/scolarite', hasDropdown: true, dropdownItems: scolariteItems },
    { title: "L'ÉCOLE", path: '/portal/student/ecole', hasDropdown: true },
    { title: 'VIE ÉTUDIANTE', path: '/portal/student/vie-etudiante', hasDropdown: true },
    { title: 'STAGES ET ALTERNANCES', path: '/portal/student/stages-alternances', hasDropdown: true },
    { title: 'OUTILS', path: '/portal/student/outils', hasDropdown: true },
    { title: 'AIDES', path: '/portal/student/aides', hasDropdown: true },
  ];

  return (
    <header className="bg-efreiblue">
      <div className="container mx-auto px-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo and Badge */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Logo myEfrei" className="h-8" />
            </Link>
            <div className={`flex items-center ${isAdminRoute ? 'bg-green-500' : 'bg-[#F97316]'} text-white rounded px-2 py-1`}>
              {isAdminRoute ? (
                <>
                  <FaUserCog className="text-lg" />
                  <span className="ml-1 text-sm">Admin</span>
                </>
              ) : (
                <>
                  <FaGraduationCap className="text-lg" />
                  <span className="ml-1 text-sm">Étudiant</span>
                </>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher une ressource.."
                className="w-full px-4 py-2 rounded-full bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <FaSearch className="text-gray-500 text-xl" />
              </button>
            </div>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            <button className="text-white">
              <FaBell className="text-2xl" />
            </button>
            <div className="flex items-center text-white space-x-2">
              <span>Constantin DRAGAN</span>
              <FaUserCircle className="text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6">
          <ul className="flex justify-center">
            {navItems.map((item) => (
              <li key={item.path} className="relative">
                {item.hasDropdown ? (
                  <div 
                    className={`flex items-center py-3 px-4 text-sm cursor-pointer
                      ${location.pathname === item.path
                        ? 'text-[#F97316] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#F97316]' 
                        : 'text-gray-700 hover:text-[#F97316]'
                      }`}
                    onClick={() => setOpenDropdown(openDropdown === item.title ? null : item.title)}
                  >
                    {item.title}
                    <FaChevronDown className={`ml-1 text-xs transition-transform duration-200 ${
                      openDropdown === item.title ? 'rotate-180' : ''
                    }`} />
                  </div>
                ) : (
                  <Link 
                    to={item.path}
                    className={`flex items-center py-3 px-4 text-sm relative
                      ${location.pathname === item.path
                        ? 'text-[#F97316] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#F97316]' 
                        : 'text-gray-700 hover:text-[#F97316]'
                      }`}
                  >
                    {item.title}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.hasDropdown && openDropdown === item.title && (
                  <div className="absolute left-0 top-full w-72 bg-white shadow-lg rounded-lg py-2 z-50">
                    {item.dropdownItems?.map((dropdownItem, index) => (
                      <Link
                        key={index}
                        to={dropdownItem.path}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        {dropdownItem.icon}
                        <span className="text-gray-700">{dropdownItem.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;