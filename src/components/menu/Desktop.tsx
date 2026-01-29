import { SignedIn, SignUpButton, UserButton } from "@clerk/clerk-react";
import { SignInButton } from "@clerk/clerk-react";

import { SignedOut } from "@clerk/clerk-react";
import { useTimeTravel } from "../../hooks/useTimeTravel";
import type { DataProps } from "./Hamburger";
import { NavLink } from "react-router";
import { PiStudentFill } from "react-icons/pi";
import { IoLogIn, IoPersonAdd, IoHome, IoSettings, IoStatsChart } from "react-icons/io5";
import { Button } from "../Button";



export const DesktopMenu = ({ data }: DataProps) => {
    const { getDaysUntilGraduation } = useTimeTravel();
    return (
        <div className="hidden md:flex items-center gap-6">
            <SignedOut>
                <SignInButton mode="modal">
                    <Button variant="ghost">
                        <IoLogIn size={20} />
                        Logga in
                    </Button>
                </SignInButton>
                <SignUpButton mode="modal" forceRedirectUrl="/settings">
                    <Button variant="primary">
                        <IoPersonAdd size={18} />
                        Registrera dig
                    </Button>
                </SignUpButton>
            </SignedOut>
            <SignedIn>
                <nav className="flex items-center gap-1 text-p-black bg-secondary/20 glass-effect-input rounded-4xl p-1">
                    <NavLink
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-1.5 rounded-3xl transition-all ${isActive
                                ? 'bg-primary text-p-white shadow-sm'
                                : 'text-p-black hover:text-primary hover:bg-white/40'
                            }`
                        }
                        to="/"
                    >
                        <IoHome size={16} />
                        Hem
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-1.5 rounded-3xl transition-all ${isActive
                                ? 'bg-primary text-p-white shadow-sm'
                                : 'text-p-black hover:text-primary hover:bg-white/40'
                            }`
                        }
                        to="/statistics"
                    >
                        <IoStatsChart size={16} />
                        Statistik
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-1.5 rounded-3xl transition-all ${isActive
                                ? 'bg-primary text-p-white shadow-sm'
                                : 'text-p-black hover:text-primary hover:bg-white/40'
                            }`
                        }
                        to="/settings"
                    >
                        <IoSettings size={16} />
                        Inställningar
                    </NavLink>
                </nav>

                <div className="flex items-center gap-4 bg-secondary/20 glass-effect-input rounded-4xl px-4 py-2">
                    {data?.graduation && (
                        <div className="flex items-center gap-2 text-primary font-bold" title="Dagar till studenten">
                            <PiStudentFill size={20} />
                            <span>
                                {getDaysUntilGraduation(data.graduation.graduationDay)}
                            </span>
                        </div>
                    )}

                    <div className="flex items-center">
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-8 h-8"
                                }
                            }}
                        />
                    </div>
                </div>
            </SignedIn>
        </div>
    )
}