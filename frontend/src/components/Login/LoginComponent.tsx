import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import loginLogo from '../../assets/login/logo-efrei.png';

function LoginComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="lg:bg-white lg:rounded-lg lg:shadow-lg p-10 w-full max-w-[500px] relative z-10">
      <div className="mb-8 text-center">
        <img 
          src={loginLogo} 
          alt="Efrei Paris Panthéon-ASSAS Université" 
          className="w-56 mb-8 mx-auto"
        />
        <h1 className="text-[#0A2A5E] text-4xl font-bold mb-2 neosans">Connexion</h1>
        <h2 className="text-[#0A2A5E] text-xl font-bold neosans">Utiliser votre compte Efrei</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Identifiant ou n° de dossier"
            className="w-full px-3 py-2.5 border border-gray-900 rounded-md focus:outline-none focus:border-[#0A2A5E] placeholder-gray-900"
            value={formData.identifier}
            onChange={(e) => setFormData({...formData, identifier: e.target.value})}
          />
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            className="w-full px-3 py-2.5 border border-gray-900 rounded-md focus:outline-none focus:border-[#0A2A5E] pr-10 placeholder-gray-900"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
          </button>
        </div>

        <div className='text-sm text-gray-800 text-right'>
          Identifiants oubliés ? <a href="tel:+33188289250" className="hover:underline"> Contactez-le +33 188 289 250</a>
        </div>

        <div className="text-xs text-black text-center lg:text-left">
          En me connectant, <span className="font-medium">j'accepte</span> les{' '}
          <a href="#" className="text-[#0A2A5E] underline">conditions d'utilisations</a>
          {' '}du service SSO Efrei notamment en matière de données personnelles.
        </div>

        <button
          type="submit"
          className="w-fit bg-[#377fbc] hover:bg-[#14234b] text-white font-small py-2.5 px-8 rounded-md transition-colors duration-200 mx-auto block roboto cursor-pointer"
          onClick={()=>navigate('/portal/student/home')}
        >
          SE CONNECTER
        </button>
      </form>
    </div>
  );
}

export default LoginComponent;