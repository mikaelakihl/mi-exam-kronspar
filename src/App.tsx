import { useState, useEffect } from 'react';
import './index.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
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

const CommentSection = () => {
  const comments = [
    {
      id: 1,
      name: 'John Doe',
      comment:
        'Tack för att ni hjälpte mig får den mössa jag alltid velat ha! Ni är bäst!!! ',
    },
    {
      id: 2,
      name: 'Jane Doe',
      comment:
        'Tack för att ni hjälpte mig får den mössa jag alltid velat ha! Ni är bäst!!! ',
    },
    {
      id: 3,
      name: 'John Doe',
      comment:
        'Tack för att ni hjälpte mig får den mössa jag alltid velat ha! Ni är bäst!!! ',
    },
  ];

  return (
    <section>
      <h2>Tidigare Kronsparare</h2>
      <div className="flex flex-col gap-4">
        {comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.name}</p>
            <p>{comment.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <section className="flex flex-col gap-4">
      <div className="bg-primary">
        <div className="">
          <h2>Välkommen till Kronspar</h2>
          <p>
            Här hjälper vi dig att fixa studentmössan utan att det blir dyrt
            eller stressigt. Studenten ska vara rolig — inte en tävling om vem
            som har råd med vad. Genom att spara lite varje månad kan du lugnt
            bygga upp pengarna du behöver, helt i din egen takt. Inga krav.
            Ingen press. Bara ett smidigt sätt att se till att du får den
            studentmössa du vill ha, när det väl är dags (helt gratis) Starta
            ditt sparande idag och gör studenten lite enklare för dig själv.
          </p>
        </div>
        <div className="flex flex-col gap-4 p-4">
          <SignUpButton mode="modal">
            <button className="bg-accent text-p-white px-4 py-2 rounded mb-2">
              Registrera
            </button>
          </SignUpButton>
          <div className="bg-background-muted">
            <p>
              När du har registrerat dig kommer du direkt vidare till nästa
              steg. Där fyller du enkelt i dina kortuppgifter, din examensdag
              och vilken dag du vill att köpet av mössan ska göras.
            </p>
          </div>
        </div>
      </div>

      <CommentSection />
    </section>
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
                  <Home />
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
