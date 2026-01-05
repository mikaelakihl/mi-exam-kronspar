import { useState } from 'react';
import './index.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { BrowserRouter, NavLink, Outlet, Route, Routes } from 'react-router';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useUser();

  const { data } = useQuery({
    queryKey: ['userData', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const response = await fetch(`/api/data?userId=${user.id}`);
      if (!response.ok) {
        throw new Error('Kunde inte hämta data');
      }
      return response.json();
    },
    enabled: !!user?.id,
  });

  // if (isLoading) return <div>Laddar statistik...</div>;
  // if (error) return <div>Kunde inte ladda statistik.</div>;
  // if (!data) return <div>Ingen data tillgänglig.</div>;

  return (
    <>
      <header className="bg-primary flex justify-between items-center">
        <h1>Kronspar</h1>
        <div className="flex hidden md:flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-accent text-p-white px-4 py-2 rounded">
                Logga in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-accent text-p-white px-4 py-2 rounded">
                Registrera dig
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <nav className="flex gap-6 text-p-white">
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'border-b-2 border-accent' : 'text-p-white'
                }
                to="/"
              >
                Hem
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'border-b-2 border-accent' : 'text-p-white'
                }
                to="/settings"
              >
                Inställningar
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'border-b-2 border-accent' : 'text-p-white'
                }
                to="/statistics"
              >
                Statistik
              </NavLink>
            </nav>
            <div className="flex items-center">
              <div className="text-p-white bg-secondary h-[60px] p-4 mb-1">
                {data?.graduation ? (
                  <p>
                    Studenten är om:{' '}
                    {getDaysUntilGraduation(data.graduation?.graduationDay)}{' '}
                    dagar
                  </p>
                ) : null}
              </div>
              <div className="flex items-center bg-accent p-4 mb-1">
                <UserButton />
              </div>
            </div>
          </SignedIn>
        </div>

        {/* Mobile menu*/}
        <div className="md:hidden flex">
          {' '}
          <SignedIn>
            <div className="text-p-white bg-secondary h-full p-2">
              {data?.graduation ? (
                <p>
                  <p>Studenten är om: </p>
                  {getDaysUntilGraduation(data.graduation?.graduationDay)} dagar
                </p>
              ) : null}
            </div>
            <div className="flex items-center bg-accent p-2">
              <UserButton userProfileMode="modal" />
            </div>
          </SignedIn>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2">
            {isOpen ? (
              <AiOutlineClose size={30} className="text-accent" />
            ) : (
              <GiHamburgerMenu size={30} className="text-accent" />
            )}
          </button>
        </div>
      </header>
      {isOpen && (
        <nav className=" bg-primary/70 border-y-2 border-primary/90 text-p-white text-center p-4 ">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-accent text-p-white px-4 py-2 rounded w-full mb-2">
                Logga in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-accent text-p-white px-4 py-2 rounded w-full mb-2">
                Registrera dig
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <div className="flex flex-col gap-4">
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'text-accent' : 'text-p-white'
                }
                to="/"
              >
                Hem
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'text-accent ' : 'text-p-white'
                }
                to="/settings"
              >
                Inställningar
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'text-accent' : 'text-p-white'
                }
                to="/statistics"
              >
                Statistik
              </NavLink>
            </div>
          </SignedIn>
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

const Settings = () => {
  return (
    <section>
      <div className="bg-secondary">
        <h2>Info om hur det går till</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </p>
      </div>
      <div className="bg-primary">
        <div className="flex flex-col gap-4">
          <div>
            <h2>Betalningsuppgifter</h2>
            <button>Ändra betalningsuppgifter</button>
          </div>
          <form className="flex flex-col gap-2">
            <label className="flex flex-col gap-2">
              Namn på kortet
              <input className="bg-background-muted" />
            </label>
            <label className="flex flex-col gap-2">
              Kortnummer
              <input className="bg-background-muted" />
            </label>
            <div>
              <label className="flex flex-col gap-2">
                MM/YY
                <input
                  type="month"
                  className="bg-background-muted"
                  min={new Date().toISOString().slice(0, 7)}
                />
              </label>
            </div>

            <button className="bg-accent">Spara</button>
          </form>
        </div>
        <div className="bg-background-muted">
          <div>
            <h2>Din sparningsplan</h2>
            <p>Ändra din sparningsplan</p>
          </div>
          <form className="flex flex-col gap-2">
            <label className="flex flex-col gap-2">
              {' '}
              Examensdag
              <input className="bg-primary" />
            </label>
            <label className="flex flex-col gap-2">
              Vilket datum planeras inköpet av mössan?
              <input className="bg-primary" />
            </label>
            <label className="flex flex-col gap-2">
              Pris på studentmössan
              <input className="bg-primary" />
            </label>
            <button>Spara</button>
            <button>Ta ut sparande</button>
          </form>
        </div>
      </div>
    </section>
  );
};

const getDaysUntilGraduation = (graduationDateString: string) => {
  const today = new Date();
  const graduationDay = new Date(graduationDateString);

  const timeDifference = graduationDay.getTime() - today.getTime();

  if (timeDifference < 0) {
    return 0;
  }

  const oneDayToMilliseconds = 1000 * 60 * 60 * 24;

  const dayLeftUntilGraduation = timeDifference / oneDayToMilliseconds;

  return Math.ceil(dayLeftUntilGraduation);
};

const getDaysUntilPurchaseHat = (dateForPurchasingHatString: string) => {
  const today = new Date();
  const purchaseHatDate = new Date(dateForPurchasingHatString);

  const timeDifference = purchaseHatDate.getTime() - today.getTime();

  if (timeDifference < 0) {
    return 0;
  }

  const oneDayToMilliseconds = 1000 * 60 * 60 * 24;

  const dayLeftUntilPurchaseHat = timeDifference / oneDayToMilliseconds;

  return Math.ceil(dayLeftUntilPurchaseHat);
};

const Statistics = () => {
  const { user } = useUser();

  const { data, isLoading, error } = useQuery({
    queryKey: ['userData', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const response = await fetch(`/api/data?userId=${user.id}`);
      if (!response.ok) {
        throw new Error('Kunde inte hämta data');
      }
      return response.json();
    },
    enabled: !!user?.id,
  });

  if (isLoading) return <div>Laddar statistik...</div>;
  if (error) return <div>Kunde inte ladda statistik.</div>;
  if (!data) return <div>Ingen data tillgänglig.</div>;

  return (
    <section>
      <h2>Statistik</h2>
      <div>
        <div>
          <p>Sparmål: {data.graduation?.priceOnHat} kr</p>
          <p>
            Dagar kvar till studenten:
            {getDaysUntilGraduation(data.graduation?.graduationDay)}
          </p>
          <p>
            Dags att köpa mössa om:{' '}
            {getDaysUntilPurchaseHat(data.graduation?.dateForPurchaseHat)}
          </p>
        </div>
      </div>
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
                <SignedIn>{/* <Dashboard /> */}</SignedIn>
                <SignedOut>
                  <Home />
                </SignedOut>
              </div>
            }
          />
          <Route path="/settings" element={<Settings />} />
          <Route path="/statistics" element={<Statistics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
