const Footer = () => {
    return (
      <footer className="bg-white border-t mt-auto py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 roboto">
            <p>©2025 Efrei</p>
            <span>|</span>
            <a href="/donnees-personnelles" className="hover:text-efreiblue">
              Données personnelles
            </a>
            <span>|</span>
            <a 
              href="https://www.efrei.fr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-efreiblue"
            >
              Efrei.fr
            </a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;