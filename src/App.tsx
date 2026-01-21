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
import { IoIosSave, IoMdSettings } from 'react-icons/io';
import { PiHandWithdrawFill, PiStudentFill } from 'react-icons/pi';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTimeTravelOpen, setIsTimeTravelOpen] = useState(false);
  const queryClient = useQueryClient();

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

  const hasTimeBackup =
    user?.id && localStorage.getItem(`data_${user.id}_timeBackup`);

  const handleFastForwardToPurchaseHatDay = async () => {
    if (!data || !user?.id) return;

    await fastForwardToPurchaseHatDay(data, user.id);

    await queryClient.refetchQueries({ queryKey: ['userData', user?.id] });
  };

  const handleFastForwardToGraduationDay = async () => {
    if (!data || !user?.id) return;

    await fastForwardToGraduationDay(data, user.id);

    await queryClient.refetchQueries({ queryKey: ['userData', user.id] });
  };

  const handleResetToCurrentTime = async () => {
    if (!data || !user?.id) return;

    await resetToCurrentTime(data, user.id);

    await queryClient.refetchQueries({ queryKey: ['userData', user?.id] });
  };

  // if (isLoading) return <div>Laddar statistik...</div>;
  // if (error) return <div>Kunde inte ladda statistik.</div>;
  // if (!data) return <div>Ingen data tillgänglig.</div>;



  return (
    <>
      <header className="bg-background flex justify-between items-center">
        <div>
          <img
            src="/assets/kronspar-pig.png"
            alt="Kronspar"
            className="w-17 h-17 ml-5"
          />
          <div className="absolute top-7 left-3.5 text-center flex flex-col font-bold gap-0 ">
            <p className="text-xs">
              {data?.savings?.savedAmount === 0
                ? '0'
                : data?.savings?.savedAmount}
            </p>
            <h1 className=" font-bold text-background-muted text-stroke ">
              Kronspar
            </h1>
          </div>
        </div>
        <button
          className="bg-background text-background hover:bg-primary/80 transition-all duration-300 hover:text-primary hover:border-secondary hover:text-white hover:border-2 p-2 rounded uppercase tracking-wider "
          onClick={() => setIsTimeTravelOpen(!isTimeTravelOpen)}
        >
          Time-travel
        </button>

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
            <nav className="flex gap-6 text-p-black bg-secondary/20 glass-effect-input rounded-4xl px-4 py-2">
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'border-b-2 border-accent' : 'text-p-black'
                }
                to="/"
              >
                Hem
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'border-b-2 border-accent' : 'text-p-black'
                }
                to="/settings"
              >
                Inställningar
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'border-b-2 border-accent' : 'text-p-black'
                }
                to="/statistics"
              >
                Statistik
              </NavLink>
            </nav>
            <div className="flex items-center gap-2">
              <div className="text-primary bg-secondary/20 glass-effect-input rounded-full  p-2  ">
                {data?.graduation ? (
                  <div className="flex items-center gap-2">
                    <PiStudentFill size={20} />
                    <p>
                      {getDaysUntilGraduation(
                        data.graduation?.graduationDay,
                        user?.id
                      )}{' '}
                    </p>
                  </div>
                ) : null}
              </div>
              <div className="flex items-center bg-secondary/20 glass-effect-input rounded-4xl  p-2 [h-60px]  ">
                <UserButton />
              </div>
            </div>
          </SignedIn>
        </div>

        {/* Mobile menu*/}
        <div className="md:hidden flex">
          {' '}
          <SignedIn>
            <div className="text-primary bg-secondary/20 glass-effect-input rounded-full  p-2  ">
              {data?.graduation ? (
                <div className="flex items-center gap-2">
                  <PiStudentFill size={20} />
                  <p>
                    {getDaysUntilGraduation(
                      data.graduation?.graduationDay,
                      user?.id
                    )}{' '}
                  </p>
                </div>
              ) : null}
            </div>
            <div className="flex items-center bg-secondary/20 glass-effect-input rounded-4xl  p-2 [h-60px]  ">
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
      {isTimeTravelOpen && (
        <div className=" z-20 fixed  w-full h-full flex justify-center items-center">
          <div className="flex gap-4 justify-center items-center bg-primary h-[30%] w-[50%] relative border-2 border-secondary rounded">
            <button
              className="top-5 right-5 absolute text-p-white mb-5"
              onClick={() => setIsTimeTravelOpen(false)}
            >
              X
            </button>
            {!hasTimeBackup ? (
              <div className="flex gap-4">
                <button
                  className="bg-secondary text-p-white rounded py-2 px-4 border border-background-muted"
                  onClick={handleFastForwardToPurchaseHatDay}
                >
                  Mössa
                </button>
                <button
                  className="bg-secondary text-p-white rounded py-2 px-4 border border-background-muted"
                  onClick={handleFastForwardToGraduationDay}
                >
                  Graduation
                </button>
              </div>
            ) : (
              <div className="flex flex-col  justify-center items-center">
                <p className="text-p-white mt-10">
                  Du befinner dig i time-travel-läge
                </p>
                <button
                  className="bg-accent text-p-white rounded py-2 px-4 border border-background-muted"
                  onClick={handleResetToCurrentTime}
                >
                  Återställ
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {isOpen && (
        <nav className=" bg-secondary/20 glass-effect-input text-p-black text-center p-4 md:hidden">
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
                  isActive ? 'text-accent' : 'text-p-black'
                }
                to="/"
              >
                Hem
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'text-accent ' : 'text-p-black'
                }
                to="/settings"
              >
                Inställningar
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'text-accent' : 'text-p-black'
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
    <div className="flex flex-col lg:h-screen lg:overflow-hidden">
      <Header />
      <main className="flex-1 bg-gradient lg:px-30 overflow-hidden flex-col flex">
        <Outlet />
      </main>
      <footer className="bg-secondary/60 text-primary p-4 text-center">
        <p>Copyright 2026 Kronspar</p>
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

  const [showWithdrawalSuccessMessage, setShowWithdrawalSuccessMessage] =
    useState(false);

  const [showWithdrawalErrorMessage, setShowWithdrawalErrorMessage] =
    useState(false);

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
      const daysLeft = getDaysUntilPurchaseHat(dateForPurchaseHat, user?.id);
      const monthsLeft = Math.max(1, Math.ceil(daysLeft / 30));
      const price = parseFloat(priceOnHat);
      if (!isNaN(price)) {
        const calculatedAmount = Math.ceil(price / monthsLeft);
        setMonthlyAmount(calculatedAmount.toString());
      }
    }
  }, [savingsMode, priceOnHat, dateForPurchaseHat, user?.id]);

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
    <section className="lg:h-screen lg:overflow-hidden flex-col flex">
      <h2 className="mb-4 text-center text-tertiary">Inställningar</h2>
      <div className="grid gap-0 lg:gap-4 lg:grid-cols-3 flex-1 min-h-0">
        {(showSuccessMessageForSavedCardDetails ||
          showErrorMessageForSavedCardDetails) && (
            <>
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 text-p-black">
                <div className="relative bg-background/60 glass-effect-input   w-[90%] md:w-[50%] p-8 rounded-xl shadow-2xl flex flex-col items-center text-center">
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
                    <div className="flex flex-col gap-2 items-center justify-center">
                      <h3>Allt gick bra!</h3>
                      <p>Dina ändringar har sparats</p>
                    </div>
                  )}

                  {showErrorMessageForSavedCardDetails && (
                    <div className="flex flex-col gap-2 items-center justify-center">
                      <h3>Oops!</h3>
                      <p>Det gick inte att spara</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        {(showSuccessMessageForSavedSavingPlan ||
          showErrorMessageForSavedSavingPlan) && (
            <>
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 text-p-black">
                <div className="relative bg-background/60 glass-effect-input   w-[90%] md:w-[50%] p-8 rounded-xl shadow-2xl flex flex-col items-center text-center">
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
                    <div className="flex flex-col gap-2 items-center justify-center">
                      <h3>Allt gick bra!</h3>
                      <p>Dina ändringar har sparats</p>
                    </div>
                  )}

                  {showErrorMessageForSavedSavingPlan && (
                    <div className="flex flex-col gap-2 items-center justify-center">
                      <h3>Oops!</h3>
                      <p>Det gick inte att spara</p>

                      <p>Det gick inte att spara</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        {showWithdrawalSuccessMessage && (
          <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 text-p-black">
              <div className="relative bg-background/60 glass-effect-input   w-[90%] md:w-[50%] p-8 rounded-xl shadow-2xl flex flex-col items-center text-center">
                <button
                  className="top-0 right-0 absolute"
                  onClick={() => {
                    setShowWithdrawalSuccessMessage(false);
                  }}
                >
                  X
                </button>
                <div className="flex flex-col gap-2 items-center justify-center">
                  <h3>Grattis!</h3>
                  <p>
                    Ditt uttag lyckades, pengarna når ditt konto inom 1-3
                    arbetsdagar
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
        {showWithdrawalErrorMessage && (
          <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 text-p-black">
              <div className="relative bg-background/60 glass-effect-input   w-[90%] md:w-[50%] p-8 rounded-xl shadow-2xl flex flex-col items-center text-center">
                <button
                  className="top-0 right-0 absolute"
                  onClick={() => {
                    setShowWithdrawalSuccessMessage(false);
                  }}
                >
                  X
                </button>
                <div className="flex flex-col gap-2 items-center justify-center">
                  <h3>Oops!</h3>
                  <p>Något gick fel, försök igen senare</p>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="lg:col-span-1 lg:overflow-y-auto">
            <h3 className="p-4  text-tertiary">Information</h3>
            <div className="p-2 text-tertiary">
              <p>Här hittar du information om hur ditt sparande fungerar.</p>
              <p>
                Klicka på rubrikerna nedan för att läsa mer om betalningar,
                uttag och hur du hanterar dina uppgifter.
              </p>
            </div>
            <div>
              <details>
                <summary className="bg-primary text-p-white rounded-lg p-3 ">
                  Betalning
                </summary>
                <div className="flex flex-col gap-2 bg-background rounded-lg  p-3">
                  <p>
                    När du registrerat dina kortuppgifter kan du välja mellan
                    två sätt att spara.
                  </p>
                  <p>
                    Med automatisk sparning beräknar systemet månadsbeloppet
                    baserat på priset på studentmössan och när du planerar att
                    köpa den.
                  </p>
                  <p>
                    Beloppet dras automatiskt från ditt kort varje månad. Med
                    manuell sparning väljer du själv månadsbeloppet, som också
                    dras automatiskt varje månad.
                  </p>
                  <p>
                    Betalningarna sker automatiskt varje månad baserat på när du
                    senast gjorde en betalning.
                  </p>
                  <p>
                    När du loggar in uppdateras ditt sparande med eventuella
                    månader som har passerat sedan senaste betalningen.
                  </p>
                </div>
              </details>
            </div>
            <details>
              <summary className="bg-primary text-p-white rounded-lg p-3">
                Uttag
              </summary>
              <div className="flex flex-col gap-2 bg-background rounded-lg  p-3">
                <p>
                  Du kan när som helst ta ut dina sparade pengar. När du gör ett
                  uttag skickas pengarna tillbaka till ditt konto och når dig
                  inom 1–3 arbetsdagar.
                </p>
                <p>
                  Efter ett uttag nollställs ditt sparande, men du kan fortsätta
                  spara igen genom att behålla din sparningsplan aktiv.
                </p>
              </div>
            </details>
            <details>
              <summary className="bg-primary text-p-white rounded-lg p-3">
                Hantera dina uppgifter
              </summary>
              <div className="flex flex-col gap-2 bg-background rounded-lg  p-3">
                <p>
                  Du kan när som helst ändra dina kortuppgifter, sparningsplan
                  eller ta ut pengar via inställningar
                </p>
                <p>Alla ändringar sparas direkt när du klickar på "Spara".</p>
              </div>
            </details>
          </div>
        </div>
        <div className="lg:flex- flex flex-col gap-0 lg:gap-4 lg:overflow-y-auto lg:col-span-2">
          <div className="bg-background-muted glass-effect-input flex flex-col gap-4 lg:gap-0 rounded-3xl p-8 m-4 ">
            <div className="flex flex-row justify-between items-center pb-4 ">
              <h3>Betalningsuppgifter</h3>
              <button
                className="flex items-center gap-1 text-p-black"
                onClick={() => setIsCardDetailsEditing(!isCardDetailsEditing)}
              >
                <IoMdSettings />
                {isCardDetailsEditing ? 'Avbryt' : 'Ändra'}
              </button>
            </div>
            <div className="border-b-2 border-background "></div>
            <form
              onSubmit={handleSave}
              className="flex flex-col gap-2 pt-4 uppercase"
            >
              <label className="flex flex-col gap-2">
                Namn på kortet
                <input
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  disabled={!isCardDetailsEditing}
                  className="  disabled:text-p-disabled disabled:cursor-not-allowed "
                />
              </label>
              <label className="flex flex-col gap-2">
                Kortnummer
                <input
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className=" disabled:text-p-disabled disabled:cursor-not-allowed "
                  disabled={!isCardDetailsEditing}
                />
              </label>

              <div className="flex flex-row gap-2">
                <div>
                  <p className="text-base  lg:text-lg mb-2">
                    Gilftighetstid (MM/YY)
                  </p>
                  <div className="flex gap-2">
                    <input
                      aria-label="Månad kortet går ut"
                      type="number"
                      className=" w-full min-w-0 flex-1  disabled:text-p-disabled disabled:cursor-not-allowed "
                      value={cardMonth}
                      onChange={(e) => setCardMonth(e.target.value)}
                      disabled={!isCardDetailsEditing}
                    />
                    <span>/</span>
                    <input
                      aria-label="År kortet går ut"
                      type="number"
                      className=" w-full min-w-0 flex-1  disabled:text-p-disabled disabled:cursor-not-allowed "
                      value={cardYear}
                      onChange={(e) => setCardYear(e.target.value)}
                      disabled={!isCardDetailsEditing}
                    />
                  </div>
                </div>
                <div>
                  <label className="flex flex-col gap-2">
                    CVV
                    <input
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      type="number"
                      className="disabled:text-p-disabled disabled:cursor-not-allowed text-base"
                      disabled={!isCardDetailsEditing}
                    />
                  </label>
                </div>
              </div>

              {isCardDetailsEditing && (
                <button
                  onClick={() => setShowSuccessMessageForSavedCardDetails(true)}
                  type="submit"
                  className="text-p-white bg-primary glass-effect-input rounded-4xl w-1/2 flex justify-center items-center gap-2"
                >
                  <IoIosSave />
                  Spara
                </button>
              )}
            </form>
          </div>

          <div className="bg-background-muted glass-effect-input   rounded-3xl  flex flex-col items-center p-8 m-4">
            <div className="flex flex-row justify-between items-center pb-4 w-full ">
              <h3 className="text-tertiary text-left">Din sparningsplan</h3>
              <button
                className="flex items-center gap-1 text-tertiary"
                onSubmit={handleSaveForSavingPlan}
                onClick={() =>
                  setIsSavingPlanDetailsEditing(!isSavingPlanDetailsEditing)
                }
              >
                <IoMdSettings />
                {isSavingPlanDetailsEditing ? 'Avbryt' : 'Ändra'}
              </button>
            </div>
            <div className="border-b-2 border-background w-full"></div>
            <form
              onSubmit={handleSaveForSavingPlan}
              className="flex flex-col gap-2 pt-4 uppercase w-full"
            >
              <div className="flex flex-col md:flex-row gap-2">
                <label className="flex flex-col gap-2 text-tertiary">
                  {' '}
                  Examensdag
                  <input
                    value={graduationDay}
                    onChange={(e) => setGraduationDay(e.target.value)}
                    className=" disabled:text-p-disabled disabled:cursor-not-allowed text-p-black"
                    disabled={!isSavingPlanDetailsEditing}
                  />
                </label>
                <label className="flex flex-col gap-2 text-tertiary">
                  Vilket datum planeras inköpet av mössan?
                  <input
                    value={dateForPurchaseHat}
                    onChange={(e) => setDateForPurchaseHat(e.target.value)}
                    className="  disabled:text-p-disabled disabled:cursor-not-allowed text-p-black"
                    disabled={!isSavingPlanDetailsEditing}
                  />
                </label>
              </div>
              <label className="flex flex-col gap-2 text-tertiary">
                Pris på studentmössan
                <input
                  value={priceOnHat}
                  onChange={(e) => setPriceOnHat(e.target.value)}
                  className="  disabled:text-p-disabled disabled:cursor-not-allowed text-p-black"
                  disabled={!isSavingPlanDetailsEditing}
                />
              </label>
              <label className="flex flex-col gap-2 text-tertiary">
                Hur vill du spara?
                <div className="flex gap-2 mb-2">
                  <button
                    type="button"
                    className={` rounded-xl disabled:text-p-disabled disabled:cursor-not-allowed  w-full ${savingsMode === 'manual' ? 'bg-secondary/30 text-p-primary' : 'bg-p-white border border-2 border-secondary/30 text-p-black'}`}
                    disabled={!isSavingPlanDetailsEditing}
                    onClick={() => setSavingsMode('manual')}
                  >
                    Manuellt
                  </button>
                  <button
                    type="button"
                    className={`rounded-xl disabled:text-p-disabled disabled:cursor-not-allowed  w-full ${savingsMode === 'auto' ? 'bg-secondary/30 text-p-primary' : 'bg-p-white border border-2 border-secondary/30 text-p-black'}`}
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
                    className=" rounded-lg disabled:bg-text-p-white disabled:text-gray-300 disabled:cursor-not-allowed"
                    disabled={!isSavingPlanDetailsEditing}
                  />
                </label>
              )}
              {savingsMode === 'auto' && (
                <p className="text-tertiary">
                  Vi drar {monthlyAmount} kr / månad
                </p>
              )}
              <div className="grid grid-cols-2 gap-2">
                {isSavingPlanDetailsEditing && (
                  <button
                    className="text-p-white bg-primary glass-effect-input rounded-4xl flex justify-center items-center gap-2"
                    type="submit"
                  >
                    <IoIosSave />
                    Spara
                  </button>
                )}
                <button
                  type="button"
                  className="text-p-black bg-accent glass-effect-input rounded-4xl flex justify-center items-center gap-2"
                  onClick={() => {
                    if (userData && user?.id) {
                      const updatedData = withdrawSavings(userData, user.id);
                      if (updatedData) {
                        queryClient.invalidateQueries({
                          queryKey: ['userData', user.id],
                        });
                        setShowWithdrawalSuccessMessage(true);
                      } else {
                        setShowWithdrawalErrorMessage(true);
                      }
                    } else {
                      setShowWithdrawalErrorMessage(true);
                    }
                  }}
                >
                  <PiHandWithdrawFill />
                  Ta ut sparande
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const withdrawSavings = (data: UserData, userId: string) => {
  if (!userId || !data?.savings) {
    return null;
  }

  const newData = JSON.parse(JSON.stringify(data));
  newData.savings.savedAmount = 0;

  localStorage.setItem(`data_${userId}`, JSON.stringify(newData));

  return newData;
};

const getDaysUntilGraduation = (
  graduationDateString: string,
  userId?: string
) => {
  let today = new Date();

  // Om vi är i time travel-läge, använd simulerat datum
  if (userId) {
    const simulatedDateStr = localStorage.getItem(
      `data_${userId}_simulatedDate`
    );
    if (simulatedDateStr) {
      today = new Date(simulatedDateStr);
    }
  }

  const graduationDay = new Date(graduationDateString);

  const timeDifference = graduationDay.getTime() - today.getTime();

  if (timeDifference < 0) {
    return 0;
  }

  const oneDayToMilliseconds = 1000 * 60 * 60 * 24;

  const dayLeftUntilGraduation = timeDifference / oneDayToMilliseconds;

  return Math.ceil(dayLeftUntilGraduation);
};

const getDaysUntilPurchaseHat = (
  dateForPurchasingHatString: string,
  userId?: string
) => {
  let today = new Date();

  // Om vi är i time travel-läge, använd simulerat datum
  if (userId) {
    const simulatedDateStr = localStorage.getItem(
      `data_${userId}_simulatedDate`
    );
    if (simulatedDateStr) {
      today = new Date(simulatedDateStr);
    }
  }

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
  dateForPurchaseHat: string,
  userId?: string
) => {
  const dayLeft = getDaysUntilPurchaseHat(dateForPurchaseHat, userId);

  const monthsLeft = Math.max(0, Math.ceil(dayLeft / 30));

  return monthsLeft * monthlyAmount;
};

const fastForwardToPurchaseHatDay = async (
  data: UserData,
  userId: string | undefined
) => {
  // 1. Extra säkerhetskoll
  if (!userId || !data?.graduation?.dateForPurchaseHat) {
    alert('Saknar nödvändig information');
    return null;
  }

  const daysLeft = getDaysUntilPurchaseHat(
    data.graduation.dateForPurchaseHat,
    userId
  );

  if (daysLeft <= 0) {
    alert('Datumet har redan passerat');
    return null;
  }

  // 2. SPARA ENDAST TIDSRELATERADE VÄRDEN I BACKUP
  // (savedAmount och lastTransactionDate)
  const timeBackup = {
    savedAmount: data.savings?.savedAmount || 0,
    lastTransactionDate: data.savings?.lastTransactionDate || null,
  };
  localStorage.setItem(`data_${userId}_timeBackup`, JSON.stringify(timeBackup));

  // 3. Beräkna månadsskillnaden
  const monthsLeft = Math.max(0, Math.ceil(daysLeft / 30));

  // 4. Beräkna hur mycket som skulle ha sparats
  const monthlyAmount = Number(data.savings?.monthlyAmount) || 0;
  const amountToAdd = monthsLeft * monthlyAmount;

  // 5. Skapa ett datum i framtiden (köpdatumet)
  const purchaseDate = new Date(data.graduation.dateForPurchaseHat);

  // 6. Djupkopiering med JSON.parse/JSON.stringify
  const newData = JSON.parse(JSON.stringify(data));

  // 7. Uppdatera ENDAST tidsrelaterade värden
  newData.savings.savedAmount =
    (newData.savings.savedAmount || 0) + amountToAdd;
  newData.savings.lastTransactionDate = purchaseDate
    .toISOString()
    .split('T')[0];

  // 8. Spara simulerat datum för time travel
  localStorage.setItem(
    `data_${userId}_simulatedDate`,
    purchaseDate.toISOString().split('T')[0]
  );

  // 9. Spara till localStorage (behåller alla andra inställningar)
  localStorage.setItem(`data_${userId}`, JSON.stringify(newData));

  return newData;
};

const fastForwardToGraduationDay = async (
  data: UserData,
  userId: string | undefined
) => {
  // 1. Extra säkerhetskoll
  if (!userId || !data?.graduation?.graduationDay) {
    alert('Saknar nödvändig information');
    return null;
  }

  const daysLeft = getDaysUntilGraduation(
    data.graduation.graduationDay,
    userId
  );

  if (daysLeft <= 0) {
    alert('Datumet har redan passerat');
    return null;
  }

  // 2. SPARA ENDAST TIDSRELATERADE VÄRDEN I BACKUP
  // (savedAmount och lastTransactionDate)
  const timeBackup = {
    savedAmount: data.savings?.savedAmount || 0,
    lastTransactionDate: data.savings?.lastTransactionDate || null,
  };
  localStorage.setItem(`data_${userId}_timeBackup`, JSON.stringify(timeBackup));

  // 3. Beräkna månadsskillnaden
  const monthsLeft = Math.max(0, Math.ceil(daysLeft / 30));

  // 4. Beräkna hur mycket som skulle ha sparats
  const monthlyAmount = Number(data.savings?.monthlyAmount) || 0;
  const amountToAdd = monthsLeft * monthlyAmount;

  // 5. Skapa ett datum i framtiden (examensdagen)
  const graduationDate = new Date(data.graduation.graduationDay);

  // 6. Djupkopiering med JSON.parse/JSON.stringify
  const newData = JSON.parse(JSON.stringify(data));

  // 7. Uppdatera ENDAST tidsrelaterade värden
  newData.savings.savedAmount =
    (newData.savings.savedAmount || 0) + amountToAdd;
  newData.savings.lastTransactionDate = graduationDate
    .toISOString()
    .split('T')[0];

  // 8. Spara simulerat datum för time travel
  localStorage.setItem(
    `data_${userId}_simulatedDate`,
    graduationDate.toISOString().split('T')[0]
  );

  // 9. Spara till localStorage (behåller alla andra inställningar)
  localStorage.setItem(`data_${userId}`, JSON.stringify(newData));

  return newData;
};

const resetToCurrentTime = async (
  data: UserData,
  userId: string | undefined
) => {
  if (!userId) {
    alert('Saknar användar-ID');
    return null;
  }

  // 1. Hämta backup av tidsrelaterade värden
  const timeBackupString = localStorage.getItem(`data_${userId}_timeBackup`);

  if (!timeBackupString) {
    alert('Ingen backup hittades. Kan inte återställa.');
    return null;
  }

  const timeBackup = JSON.parse(timeBackupString);

  // 2. Djupkopiera nuvarande data (som innehåller alla användarens inställningar)
  const currentData = JSON.parse(JSON.stringify(data));

  // 3. Återställ ENDAST tidsrelaterade värden från backup
  currentData.savings.savedAmount = timeBackup.savedAmount;
  currentData.savings.lastTransactionDate = timeBackup.lastTransactionDate;

  // 4. Spara tillbaka (med alla inställningar intakta)
  localStorage.setItem(`data_${userId}`, JSON.stringify(currentData));

  // 5. Ta bort backup och simulerat datum
  localStorage.removeItem(`data_${userId}_timeBackup`);
  localStorage.removeItem(`data_${userId}_simulatedDate`);

  return currentData;
};

const getNextPaymentDate = (lastPaymentDate: string) => {
  if (!lastPaymentDate) return 'Datum saknas';

  const date = new Date(lastPaymentDate);
  date.setMonth(date.getMonth() + 1);

  return date.toLocaleDateString('sv-SE', {
    day: 'numeric',
    month: 'long',
  });
};

console.log(getNextPaymentDate('2026-01-20'));

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
    <section className="tertiary">
      <h2 className="mb-4 text-center">Statistik</h2>
      <div className="grid gap-4 md:grid md:grid-cols-6">
        <div className="glass-effect md:col-span-4 flex flex-col  p-8  ">
          <h3 className="text-left pb-4">Aktiv status</h3>
          <div>
            <div className="flex flex-col gap-2">
              <p>
                <span className="text-3xl md:text-4xl lg:text-5xl text-primary">
                  {data.savings?.monthlyAmount} kr
                </span>{' '}
                / månad{' '}
              </p>
              {data.savings?.savingsMode === 'auto' && (
                <p>
                  Du beräknas ha <span className="font-bold">{data.graduation?.priceOnHat} kr</span> lagom till{' '}
                  {data.graduation?.dateForPurchaseHat}
                </p>
              )}
            </div>
            <div>
              {data.savings?.savingsMode === 'manual' && (
                <p>
                  Du beräknas ha{' '}
                  {calculateSumOfSavingsInManualSavingsMode(
                    // Make sure to convert to numbers before passing to the function
                    Number(data.savings?.monthlyAmount),
                    data.graduation?.dateForPurchaseHat,
                    user?.id
                  )}{' '}
                  kr lagom till {data.graduation?.dateForPurchaseHat}
                </p>
              )}
            </div>
          </div>
          <div className="border-b-2 border-p-disabled my-4"></div>
          <div className="flex items-center gap-1 text-tertiary">
            <IoMdSettings />{' '}
            <NavLink to="/settings">
              Klicka här om du vill ändra din spar-plan
            </NavLink>
          </div>
        </div>
        <div className="glass-effect bg-background-muted md:col-span-2 flex flex-col gap-2 justify-between items-center p-8">
          <div className="flex justify-center items-center rounded-full bg-yellow-100 w-17 h-17 backdrop-blur-lg border border-white shadow-lg">
            <p className="text-3xl">💸</p>
          </div>
          <p className="uppercase font-bold text-gray-500 font-bold">
            Nästa inbetalning sker datum
          </p>
          <p className="text-3xl md:text-4xl lg:text-5xl text-tertiary">
            {getNextPaymentDate(data.savings?.lastTransactionDate).toString()}
          </p>
        </div>
        <div className="glass-effect md:col-span-2 flex-col flex gap-2 justify-between items-center p-8">
          <div className="flex justify-center items-center rounded-full bg-yellow-100 w-17 h-17 backdrop-blur-lg border border-white shadow-lg">
            <p className="text-3xl">📅</p>
          </div>
          <p className="uppercase font-bold text-gray-500 font-bold">
            Studenten är om
          </p>{' '}
          <div className="flex items-baseline gap-2">
            <p className="text-3xl md:text-4xl lg:text-5xl text-tertiary">
              {getDaysUntilGraduation(
                data.graduation?.graduationDay,
                user?.id
              )}{' '}
            </p>
            <p className="text-gray-500">Dagar</p>
          </div>
        </div>
        <div className="glass-effect md:col-span-2 flex flex-col  gap-2 justify-between items-center p-8">
          <div className="flex justify-center items-center rounded-full bg-yellow-100 w-17 h-17 backdrop-blur-lg border border-white shadow-lg">
            <p className="text-3xl">🎓</p>
          </div>
          <p className="uppercase font-bold text-gray-500">Köp mössan om </p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl md:text-4xl lg:text-5xl text-tertiary">
              {getDaysUntilPurchaseHat(
                data.graduation?.dateForPurchaseHat,
                user?.id
              )}
            </p>
            <p className="text-gray-500">Dagar</p>
          </div>
        </div>
        <div className=" glass-effect md:col-span-2  flex justify-center flex-col  items-center p-8">
          <p className="uppercase font-bold text-gray-500">Du har sparat</p>
          <div className='relative w-fit'>
            <img
              src="/assets/kronspar-pig.png"
              alt="Kronspar"
              className="w-35 h-35  relative"
            />
            <div className="absolute inset-0 text-center flex flex-col font-bold gap-0 pt-15 pr-5 ">
              <p className="text-3xl">
                {data?.savings?.savedAmount === 0
                  ? '0'
                  : data?.savings?.savedAmount}
              </p>
              {/* <p className=" font-bold text-background-muted text-stroke text-3xl">
                Kronspar
              </p> */}
            </div>
          </div>

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
