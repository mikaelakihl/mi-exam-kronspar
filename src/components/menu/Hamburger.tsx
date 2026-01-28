import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react"
import { AiOutlineClose } from "react-icons/ai"
import { GiHamburgerMenu } from "react-icons/gi"
import { PiStudentFill } from "react-icons/pi"

import { NavLink } from "react-router"
import type { UserData } from "../../mocks/handlers"
import { useTimeTravel } from "../../hooks/useTimeTravel"
import { IoLogIn, IoPersonAdd } from "react-icons/io5"

export type DataProps = {
    data: UserData
}

export type HamburgerIconProps = DataProps & {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

export const HamburgerIcon = ({ data, isOpen, setIsOpen }: HamburgerIconProps) => {
    const { getDaysUntilGraduation } = useTimeTravel();
    return (
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
            <button onClick={() => setIsOpen(!isOpen)} className="p-2" aria-label="Meny">
                {isOpen ? (
                    <AiOutlineClose size={30} className="text-accent" />
                ) : (
                    <GiHamburgerMenu size={30} className="text-accent" />
                )}
            </button>
        </div>
    )
}

export const HamburgerMenu = () => {
    return (
        <nav className=" bg-secondary/20 glass-effect-input text-p-black text-center p-4 md:hidden">
            <SignedOut>
                <SignInButton mode="modal">
                    <button className="text-primary w-full border-2 border-primary/20 hover:bg-secondary/10 hover:border-primary/40 transition-all px-4 py-3 rounded-4xl flex items-center justify-center gap-2 font-bold mb-3 focus-visible-primary">
                        <IoLogIn size={22} />
                        Logga in
                    </button>
                </SignInButton>
                <SignUpButton mode="modal">
                    <button className="bg-primary w-full hover:bg-primary/90 text-p-white px-4 py-3 rounded-4xl glass-effect-input flex items-center justify-center gap-2 shadow-md mb-2 focus-visible-primary">
                        <IoPersonAdd size={20} />
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
    )
}

