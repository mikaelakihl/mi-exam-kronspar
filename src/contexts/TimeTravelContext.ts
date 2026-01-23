import { createContext } from 'react';
import type { UserData } from '../mocks/handlers';

interface TimeTravelContextType {
    // Datumet vi låtsas att det är just nu (null = nutid/idag)
    simulatedDate: Date | null;

    getDaysUntilGraduation: (graduationDateString: string) => number;
    getDaysUntilPurchaseHat: (dateForPurchasingHatString: string) => number;
    fastForwardToPurchaseHatDay: (data: UserData) => Promise<UserData | null>;
    fastForwardToGraduationDay: (data: UserData) => Promise<UserData | null>;
    resetToCurrentTime: (data: UserData) => Promise<UserData | null>;
}

// Skapar Context-objektet (börjar som tomt/undefined)
export const TimeTravelContext = createContext<TimeTravelContextType | undefined>(undefined);

// PROVIDER-KOMPONENTEN
//  "håller i" datan och logiken.
// Allt inuti denna komponent (children) får tillgång till verktygen.


// HOOK FÖR ATT ANVÄNDA CONTEXTET
// Gör det enkelt för komponenter att säga "useTimeTravel()"
