import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <h1 className="text-6xl font-bold text-[#163767]">404</h1>
          <h2 className="text-3xl font-bold text-[#163767]">
            On dirait que vous vous êtes perdu...
          </h2>
          <p className="text-gray-600 text-lg">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <button
            onClick={() => navigate('/portal/student/home')}
            className="bg-[#F97316] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#E65A00] transition-colors"
          >
            Retourner à l'accueil
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound; 