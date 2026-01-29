import { FaArrowRight } from "react-icons/fa";
import { NavLink } from "react-router";


export const NoDataHome = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-background-muted/80 rounded-4xl glass-effect-input mt-8">
            <h2 className=" font-bold mb-4">Välkommen till Kronspar! 👋</h2>
            <p className="mb-6">För att se din prognos behöver du först lägga in dina betalningsuppgifter och din sparplan.</p>
            <NavLink
                to="/settings"
                className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors"
            >
                Kom igång med ditt sparande
                <FaArrowRight />
            </NavLink>
        </div>
    );
};

export default NoDataHome;