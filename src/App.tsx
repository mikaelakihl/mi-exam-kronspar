
import './index.css';

import { BrowserRouter, Route, Routes } from 'react-router';
import {
  SignedIn,
  SignedOut,
} from '@clerk/clerk-react';
import { Layout } from './pages/Layout';
import { Home } from './pages/Home';
import { Statistics } from './pages/Statistics';
import { Settings } from './pages/Settings';


//   const [isOpen, setIsOpen] = useState(false);
//   const [isTimeTravelOpen, setIsTimeTravelOpen] = useState(false);
//   const queryClient = useQueryClient();

//   const { user } = useUser();

//   const { data } = useQuery({
//     queryKey: ['userData', user?.id],
//     queryFn: async () => {
//       if (!user?.id) return null;
//       const response = await fetch(`/api/data?userId=${user.id}`);
//       if (!response.ok) {
//         throw new Error('Kunde inte hämta data');
//       }
//       return response.json();
//     },
//     enabled: !!user?.id,
//   });

//   const hasTimeBackup =
//     user?.id && localStorage.getItem(`data_${user.id}_timeBackup`);

//   const handleFastForwardToPurchaseHatDay = async () => {
//     if (!data || !user?.id) return;

//     await fastForwardToPurchaseHatDay(data, user.id);

//     await queryClient.refetchQueries({ queryKey: ['userData', user?.id] });
//   };

//   const handleFastForwardToGraduationDay = async () => {
//     if (!data || !user?.id) return;

//     await fastForwardToGraduationDay(data, user.id);

//     await queryClient.refetchQueries({ queryKey: ['userData', user.id] });
//   };

//   const handleResetToCurrentTime = async () => {
//     if (!data || !user?.id) return;

//     await resetToCurrentTime(data, user.id);

//     await queryClient.refetchQueries({ queryKey: ['userData', user?.id] });
//   };

//   // if (isLoading) return <div>Laddar statistik...</div>;
//   // if (error) return <div>Kunde inte ladda statistik.</div>;
//   // if (!data) return <div>Ingen data tillgänglig.</div>;



//   return (
//     <>
//       <header className="bg-background flex justify-between items-center">
//         <div>
//           <img
//             src="/assets/kronspar-pig.png"
//             alt="Kronspar"
//             className="w-17 h-17 ml-5"
//           />
//           <div className="absolute top-7 left-3.5 text-center flex flex-col font-bold gap-0 ">
//             <p className="text-xs">
//               {data?.savings?.savedAmount === 0
//                 ? '0'
//                 : data?.savings?.savedAmount}
//             </p>
//             <h1 className=" font-bold text-background-muted text-stroke ">
//               Kronspar
//             </h1>
//           </div>
//         </div>
//         <button
//           className="bg-background text-background hover:bg-primary/80 transition-all duration-300 hover:text-primary hover:border-secondary hover:text-white hover:border-2 p-2 rounded uppercase tracking-wider "
//           onClick={() => setIsTimeTravelOpen(!isTimeTravelOpen)}
//         >
//           Time-travel
//         </button>

//         <div className="flex hidden md:flex items-center gap-4">
//           <SignedOut>
//             <SignInButton mode="modal">
//               <button className="bg-accent text-p-white px-4 py-2 rounded">
//                 Logga in
//               </button>
//             </SignInButton>
//             <SignUpButton mode="modal">
//               <button className="bg-accent text-p-white px-4 py-2 rounded">
//                 Registrera dig
//               </button>
//             </SignUpButton>
//           </SignedOut>
//           <SignedIn>
//             <nav className="flex gap-6 text-p-black bg-secondary/20 glass-effect-input rounded-4xl px-4 py-2">
//               <NavLink
//                 className={({ isActive }) =>
//                   isActive ? 'border-b-2 border-accent' : 'text-p-black'
//                 }
//                 to="/"
//               >
//                 Hem
//               </NavLink>
//               <NavLink
//                 className={({ isActive }) =>
//                   isActive ? 'border-b-2 border-accent' : 'text-p-black'
//                 }
//                 to="/settings"
//               >
//                 Inställningar
//               </NavLink>
//               <NavLink
//                 className={({ isActive }) =>
//                   isActive ? 'border-b-2 border-accent' : 'text-p-black'
//                 }
//                 to="/statistics"
//               >
//                 Statistik
//               </NavLink>
//             </nav>
//             <div className="flex items-center gap-2">
//               <div className="text-primary bg-secondary/20 glass-effect-input rounded-full  p-2  ">
//                 {data?.graduation ? (
//                   <div className="flex items-center gap-2">
//                     <PiStudentFill size={20} />
//                     <p>
//                       {getDaysUntilGraduation(
//                         data.graduation?.graduationDay,
//                         user?.id
//                       )}{' '}
//                     </p>
//                   </div>
//                 ) : null}
//               </div>
//               <div className="flex items-center bg-secondary/20 glass-effect-input rounded-4xl  p-2 [h-60px]  ">
//                 <UserButton />
//               </div>
//             </div>
//           </SignedIn>
//         </div>

//         {/* Mobile menu*/}
//         <div className="md:hidden flex">
//           {' '}
//           <SignedIn>
//             <div className="text-primary bg-secondary/20 glass-effect-input rounded-full  p-2  ">
//               {data?.graduation ? (
//                 <div className="flex items-center gap-2">
//                   <PiStudentFill size={20} />
//                   <p>
//                     {getDaysUntilGraduation(
//                       data.graduation?.graduationDay,
//                       user?.id
//                     )}{' '}
//                   </p>
//                 </div>
//               ) : null}
//             </div>
//             <div className="flex items-center bg-secondary/20 glass-effect-input rounded-4xl  p-2 [h-60px]  ">
//               <UserButton userProfileMode="modal" />
//             </div>
//           </SignedIn>
//           <button onClick={() => setIsOpen(!isOpen)} className="p-2">
//             {isOpen ? (
//               <AiOutlineClose size={30} className="text-accent" />
//             ) : (
//               <GiHamburgerMenu size={30} className="text-accent" />
//             )}
//           </button>
//         </div>
//       </header>
//       {isTimeTravelOpen && (
//         <div className=" z-20 fixed  w-full h-full flex justify-center items-center">
//           <div className="flex gap-4 justify-center items-center bg-primary h-[30%] w-[50%] relative border-2 border-secondary rounded">
//             <button
//               className="top-5 right-5 absolute text-p-white mb-5"
//               onClick={() => setIsTimeTravelOpen(false)}
//             >
//               X
//             </button>
//             {!hasTimeBackup ? (
//               <div className="flex gap-4">
//                 <button
//                   className="bg-secondary text-p-white rounded py-2 px-4 border border-background-muted"
//                   onClick={handleFastForwardToPurchaseHatDay}
//                 >
//                   Mössa
//                 </button>
//                 <button
//                   className="bg-secondary text-p-white rounded py-2 px-4 border border-background-muted"
//                   onClick={handleFastForwardToGraduationDay}
//                 >
//                   Graduation
//                 </button>
//               </div>
//             ) : (
//               <div className="flex flex-col  justify-center items-center">
//                 <p className="text-p-white mt-10">
//                   Du befinner dig i time-travel-läge
//                 </p>
//                 <button
//                   className="bg-accent text-p-white rounded py-2 px-4 border border-background-muted"
//                   onClick={handleResetToCurrentTime}
//                 >
//                   Återställ
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//       {isOpen && (
//         <nav className=" bg-secondary/20 glass-effect-input text-p-black text-center p-4 md:hidden">
//           <SignedOut>
//             <SignInButton mode="modal">
//               <button className="bg-accent text-p-white px-4 py-2 rounded w-full mb-2">
//                 Logga in
//               </button>
//             </SignInButton>
//             <SignUpButton mode="modal">
//               <button className="bg-accent text-p-white px-4 py-2 rounded w-full mb-2">
//                 Registrera dig
//               </button>
//             </SignUpButton>
//           </SignedOut>
//           <SignedIn>
//             <div className="flex flex-col gap-4">
//               <NavLink
//                 className={({ isActive }) =>
//                   isActive ? 'text-accent' : 'text-p-black'
//                 }
//                 to="/"
//               >
//                 Hem
//               </NavLink>
//               <NavLink
//                 className={({ isActive }) =>
//                   isActive ? 'text-accent ' : 'text-p-black'
//                 }
//                 to="/settings"
//               >
//                 Inställningar
//               </NavLink>
//               <NavLink
//                 className={({ isActive }) =>
//                   isActive ? 'text-accent' : 'text-p-black'
//                 }
//                 to="/statistics"
//               >
//                 Statistik
//               </NavLink>
//             </div>
//           </SignedIn>
//         </nav>
//       )}
//     </>
//   );
// };



// const Layout = () => {
//   return (
//     <div className="flex flex-col lg:h-screen lg:overflow-hidden">
//       <Header />
//       <main className="flex-1 bg-gradient lg:px-30 overflow-hidden flex-col flex">
//         <Outlet />
//       </main>
//       <footer className="bg-secondary/60 text-primary p-4 text-center">
//         <p>Copyright 2026 Kronspar</p>
//       </footer>
//     </div>
//   );
// };






// const Statistics = () => {
//   const { user } = useUser();

//   const { data, isLoading, error } = useQuery({
//     queryKey: ['userData', user?.id],
//     queryFn: async () => {
//       if (!user?.id) return null;
//       const response = await fetch(`/api/data?userId=${user.id}`);
//       if (!response.ok) {
//         throw new Error('Kunde inte hämta data');
//       }
//       return response.json();
//     },
//     enabled: !!user?.id,
//   });

//   if (isLoading) return <div>Laddar statistik...</div>;
//   if (error) return <div>Kunde inte ladda statistik.</div>;
//   if (!data) return <div>Ingen data tillgänglig.</div>;

//   return (
//     <section className="tertiary">
//       <h2 className="mb-4 text-center">Statistik</h2>
//       <div className="grid gap-4 md:grid md:grid-cols-6">
//         <div className="glass-effect md:col-span-4 flex flex-col  p-8  ">
//           <h3 className="text-left pb-4">Aktiv status</h3>
//           <div>
//             <div className="flex flex-col gap-2">
//               <p>
//                 <span className="text-3xl md:text-4xl lg:text-5xl text-primary">
//                   {data.savings?.monthlyAmount} kr
//                 </span>{' '}
//                 / månad{' '}
//               </p>
//               {data.savings?.savingsMode === 'auto' && (
//                 <p>
//                   Du beräknas ha <span className="font-bold">{data.graduation?.priceOnHat} kr</span> lagom till{' '}
//                   {data.graduation?.dateForPurchaseHat}
//                 </p>
//               )}
//             </div>
//             <div>
//               {data.savings?.savingsMode === 'manual' && (
//                 <p>
//                   Du beräknas ha{' '}
//                   {calculateSumOfSavingsInManualSavingsMode(
//                     // Make sure to convert to numbers before passing to the function
//                     Number(data.savings?.monthlyAmount),
//                     data.graduation?.dateForPurchaseHat,
//                     user?.id
//                   )}{' '}
//                   kr lagom till {data.graduation?.dateForPurchaseHat}
//                 </p>
//               )}
//             </div>
//           </div>
//           <div className="border-b-2 border-p-disabled my-4"></div>
//           <div className="flex items-center gap-1 text-tertiary">
//             <IoMdSettings />{' '}
//             <NavLink to="/settings">
//               Klicka här om du vill ändra din spar-plan
//             </NavLink>
//           </div>
//         </div>
//         <div className="glass-effect bg-background-muted md:col-span-2 flex flex-col gap-2 justify-between items-center p-8">
//           <div className="flex justify-center items-center rounded-full bg-yellow-100 w-17 h-17 backdrop-blur-lg border border-white shadow-lg">
//             <p className="text-3xl">💸</p>
//           </div>
//           <p className="uppercase font-bold text-gray-500 font-bold">
//             Nästa inbetalning sker datum
//           </p>
//           <p className="text-3xl md:text-4xl lg:text-5xl text-tertiary">
//             {getNextPaymentDate(data.savings?.lastTransactionDate).toString()}
//           </p>
//         </div>
//         <div className="glass-effect md:col-span-2 flex-col flex gap-2 justify-between items-center p-8">
//           <div className="flex justify-center items-center rounded-full bg-yellow-100 w-17 h-17 backdrop-blur-lg border border-white shadow-lg">
//             <p className="text-3xl">📅</p>
//           </div>
//           <p className="uppercase font-bold text-gray-500 font-bold">
//             Studenten är om
//           </p>{' '}
//           <div className="flex items-baseline gap-2">
//             <p className="text-3xl md:text-4xl lg:text-5xl text-tertiary">
//               {getDaysUntilGraduation(
//                 data.graduation?.graduationDay,
//                 user?.id
//               )}{' '}
//             </p>
//             <p className="text-gray-500">Dagar</p>
//           </div>
//         </div>
//         <div className="glass-effect md:col-span-2 flex flex-col  gap-2 justify-between items-center p-8">
//           <div className="flex justify-center items-center rounded-full bg-yellow-100 w-17 h-17 backdrop-blur-lg border border-white shadow-lg">
//             <p className="text-3xl">🎓</p>
//           </div>
//           <p className="uppercase font-bold text-gray-500">Köp mössan om </p>
//           <div className="flex items-baseline gap-2">
//             <p className="text-3xl md:text-4xl lg:text-5xl text-tertiary">
//               {getDaysUntilPurchaseHat(
//                 data.graduation?.dateForPurchaseHat,
//                 user?.id
//               )}
//             </p>
//             <p className="text-gray-500">Dagar</p>
//           </div>
//         </div>
//         <div className=" glass-effect md:col-span-2  flex justify-center flex-col  items-center p-8">
//           <p className="uppercase font-bold text-gray-500">Du har sparat</p>
//           <div className='relative w-fit'>
//             <img
//               src="/assets/kronspar-pig.png"
//               alt="Kronspar"
//               className="w-35 h-35  relative"
//             />
//             <div className="absolute inset-0 text-center flex flex-col font-bold gap-0 pt-15 pr-5 ">
//               <p className="text-3xl">
//                 {data?.savings?.savedAmount === 0
//                   ? '0'
//                   : data?.savings?.savedAmount}
//               </p>
//               {/* <p className=" font-bold text-background-muted text-stroke text-3xl">
//                 Kronspar
//               </p> */}
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

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
