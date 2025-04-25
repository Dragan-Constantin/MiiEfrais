import Header from '../components/Header';
import Footer from '../components/Footer';
import PlanningComponent from '../components/Planning/PlanningComponent';

const Planning = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      
      <main className="flex-1 max-w-[1200px] mx-auto px-4 py-8">
        <PlanningComponent />
      </main>

      <Footer />
    </div>
  );
};

export default Planning; 