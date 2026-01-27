
import { useState } from "react";
import { SignedIn, SignedOut, } from "@clerk/clerk-react";
import { useTimeTravel } from "../hooks/useTimeTravel";
import { useUserData } from "../hooks/useUserData";
import { HamburgerIcon, HamburgerMenu } from "./menu/Hamburger";
import { DesktopMenu } from "./menu/Desktop";

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isTimeTravelOpen, setIsTimeTravelOpen] = useState(false);

    const { data } = useUserData();

    const { fastForwardToPurchaseHatDay, fastForwardToGraduationDay, resetToCurrentTime, simulatedDate } = useTimeTravel();

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

                    <SignedIn>
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
                    </SignedIn>
                    <SignedOut>
                        <h1 className=" font-bold text-background-muted text-stroke absolute top-11 left-3.5   ">
                            Kronspar
                        </h1>
                    </SignedOut>
                </div>
                <button
                    className="bg-background text-background hover:bg-primary/80 transition-all duration-300 hover:text-primary hover:border-secondary hover:text-white hover:border-2 p-2 rounded uppercase tracking-wider "
                    onClick={() => setIsTimeTravelOpen(!isTimeTravelOpen)}
                >
                    Time-travel
                </button>

                <DesktopMenu data={data} />

                <HamburgerIcon data={data} isOpen={isOpen} setIsOpen={setIsOpen} />
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
                <HamburgerMenu />
            )}
        </>
    );
};
