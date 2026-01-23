import { useContext } from "react";
import { TimeTravelContext } from "../contexts/TimeTravelContext";

export const useTimeTravel = () => {
    const context = useContext(TimeTravelContext);
    if (!context) throw new Error('useTimeTravel måste användas inom en TimeTravelProvider');
    return context;
};