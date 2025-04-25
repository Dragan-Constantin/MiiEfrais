import Header from '../components/Header';
import Footer from '../components/Footer';
import GradesComponent from '../components/Grades/GradesComponent';

const Grades = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      
      <main className="flex-1 max-w-[1200px] mx-auto px-4 py-8">
        <GradesComponent />
      </main>

      <Footer />
    </div>
  );
};

export default Grades; 