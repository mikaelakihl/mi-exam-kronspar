import { useState, useEffect } from 'react';
import './index.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from '@clerk/clerk-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="bg-primary flex justify-between items-center p-4">
        <h1>Kronspar</h1>
        <div>
          <div className="flex gap-4 hidden md:flex items-center">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-accent text-p-white px-4 py-2 rounded">
                  Logga in
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          {/* Mobile menu*/}
          <div className="md:hidden">
            {' '}
            <SignedIn>
              <UserButton />
            </SignedIn>
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <AiOutlineClose size={30} className="text-accent" />
              ) : (
                <GiHamburgerMenu size={30} className="text-accent" />
              )}
            </button>
          </div>
        </div>
      </header>
      {isOpen && (
        <nav className="w-full bg-primary text-center p-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-accent text-p-white px-4 py-2 rounded w-full mb-2">
                Logga in
              </button>
            </SignInButton>
          </SignedOut>
        </nav>
      )}
    </>
  );
};

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-background p-4">
        <Outlet />
      </main>
      <footer className="bg-primary p-4 text-center">
        <p>Copyright 2025 Kronspar</p>
      </footer>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useUser();

  if (!user) return <div>Logga in för att se detta.</div>;

  return (
    <div>
      <h2>Välkommen {user.firstName}!</h2>
      <p>Här kommer din data synas senare.</p>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <div>
                <h2>Startsida</h2>
                <SignedIn>
                  <Dashboard />
                </SignedIn>
                <SignedOut>
                  <p>Vänligen logga in.</p>
                </SignedOut>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
