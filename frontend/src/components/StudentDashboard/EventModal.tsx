import { FaClock, FaMapMarkerAlt, FaBars } from 'react-icons/fa';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    title: string;
    startDate: string;
    endDate: string;
    location: string;
    links?: {
      label: string;
      url: string;
    }[];
  };
}

const EventModal = ({ isOpen, onClose, event }: EventModalProps) => {
    if (!isOpen) return null;
  
    return (
      // Overlay with transparent background
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* Modal container */}
        <div 
          className="bg-white rounded-2xl w-full max-w-2xl mx-4 relative"
          onClick={e => e.stopPropagation()}
        >
          {/* Modal content */}
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">{event.title}</h2>
            
            {/* Date and Time */}
            <div className="flex items-start gap-4 mb-4">
              <FaClock className="text-gray-500 mt-1" />
              <div>
                <div>Samedi {event.startDate}</div>
                <div>À dimanche {event.endDate}</div>
              </div>
            </div>
  
            {/* Location */}
            <div className="flex items-start gap-4 mb-6">
              <FaMapMarkerAlt className="text-gray-500 mt-1" />
              <div className="text-gray-600">{event.location}</div>
            </div>
  
            {/* Links Section */}
            {event.links && event.links.length > 0 && (
              <div className="flex items-start gap-4">
                <FaBars className="text-gray-500 mt-1" />
                <div className="space-y-2">
                  {event.links.map((link, index) => (
                    <div key={index}>
                      <div>{link.label} :</div>
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-all"
                      >
                        {link.url}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
  
          {/* Close button */}
          <button 
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
      </div>
    );
  };
  
  export default EventModal;