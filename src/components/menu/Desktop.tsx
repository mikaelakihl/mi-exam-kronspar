import { SignedIn, SignUpButton, UserButton } from "@clerk/clerk-react";
import { SignInButton } from "@clerk/clerk-react";

import { SignedOut } from "@clerk/clerk-react";
import { useTimeTravel } from "../../hooks/useTimeTravel";
import type { DataProps } from "./Hamburger";
import { NavLink } from "react-router";
import { PiStudentFill } from "react-icons/pi";
import { IoLogIn, IoPersonAdd } from "react-icons/io5";



export const DesktopMenu = ({ data }: DataProps) => {
    const { getDaysUntilGraduation } = useTimeTravel();
    return (
        <div className="flex hidden md:flex items-center gap-4">
            <SignedOut>
                <SignInButton mode="modal">
                    <button className="text-primary hover:bg-secondary/20 border-2 border-transparent hover:border-secondary/30 transition-all px-4 py-2 rounded-4xl flex items-center gap-2 font-bold focus-visible-primary">
                        <IoLogIn size={20} />
                        Logga in
                    </button>
                </SignInButton>
                <SignUpButton mode="modal">
                    <button className="bg-primary hover:bg-primary/90 text-p-white px-5 py-2 rounded-4xl glass-effect-input flex items-center gap-2 shadow-md hover:shadow-lg transition-all focus-visible-primary">
                        <IoPersonAdd size={18} />
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