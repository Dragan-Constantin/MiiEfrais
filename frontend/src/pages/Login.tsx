import LoginComponent from '../components/Login/LoginComponent';
import myefreiBackground from '../assets/login/background.png';
import pantheonLogo from '../assets/logo-pantheon.svg'

function LoginPage() {
  return (
    <div className="flex min-h-screen relative">
      <img 
        src={myefreiBackground} 
        alt="MyEfrei Background" 
        className="lg:flex absolute inset-0 h-full w-full object-cover hidden"
      />

      <div className="hidden lg:block w-3/5" />
      <div className="fixed bottom-0 right-0 overflow-hidden -z-10" style={{ height: '80vh' }}>
        <img
          src={pantheonLogo}
          alt="Pantheon Logo Black"
          className="opacity-5"
          style={{
            clipPath: 'inset(0 50% 0 0)',
            transform: 'translateX(50%)',
            height: '100%',
            width: 'auto',
            objectFit: 'contain',
            minWidth: '80vh'
          }}
        />
      </div>
      <div className="w-full lg:w-2/5 flex items-center justify-center p-4 relative z-10">
        <LoginComponent />
      </div>
    </div>
  );
}

export default LoginPage;