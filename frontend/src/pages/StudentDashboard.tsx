import SocialMedia from '../components/StudentDashboard/SocialMedia';
import News from '../components/StudentDashboard/News';
import EventsList from '../components/StudentDashboard/EventsList';
import EventCarousel from '../components/StudentDashboard/EventCarousel';
import Footer from '../components/Footer';
import Header from '../components/Header';

const StudentDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      
      <main className="flex-1 max-w-[1200px] mx-auto px-4 py-8">
        {/* Carousel Section */}
        <EventCarousel />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main Content - News */}
          <div className="lg:col-span-2">
            <News />
          </div>
          
          {/* Sidebar - Events and Social Media */}
          <aside className="space-y-8">
            <EventsList />
            <SocialMedia />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StudentDashboard;