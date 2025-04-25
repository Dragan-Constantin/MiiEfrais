import { useState } from 'react';
import { FaCalendarAlt, FaDownload, FaLink } from 'react-icons/fa';

interface Event {
  time: string;
  title: string;
  details: string;
  group: string;
  type: 'course' | 'exam' | 'mandatory' | 'optional';
}

const PlanningComponent = () => {
  const [currentView, setCurrentView] = useState<'month' | 'week' | 'day'>('month');

  const mockEvents: Event[] = [
    {
      time: '09:00 - 13:00',
      title: 'REACT.JS',
      details: '(Bat. EXT, VISIO)',
      group: 'Grp. PAR01',
      type: 'course'
    },
    {
      time: '14:00 - 17:30',
      title: 'REACT.JS',
      details: '(Bat. EXT, VISIO)',
      group: 'Grp. PAR01',
      type: 'course'
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm">
      {/* Header with info text */}
      <div className="mb-8 space-y-2">
        <div className="text-gray-600">
          Pensez à consulter cette page ou à synchroniser votre calendrier régulièrement, votre planning est susceptible d'évoluer : changement de salle, cours annulé ou déplacé...
        </div>
        <div className="text-gray-600">
          Le planning sur myEfrei est affiché au fuseau horaire Europe/Paris. L'export iCal est effectué en UTC, il s'adaptera donc au fuseau horaire de votre calendrier, à votre convenance.
        </div>
        <button className="flex items-center gap-2 bg-[#163767] text-white px-4 py-2 rounded-lg text-sm">
          <FaCalendarAlt />
          Informations sur votre planning
        </button>
      </div>

      {/* Legend */}
      <div className="flex gap-6 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-200 rounded"></div>
          <span className="text-sm text-gray-600">Cours</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-200 rounded"></div>
          <span className="text-sm text-gray-600">Événement obligatoire</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-200 rounded"></div>
          <span className="text-sm text-gray-600">Examen</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-200 rounded"></div>
          <span className="text-sm text-gray-600">Événement facultatif</span>
        </div>
      </div>

      {/* View Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <button 
            className={`px-4 py-2 rounded-lg ${currentView === 'month' ? 'bg-[#163767] text-white' : 'bg-gray-100'}`}
            onClick={() => setCurrentView('month')}
          >
            MOIS
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${currentView === 'week' ? 'bg-[#163767] text-white' : 'bg-gray-100'}`}
            onClick={() => setCurrentView('week')}
          >
            SEMAINE
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${currentView === 'day' ? 'bg-[#163767] text-white' : 'bg-gray-100'}`}
            onClick={() => setCurrentView('day')}
          >
            JOUR
          </button>
          <button 
            className="px-4 py-2 rounded-lg bg-gray-100"
          >
            AUJOURD'HUI
          </button>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-[#163767] text-white px-4 py-2 rounded-lg text-sm">
            <FaDownload />
            TÉLÉCHARGER PLANNING (ICAL)
          </button>
          <button className="flex items-center gap-2 bg-[#163767] text-white px-4 py-2 rounded-lg text-sm">
            <FaLink />
            COPIER URL PLANNING (ICAL)
          </button>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-2">
        {mockEvents.map((event, index) => (
          <div 
            key={index}
            className={`flex items-center gap-4 p-4 rounded-lg ${
              event.type === 'course' ? 'bg-blue-500/10' :
              event.type === 'exam' ? 'bg-red-500/10' :
              event.type === 'mandatory' ? 'bg-purple-500/10' :
              'bg-green-500/10'
            }`}
          >
            <div className="w-32 text-gray-600">{event.time}</div>
            <div className="flex-1">
              <div className="font-medium">{event.title}</div>
              <div className="text-gray-600">{event.details}</div>
            </div>
            <div className="text-gray-600">{event.group}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanningComponent; 