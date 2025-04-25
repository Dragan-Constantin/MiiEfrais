import { useNavigate } from 'react-router-dom';


import myefreiBackground from '../assets/home/myefrei-background.jpg';
import myefreiWhite from '../assets/logo-myefrei-pantheon-white.png';
import pantheonLogo from '../assets/logo-pantheon.svg';
import trianglesLeft from '../assets/home/triangles-left.svg';
import trianglesRight from '../assets/home/triangles-right.svg';
import myefreiBlue from '../assets/logo-myefrei-pantheon-blue.png';
import efreiBlack from '../assets/home/logo-efrei-black.png';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-white relative">
      <img 
        src={myefreiBackground} 
        alt="MyEfrei Background" 
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="hidden lg:flex w-3/5 relative">
        <div className="flex items-center justify-center w-full">
          <img
            src={myefreiWhite}
            alt="MyEfrei Logo White"
            className="w-144"
          />
        </div>
      </div>
      <div className="w-full lg:w-2/5 relative bg-white z-0">
        <div className="absolute bottom-0 right-0 overflow-hidden -z-10">
          <img
            src={pantheonLogo}
            alt="Pantheon Logo Black"
            className="w-6xl opacity-5"
            style={{ clipPath: 'inset(0 50% 0 0)', translate: '50%' }}
          />
        </div>

        <div className="flex flex-col items-center lg:items-start justify-center h-full p-8 lg:p-12 relative z-20">
          <div className="text-center lg:text-left mb-8">
            <img
              src={myefreiBlue}
              alt="MyEfrei Logo Blue"
              className="w-48 mx-auto mb-8 lg:hidden"
            />
            <h1 className="neosans font-bold text-efreiblue text-3xl lg:text-5xl tracking-wide flex items-center justify-center lg:justify-start gap-2">
              <img src={trianglesLeft} alt="" className="h-8 self-start mt-11" />
              BIENVENUE
              <img src={trianglesRight} alt="" className="h-8 self-start -mt-2" />
            </h1>
            <div className="neosans font-bold text-amber-600 text-md lg:text-xl leading-tight mt-2 mb-8 lg:ml-11 lg:mr-40">
              SUR LA PLATEFORME WEB DE L'EFREI
            </div>
            <p className="text-black text-md font-roboto lg:ml-11">
              Retrouvez l'ensemble de vos <span className="font-bold">services sur myEfrei</span>.
            </p>
          </div>
          <button className="bg-efreiblue text-white px-12 py-4 rounded-lg text-sm font-semibold roboto lg:ml-11 hover:bg-efreidarkblue transition-colors duration-200 relative z-20 cursor-pointer"
                  onClick={()=>navigate('/auth/login')}>
            SE CONNECTER
          </button>
          <div className="absolute bottom-4 text-center lg:text-left text-xs text-gray-500 lg:bottom-12 lg:ml-11">
            <img
              src={efreiBlack}
              alt="Efrei Logo"
              className="w-24 mx-auto lg:mx-0 mb-4"
            />
            <p>© 2025 Efrei | Établissement d'enseignement supérieur technique privé</p>
            <a href="#" className="underline">Données personnelles</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;