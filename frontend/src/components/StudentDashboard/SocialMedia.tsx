import { useState } from 'react';

interface Video {
  id: number;
  videoId: string; // YouTube video ID
  title: string;
  date: string;
}

interface InstagramPost {
  id: number;
  imageUrl: string;
  title: string;
  date: string;
  link: string;
}

const SocialMedia = () => {
  const [activeTab, setActiveTab] = useState<'YOUTUBE' | 'INSTAGRAM'>('YOUTUBE');
  
  const videos: Video[] = [
    {
      id: 1,
      videoId: 'Ylpg5p8xsok',
      title: 'Découvrez l\'Efrei à Bordeaux',
      date: '19 février 2025',
    },
    {
      id: 2,
      videoId: 'TQBMuJWDxn4',
      title: 'Caroline Esposito, Business analyst chez Sopra Steria l Alumni',
      date: '14 février 2025',
    },
    {
      id: 3,
      videoId: '0y7cjeilpWU',
      title: 'François Bidondo, directeur cybersécurité chez RATP l Alumni',
      date: '14 février 2025',
    }
  ];

  const instagramPosts: InstagramPost[] = [
    {
      id: 1,
      date: '04 décembre 2024',
      content: "Rencontrez Morgane, Présidente d'Art'Efrei et Vice-Présidente du Bureau des Arts ! 🎨 ✨ Élève-ingénieure en LSI et alternante, Morgane explore toutes les formes d'expression artistique : théâtre, chant, danse, origami... elle laisse libre cours à sa créativité et encourage les étudiants et étudiantes à faire de même. 👉 Le BDA est le bureau qui coordonne les nombreuses associations artistiques de l'Efrei. Fête de la Musique, Spectacle de Fin d'Année... autant d'événements organisés qui rythment la vie étudiante. #Efrei #vieassociative #vieetudiante #art #ecoledingenieurs #associationetudiante"
    },
    {
      id: 2,
      date: '02 décembre 2024',
      content: "📅 En décembre à l'Efrei - - - #Calendar #Events #SaveTheDate"
    },
    {
      id: 3,
      date: '29 novembre 2024',
      content: "No time to flag 🏁 Retour sur l'édition 2024 de la Cybernight, l'événement dédié à la #cyber de l'Efrei ! Revivez cette sixième édition qui a vu plus de 400 #étudiants participer à des stands, des ateliers, des #conférences et l'incontournable #CTF qui a duré #allnightlong sur nos campus parisiens et bordelais. @ctfrei_ @club.rezo @one_pantheon"
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-8">
      <h2 className="text-[#163767] text-3xl font-bold mb-6">Sur les réseaux</h2>
      
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          className={`px-6 py-2 rounded-lg font-medium ${
            activeTab === 'YOUTUBE' 
            ? 'bg-[#163767] text-white' 
            : 'bg-gray-100 text-gray-700'
          }`}
          onClick={() => setActiveTab('YOUTUBE')}
        >
          YOUTUBE
        </button>
        <button
          className={`px-6 py-2 rounded-lg font-medium ${
            activeTab === 'INSTAGRAM' 
            ? 'bg-[#163767] text-white' 
            : 'bg-gray-100 text-gray-700'
          }`}
          onClick={() => setActiveTab('INSTAGRAM')}
        >
          INSTAGRAM
        </button>
      </div>

      {/* YouTube Videos */}
      {activeTab === 'YOUTUBE' && (
        <div className="space-y-6">
          {videos.map((video) => (
            <a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.videoId}`}
              target="_blank"
              rel="noreferrer"
              className="block"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                {/* YouTube thumbnail */}
                <img
                  src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to medium quality if maxres is not available
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`;
                  }}
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-[#163767] border-b-8 border-b-transparent ml-1" />
                  </div>
                </div>
              </div>
              <h3 className="font-medium text-[#163767] hover:text-[#F97316] transition-colors">
                {video.title}
              </h3>
              <p className="text-gray-500 text-sm">{video.date}</p>
            </a>
          ))}
        </div>
      )}

      {/* Instagram Posts */}
      {activeTab === 'INSTAGRAM' && (
        <div className="space-y-6">
          {instagramPosts.map((post) => (
            <div key={post.id} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="text-gray-600 mb-2">{post.date}</div>
              <p className="text-gray-800 whitespace-pre-wrap">
                {post.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SocialMedia;