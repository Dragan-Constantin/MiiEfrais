import { useState } from 'react';
import EventModal from './EventModal';


const events = [
  {
    date: {
      day: '20',
      month: 'Févr.'
    },
    title: 'Repair Café',
    time: '18:00 - 20:00',
    description: "Un objet à réparer ? Une envie d'aider les autres ? Viens faire réparer ou...",
    fullDetails: {
      startDate: '20 févr. 2025',
      endDate: '20 févr. 2025',
      location: 'EFREI – Campus Maison',
      links: []
    }
  },
  {
    date: {
      day: '22',
      month: 'Févr.'
    },
    title: '4eSPORT: LAN COUNTER-STRIKE 2',
    description: 'Inscription ici : https://forms.office.com/e/KkmMDe...',
    fullDetails: {
      startDate: '22 févr. 2025',
      endDate: '23 févr. 2025',
      location: 'EFREI – Campus Maison (Salles A203, A206)',
      links: [
        {
          label: 'Inscription ici',
          url: 'https://forms.office.com/e/KkmMDeWVVL'
        },
        {
          label: 'Lien Discord de 4eSport',
          url: 'https://discord.com/invite/4esport'
        }
      ]
    }
  },
  // ... other events
];

const EventsList = () => {
  const [selectedEvent, setSelectedEvent] = useState<null | typeof events[0]>(null);

  return (
    <>
      <div className="bg-white rounded-3xl p-8 shadow-sm">
        <h2 className="text-[#163767] text-3xl font-bold mb-8">Événements</h2>
        
        <div className="space-y-6">
          {events.map((event, index) => (
            <div 
              key={index} 
              className={`flex gap-6 cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-lg transition-colors
                ${index !== events.length - 1 ? 'pb-6 border-b border-gray-200' : ''}`}
              onClick={() => setSelectedEvent(event)}
            >
              {/* Date Box */}
              <div className="flex flex-col items-center min-w-[60px]">
                <span className="text-2xl font-bold text-[#163767]">{event.date.day}</span>
                <span className="text-sm font-medium bg-[#163767] text-white px-3 py-1 rounded">
                  {event.date.month}
                </span>
              </div>
              
              {/* Event Details */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-[#163767] font-semibold text-lg">{event.title}</h3>
                  {event.time && (
                    <span className="text-gray-600">{event.time}</span>
                  )}
                </div>
                <p className="text-gray-600 mt-1">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <EventModal 
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        event={{
          title: selectedEvent?.title || '',
          startDate: selectedEvent?.fullDetails.startDate || '',
          endDate: selectedEvent?.fullDetails.endDate || '',
          location: selectedEvent?.fullDetails.location || '',
          links: selectedEvent?.fullDetails.links || []
        }}
      />
    </>
  );
};

export default EventsList;