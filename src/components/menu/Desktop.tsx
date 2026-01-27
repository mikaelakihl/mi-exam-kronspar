import { SignedIn, SignUpButton, UserButton } from "@clerk/clerk-react";
import { SignInButton } from "@clerk/clerk-react";

import { SignedOut } from "@clerk/clerk-react";
import { useTimeTravel } from "../../hooks/useTimeTravel";
import type { DataProps } from "./Hamburger";
import { NavLink } from "react-router";
import { PiStudentFill } from "react-icons/pi";



export const DesktopMenu = ({ data }: DataProps) => {
    const { getDaysUntilGraduation } = useTimeTravel();
    return (
        <div className="flex hidden md:flex items-center gap-4">
            <SignedOut>
                <SignInButton mode="modal">
                    <button className="bg-accent text-p-white px-4 py-2 rounded-4xl glass-effect-input">
                        Logga in
                    </button>
                </SignInButton>
                <SignUpButton mode="modal">
                    <button className="bg-accent text-p-white px-4 py-2 rounded-4xl glass-effect-input">
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
    )
}