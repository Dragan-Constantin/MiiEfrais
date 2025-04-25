import { useState } from 'react';
import techAlertImg from '../../assets/news/tech-alert.jpeg';
import boxingImg from '../../assets/news/boxing.jpeg';
import bdeImg from '../../assets/news/bde.jpeg';
import fondsImg from '../../assets/news/fonds.jpeg';

interface NewsItem {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string;
  categories: string[];
}

const News = () => {
  const [activeTab, setActiveTab] = useState('À LA UNE');

  const tabs = [
    'À LA UNE',
    'DIRECTION GÉNÉRALE',
    'DIRECTION DE LA FORMATION',
    'EFREI FOR GOOD',
    'MARKETING ET DÉVELOPPEMENT'
  ];

  const newsItems: NewsItem[] = [
    {
      id: 1,
      date: '19 FÉVR. 2025',
      title: 'Tech Alert : Hacking planétaire',
      description: "Le jeudi 13 février dernier, l'Efrei a inauguré son cycle de conférences Tech Alert avec une première édition intitulée « Hacking...",
      image: techAlertImg,
      categories: ["VIE DE L'ÉCOLE"]
    },
    {
      id: 2,
      date: '12 FÉVR. 2025',
      title: "Villejuif Boxing Show : la pesée à l'Efrei",
      description: "Ce vendredi 7 février avait lieu à l'Efrei la pesée du Villejuif Boxing Show. Ce rendez-vous pieds-poings français met en lumière...",
      image: boxingImg,
      categories: ["VIE DE L'ÉCOLE', 'VIE ASSOCIATIVE"]
    },
    {
      id: 3,
      date: '3 FÉVR. 2025',
      title: 'Campagne BDE : le tuto ! 🎮',
      description: 'Tu souhaites proposer une liste pour devenir le prochain BDE ? Mais tu ne sais pas par où commencer ?',
      image: bdeImg,
      categories: ['VIE ASSOCIATIVE']
    },
    {
      id: 4,
      date: '27 JANV. 2025',
      title: "Efrei Fonds de dotation : une année d'actions concrètes et...",
      description: "L'année 2024 a été marquée par des réalisations remarquables, illustrant l'engagement renforcé de l'Efrei Fonds de..",
      image: fondsImg,
      categories: ['MARKETING ET DÉVELOPPEMENT', 'EFREI FOR GOOD']
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[#163767] text-3xl font-bold">Actualités</h2>
        <a href="#" className="text-[#F97316] hover:underline">VOIR PLUS</a>
      </div>

      {/* Tabs container with hidden scrollbar */}
      <div className="overflow-hidden">
        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-[#163767] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {newsItems.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4">
              <img
                src={item.image}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="space-y-2">
              <div className="text-gray-500">{item.date}</div>
              <h3 className="font-semibold text-lg text-[#163767] group-hover:text-[#F97316] transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 line-clamp-2">{item.description}</p>
              <div className="flex gap-2 flex-wrap">
                {item.categories.map((category) => (
                  <span
                    key={category}
                    className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-sm"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;