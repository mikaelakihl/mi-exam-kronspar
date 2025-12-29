import { useState } from 'react';
import './index.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="bg-primary flex justify-between items-center">
        <h1>Kronspar</h1>
        <div>
          {/* Desktop menu */}
          <div className="flex gap-2 hidden md:block">
            <button className="bg-accent text-p-white">Registrera</button>
            <button className="bg-accent text-p-white">Logga in</button>
          </div>
          {/* Mobile menu*/}
          <div>
            <div className="md:hidden">
              <button onClick={toggleMenu}>
                {isOpen ? (
                  <div>
                    <AiOutlineClose size={50} className="text-accent" />
                  </div>
                ) : (
                  <div className=" flex flex-col">
                    <p className="text-p-white mb-[-10px]">Menu</p>
                    <GiHamburgerMenu size={50} className="text-accent" />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      {isOpen && (
        <nav className=" w-full bg-primary text-center">
          <ul>
            <li>Logga in</li>
            <li>Registrera</li>
          </ul>
        </nav>
      )}
    </>
  );
};

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-background">
        <h2>Welcome to Kronspar</h2>
      </main>
      <footer className="bg-primary h-[20%]">
        <p>Copyright 2025 Kronspar</p>
      </footer>
    </div>
  );
};

export default App;
