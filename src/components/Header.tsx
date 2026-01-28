
import { useState } from "react";
import { SignedIn, SignedOut, } from "@clerk/clerk-react";
import { useUserData } from "../hooks/useUserData";
import { HamburgerIcon, HamburgerMenu } from "./menu/Hamburger";
import { DesktopMenu } from "./menu/Desktop";
import { TimeTravelButton } from "./TimeTravel";
import { KronsparLogo } from "./KronsparLogo";

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { data } = useUserData();


    // if (isLoading) return <div>Laddar statistik...</div>;
    // if (error) return <div>Kunde inte ladda statistik.</div>;
    // if (!data) return <div>Ingen data tillgänglig.</div>;



    return (
        <>
            <header className="bg-background flex justify-between items-center">
                <KronsparLogo data={data} />
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
