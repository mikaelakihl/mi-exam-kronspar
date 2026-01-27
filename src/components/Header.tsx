
import { useState } from "react";
import { SignedIn, SignedOut, } from "@clerk/clerk-react";
import { useUserData } from "../hooks/useUserData";
import { HamburgerIcon, HamburgerMenu } from "./menu/Hamburger";
import { DesktopMenu } from "./menu/Desktop";
import { TimeTravelButton } from "./TimeTravel";

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { data } = useUserData();


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
                <TimeTravelButton data={data} />
                <DesktopMenu data={data} />

                <HamburgerIcon data={data} isOpen={isOpen} setIsOpen={setIsOpen} />
            </header>

            {isOpen && (
                <HamburgerMenu />
            )}
        </>
    );
};
