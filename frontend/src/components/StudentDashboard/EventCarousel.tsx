import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import cs2 from '../../assets/news/cs2.jpg';
import esport from '../../assets/news/4esport.png';
import clubRezo from '../../assets/news/clubRezo.png';
import qrCode from '../../assets/news/qrCode.jpg';

const slides = [
  {
    title: 'LAN COUNTER STRIKE 2',
    date: '22-23 FÉVRIER | 14H - 6H',
    details: [
      'TOURNOIS AMICAUX',
      'ENTRAINEMENTS',
      'WATCH-PARTY',
      'DÉCOUVERTE'
    ],
    qrCode: qrCode,
    logos: [
      esport,
      clubRezo
    ],
    backgroundImage: cs2
  },
];

const EventCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto my-8">
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl">
        {/* Current Slide */}
        <div className="relative aspect-[16/9]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
          <img 
            src={slides[currentSlide].backgroundImage} 
            alt="Event background"
            className="w-full h-full object-cover"
          />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
            <div className="text-center space-y-4">
              <h2 className="text-6xl font-bold">
                <span className="text-yellow-300">LAN</span>
                <span className="text-gradient-orange"> COUNTER STRIKE 2</span>
              </h2>
              <p className="text-4xl font-light">22-23 FÉVRIER | 14H - 6H</p>
            </div>
            
            {/* Bottom Section */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-8">
              <div className="flex items-center space-x-4">
                <img src={slides[currentSlide].logos[0]} alt="eSport" className="h-12" />
                <div className="text-xl">
                  <div>TOURNOIS AMICAUX</div>
                  <div>ENTRAINEMENTS</div>
                </div>
              </div>
              
              <img src={slides[currentSlide].qrCode} alt="QR Code" className="h-48 w-48" />
              
              <div className="flex items-center space-x-4">
                <div className="text-xl text-right">
                  <div>WATCH-PARTY</div>
                  <div>DÉCOUVERTE</div>
                </div>
                <img src={slides[currentSlide].logos[1]} alt="Club Rezo" className="h-12" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
      >
        <FaChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
      >
        <FaChevronRight size={24} />
      </button>

      {/* Dots Navigation */}
      <div className="flex justify-center space-x-2 mt-4">
        {Array.from({ length: 13 }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors
              ${currentSlide === index ? 'bg-blue-800' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default EventCarousel;