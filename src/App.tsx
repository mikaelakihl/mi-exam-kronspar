import { useEffect, useState } from 'react';
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
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { UserData } from './mocks/handlers';

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
        <nav className=" bg-primary/70 border-y-2 border-primary/90 text-p-white text-center p-4 md:hidden">
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
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardMonth, setCardMonth] = useState('');
  const [cardYear, setCardYear] = useState('');
  const [cvv, setCvv] = useState('');

  const [graduationDay, setGraduationDay] = useState('');
  const [dateForPurchaseHat, setDateForPurchaseHat] = useState('');
  const [priceOnHat, setPriceOnHat] = useState('');
  const [savingsMode, setSavingsMode] = useState('manual');
  const [monthlyAmount, setMonthlyAmount] = useState('');

  const [isCardDetailsEditing, setIsCardDetailsEditing] = useState(false);
  const [isSavingPlanDetailsEditing, setIsSavingPlanDetailsEditing] =
    useState(false);

  const [
    showSuccessMessageForSavedCardDetails,
    setShowSuccessMessageForSavedCardDetails,
  ] = useState(false);

  const [
    showErrorMessageForSavedCardDetails,
    setShowErrorMessageForSavedCardDetails,
  ] = useState(false);

  const [
    showSuccessMessageForSavedSavingPlan,
    setShowSuccessMessageForSavedSavingPlan,
  ] = useState(false);

  const [
    showErrorMessageForSavedSavingPlan,
    setShowErrorMessageForSavedSavingPlan,
  ] = useState(false);

  const { user } = useUser();
  const queryClient = useQueryClient();

  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
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

  // När vi får data, fyll i formuläret

  useEffect(() => {
    if (userData?.payment?.nameOnCard) {
      setNameOnCard(userData.payment.nameOnCard);
    }
    if (userData?.payment?.cardNumber) {
      setCardNumber(userData.payment.cardNumber);
    }
    if (userData?.payment?.cardCVV) {
      setCvv(userData.payment.cardCVV);
    }
    if (userData?.payment?.cardMonth) {
      setCardMonth(userData.payment.cardMonth);
    }
    if (userData?.payment?.cardYear) {
      setCardYear(userData.payment.cardYear);
    }
  }, [userData]);

  useEffect(() => {
    if (userData?.graduation?.graduationDay) {
      setGraduationDay(userData.graduation.graduationDay);
    }
    if (userData?.graduation?.dateForPurchaseHat) {
      setDateForPurchaseHat(userData.graduation.dateForPurchaseHat);
    }
    if (userData?.graduation?.priceOnHat) {
      setPriceOnHat(userData.graduation.priceOnHat);
    }
    if (userData?.savings?.savingsMode) {
      setSavingsMode(userData.savings.savingsMode);
    }
    if (userData?.savings?.monthlyAmount) {
      setMonthlyAmount(userData.savings.monthlyAmount);
    }
  }, [userData]);

  useEffect(() => {
    if (savingsMode === 'auto' && priceOnHat && dateForPurchaseHat) {
      const daysLeft = getDaysUntilPurchaseHat(dateForPurchaseHat);
      const monthsLeft = Math.max(1, Math.ceil(daysLeft / 30));
      const price = parseFloat(priceOnHat);
      if (!isNaN(price)) {
        const calculatedAmount = Math.ceil(price / monthsLeft);
        setMonthlyAmount(calculatedAmount.toString());
      }
    }
  }, [savingsMode, priceOnHat, dateForPurchaseHat]);

  if (isLoading) return <div>Laddar inställningar...</div>;
  if (error) return <div>Kunde inte ladda inställningar.</div>;
  // Spara data
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    setShowErrorMessageForSavedCardDetails(false); // nollställer så det inte blir lagg
    setShowSuccessMessageForSavedCardDetails(false); // nollställer så det inte blir lagg

    if (!user?.id) return;

    const currentData = userData || {
      personal: { fname: '', lname: '', email: '' },
      payment: {
        nameOnCard: '',
        cardNumber: '',
        cardMonth: '',
        cardYear: '',
        cardCVV: '',
      },
      graduation: { graduationDay: '', dateForPurchaseHat: '', priceOnHat: 0 },
      savings: { savedAmount: 0, savingsMode: 'manual', monthlyAmount: 0 },
    };

    const updatedData = {
      ...currentData,
      payment: {
        ...currentData.payment,
        nameOnCard: nameOnCard,
        cardNumber: cardNumber,
        cardCVV: cvv,
        cardMonth: cardMonth,
        cardYear: cardYear,
      },
      savings: {
        ...currentData.savings,
        savingsMode: savingsMode,
        monthlyAmount: monthlyAmount,
      },
    };

    try {
      const response = await fetch(`/api/data?userId=${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id, data: updatedData }), // Ändra för att testa felkod 404;
      });

      if (!response.ok) {
        throw new Error('Kunde inte spara data');
      }

      const data = await response.json();

      console.log('Sparad:', data);
      setShowSuccessMessageForSavedCardDetails(true);

      queryClient.invalidateQueries({
        queryKey: ['userData', user?.id],
      });

      setIsCardDetailsEditing(false);
    } catch (error) {
      console.error('Error saving data:', error);
      setShowSuccessMessageForSavedCardDetails(false);
      setShowErrorMessageForSavedCardDetails(true);
    }
  };

  // Spara data
  const handleSaveForSavingPlan = async (e: React.FormEvent) => {
    e.preventDefault();

    setShowErrorMessageForSavedSavingPlan(false); // nollställer så det inte blir lagg
    setShowSuccessMessageForSavedSavingPlan(false);

    if (!user?.id) return;

    const currentSavingPlanData = userData || {
      personal: { fname: '', lname: '', email: '' },
      payment: {
        nameOnCard: '',
        cardNumber: '',
        cardMonth: '',
        cardYear: '',
        cardCVV: '',
      },
      graduation: { graduationDay: '', dateForPurchaseHat: '', priceOnHat: 0 },
      savings: { savedAmount: 0, savingsMode: 'manual', monthlyAmount: 0 },
    };

    const updatedSavingPlanData = {
      ...currentSavingPlanData,
      graduation: {
        ...currentSavingPlanData.graduation,
        graduationDay: graduationDay,
        dateForPurchaseHat: dateForPurchaseHat,
        priceOnHat: priceOnHat,
      },
      savings: {
        ...currentSavingPlanData.savings,
        savingsMode: savingsMode,
        monthlyAmount: monthlyAmount,
      },
    };

    try {
      const response = await fetch(`/api/data?userId=${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          data: updatedSavingPlanData,
        }),
      });

      if (!response.ok) {
        throw new Error('Kunde inte spara data');
      }

      const data = await response.json();

      console.log(data);
      setShowSuccessMessageForSavedSavingPlan(true);
      queryClient.invalidateQueries({
        queryKey: ['userData', user?.id],
      });
      setIsSavingPlanDetailsEditing(false);
      console.log(data);
    } catch (error) {
      console.error('Error saving data:', error);
      setShowSuccessMessageForSavedSavingPlan(false);
      setShowErrorMessageForSavedSavingPlan(true);
    }
  };

  console.log(cardMonth);

  return (
    <section>
      {(showSuccessMessageForSavedCardDetails ||
        showErrorMessageForSavedCardDetails) && (
        <>
          <div className="w-full h-full z-10 fixed flex justify-center items-center">
            <div className="bg-secondary h-[30%] w-[50%] flex justify-center items-center relative">
              <button
                className="top-0 right-0 absolute"
                onClick={() => {
                  setShowSuccessMessageForSavedCardDetails(false);
                  setShowErrorMessageForSavedCardDetails(false);
                }}
              >
                X
              </button>
              {showSuccessMessageForSavedCardDetails && (
                <p>Dina ändringar har sparats</p>
              )}

              {showErrorMessageForSavedCardDetails && (
                <p>Det gick inte att spara</p>
              )}
            </div>
          </div>
        </>
      )}
      {(showSuccessMessageForSavedSavingPlan ||
        showErrorMessageForSavedSavingPlan) && (
        <>
          <div className="w-full h-full z-10 fixed flex justify-center items-center">
            <div className="bg-secondary h-[30%] w-[50%] flex justify-center items-center relative">
              <button
                className="top-0 right-0 absolute"
                onClick={() => {
                  setShowSuccessMessageForSavedSavingPlan(false);
                  setShowErrorMessageForSavedSavingPlan(false);
                }}
              >
                X
              </button>
              {showSuccessMessageForSavedSavingPlan && (
                <p>Dina ändringar har sparats</p>
              )}

              {showErrorMessageForSavedSavingPlan && (
                <p>Det gick inte att spara</p>
              )}
            </div>
          </div>
        </>
      )}
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
            <button
              onClick={() => setIsCardDetailsEditing(!isCardDetailsEditing)}
            >
              {isCardDetailsEditing
                ? 'Avbryt ändringar'
                : 'Redigera Betalningsuppgifter'}
            </button>
          </div>
          <form onSubmit={handleSave} className="flex flex-col gap-2">
            <label className="flex flex-col gap-2">
              Namn på kortet
              <input
                value={nameOnCard}
                onChange={(e) => setNameOnCard(e.target.value)}
                disabled={!isCardDetailsEditing}
                className="bg-background-muted disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
              />
            </label>
            <label className="flex flex-col gap-2">
              Kortnummer
              <input
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="bg-background-muted disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                disabled={!isCardDetailsEditing}
              />
            </label>

            <div>
              <h3>MM/YY</h3>
              <div className="flex gap-2">
                <input
                  aria-label="Månad kortet går ut"
                  type="number"
                  className="bg-background-muted disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                  value={cardMonth}
                  onChange={(e) => setCardMonth(e.target.value)}
                  disabled={!isCardDetailsEditing}
                />
                <span>/</span>
                <input
                  aria-label="År kortet går ut"
                  type="number"
                  className="bg-background-muted disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                  value={cardYear}
                  onChange={(e) => setCardYear(e.target.value)}
                  disabled={!isCardDetailsEditing}
                />
              </div>
              <div>
                <label className="flex flex-col gap-2">
                  CVV
                  <input
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    type="number"
                    className="bg-background-muted disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                    disabled={!isCardDetailsEditing}
                  />
                </label>
              </div>
            </div>

            <button
              onClick={() => setShowSuccessMessageForSavedCardDetails(true)}
              type="submit"
              className="bg-accent"
            >
              Spara
            </button>
          </form>
        </div>
        <div className="bg-background-muted">
          <div>
            <h2>Din sparningsplan</h2>
            <button
              onSubmit={handleSaveForSavingPlan}
              onClick={() =>
                setIsSavingPlanDetailsEditing(!isSavingPlanDetailsEditing)
              }
            >
              {isSavingPlanDetailsEditing
                ? 'Avbryt ändringar'
                : 'Ändra din sparningsplan'}
            </button>
          </div>
          <form
            onSubmit={handleSaveForSavingPlan}
            className="flex flex-col gap-2"
          >
            <label className="flex flex-col gap-2">
              {' '}
              Examensdag
              <input
                value={graduationDay}
                onChange={(e) => setGraduationDay(e.target.value)}
                className="bg-primary  disabled:text-gray-300 disabled:cursor-not-allowed"
                disabled={!isSavingPlanDetailsEditing}
              />
            </label>
            <label className="flex flex-col gap-2">
              Vilket datum planeras inköpet av mössan?
              <input
                value={dateForPurchaseHat}
                onChange={(e) => setDateForPurchaseHat(e.target.value)}
                className="bg-primary disabled:text-gray-300 disabled:cursor-not-allowed"
                disabled={!isSavingPlanDetailsEditing}
              />
            </label>
            <label className="flex flex-col gap-2">
              Pris på studentmössan
              <input
                value={priceOnHat}
                onChange={(e) => setPriceOnHat(e.target.value)}
                className="bg-primary disabled:text-gray-300 disabled:cursor-not-allowed"
                disabled={!isSavingPlanDetailsEditing}
              />
            </label>
            <label className="flex flex-col gap-2">
              Vill du välja summa att spara per månad? eller vill du spara
              automatiskt den summa som behövs för att köpa mössan?
              <div className="flex gap-2">
                <button
                  type="button"
                  className="bg-primary text-p-white disabled:text-gray-300 disabled:cursor-not-allowed"
                  disabled={!isSavingPlanDetailsEditing}
                  onClick={() => setSavingsMode('manual')}
                >
                  Manuellt
                </button>
                <button
                  type="button"
                  className="bg-primary text-p-white disabled:text-gray-300 disabled:cursor-not-allowed"
                  disabled={!isSavingPlanDetailsEditing}
                  onClick={() => setSavingsMode('auto')}
                >
                  Automatiskt
                </button>
              </div>
            </label>
            {savingsMode === 'manual' && (
              <label className="flex flex-col gap-2">
                Summa du vill spara per månad
                <input
                  value={monthlyAmount}
                  onChange={(e) => setMonthlyAmount(e.target.value)}
                  className="bg-primary disabled:text-gray-300 disabled:cursor-not-allowed"
                  disabled={!isSavingPlanDetailsEditing}
                />
              </label>
            )}
            {savingsMode === 'auto' && (
              <p>Du kommer att spara {monthlyAmount} kr i månaden</p>
            )}
            <button type="submit">Spara</button>
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

// Caluculate what the sum of savings till be at the date for purchasing the hat when in manual savings mode
const calculateSumOfSavingsInManualSavingsMode = (
  monthlyAmount: number,
  dateForPurchaseHat: string
) => {
  const dayLeft = getDaysUntilPurchaseHat(dateForPurchaseHat);

  const monthsLeft = Math.max(0, Math.ceil(dayLeft / 30));

  return monthsLeft * monthlyAmount;
};

// const fastFowardToPurchaseHatDay = (
//   data: UserData,
//   userId: string | undefined
// ) => {
//   // 1. Extra säkerhetskoll
//   if (!userId || !data?.graduation?.dateForPurchaseHat) return;

//   const daysLeft = getDaysUntilPurchaseHat(data.graduation.dateForPurchaseHat);

//   if (daysLeft <= 0) {
//     alert('Datumet har passerat');
//     return;
//   }

//   const monthDifference = Math.max(0, Math.ceil(daysLeft / 30));

//   const pastDate = new Date();
//   pastDate.setMonth(pastDate.getMonth() - monthDifference);

//   // 2. Djupkopiering med JSON.parse/JSON.stringify
//   // Detta garanterar att vi har ett helt nytt, fristående objekt att leka med.
//   const newData = JSON.parse(JSON.stringify(data));

//   // 3. Nu kan vi säkert ändra i det
//   newData.savings.lastTransactionDate = pastDate.toISOString().split('T')[0];

//   localStorage.setItem(`data_${userId}`, JSON.stringify(newData));
//   window.location.reload();
// };

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
      <div className="grid gap-2 md:grid md:grid-cols-6">
        <div className="bg-background-muted md:col-span-4">
          <p>Du sparar just nu {data.savings?.monthlyAmount} kr i månaden </p>
          {data.savings?.savingsMode === 'auto' && (
            <p>
              Du beräknas ha {data.graduation?.priceOnHat} kr den{' '}
              {data.graduation?.dateForPurchaseHat}
            </p>
          )}
          {data.savings?.savingsMode === 'manual' && (
            <p>
              Du beräknas ha{' '}
              {calculateSumOfSavingsInManualSavingsMode(
                // Make sure to convert to numbers before passing to the function
                Number(data.savings?.monthlyAmount),
                data.graduation?.dateForPurchaseHat
              )}{' '}
              kr den {data.graduation?.dateForPurchaseHat}
            </p>
          )}
          <button>Klicka här om du vill ändra din spar-plan</button>
        </div>
        <div className="bg-background-muted md:col-span-2">
          <p>Nästa inbetalning sker datum</p>
        </div>
        <div className="bg-background-muted md:col-span-2">
          <p>
            Studenten är om{' '}
            {getDaysUntilGraduation(data.graduation?.graduationDay)} dagar
          </p>
        </div>
        <div className="bg-background-muted md:col-span-2">
          <p>
            Dags att köpa mössa om:{' '}
            {getDaysUntilPurchaseHat(data.graduation?.dateForPurchaseHat)}
          </p>
        </div>
        <div className="bg-background-muted md:col-span-2">
          <p>Du har sparat: x antal kr</p>
        </div>
      </div>
    </section>
  );
};

const savedAmount = () => {};
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
