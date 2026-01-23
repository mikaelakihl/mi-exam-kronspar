
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { NavLink } from "react-router";
import { PiStudentFill } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { useTimeTravel } from "../contexts/TimeTravelContext";

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isTimeTravelOpen, setIsTimeTravelOpen] = useState(false);

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
    const { fastForwardToPurchaseHatDay, fastForwardToGraduationDay, resetToCurrentTime, simulatedDate, getDaysUntilGraduation } = useTimeTravel();

    const hasTimeBackup =
        !!simulatedDate

    const handleFastForwardToPurchaseHatDay = async () => {
        if (!data) return;
        await fastForwardToPurchaseHatDay(data);
    };


    const handleFastForwardToGraduationDay = async () => {
        if (!data) return;

        await fastForwardToGraduationDay(data);

    };

    const handleResetToCurrentTime = async () => {
        if (!data) return;

        await resetToCurrentTime(data);

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
                                                data.graduation?.graduationDay
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
                                            data.graduation?.graduationDay
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
