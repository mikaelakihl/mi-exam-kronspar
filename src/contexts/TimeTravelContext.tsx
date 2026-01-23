import { createContext, useContext, useState, useEffect, type ReactNode, } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useUser } from '@clerk/clerk-react';
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
const TimeTravelContext = createContext<TimeTravelContextType | undefined>(undefined);

// PROVIDER-KOMPONENTEN
//  "håller i" datan och logiken.
// Allt inuti denna komponent (children) får tillgång till verktygen.
export const TimeTravelProvider = ({ children }: { children: ReactNode }) => {
    // STATE: Håller koll på det simulerade datumet i minnet för snabb åtkomst
    const [simulatedDate, setSimulatedDate] = useState<Date | null>(null);

    // Hämta inloggad användare och React Query-klienten
    const { user } = useUser();
    const queryClient = useQueryClient();

    // EFFEKT: KÖRS VID START
    // När appen laddas, kolla om vi har ett sparat "låtsas-datum" i localStorage.
    // Om ja, uppdatera statet så vi fortsätter där vi var.
    useEffect(() => {
        if (user?.id) {
            const storedDate = localStorage.getItem(`data_${user.id}_simulatedDate`);
            if (storedDate) {
                setSimulatedDate(new Date(storedDate));
            }
        }
    }, [user?.id]);


    const getDaysUntilGraduation = (graduationDateString: string) => {
        // Om simulatedDate finns använder vi det, annars tar vi riktiga datumet.
        const today = simulatedDate || new Date();

        const graduationDay = new Date(graduationDateString);
        const timeDifference = graduationDay.getTime() - today.getTime();

        if (timeDifference < 0) return 0;

        const oneDayToMilliseconds = 1000 * 60 * 60 * 24;
        return Math.ceil(timeDifference / oneDayToMilliseconds);
    };

    const getDaysUntilPurchaseHat = (dateForPurchasingHatString: string) => {
        const today = simulatedDate || new Date(); // Samma logik här

        const purchaseHatDate = new Date(dateForPurchasingHatString);
        const timeDifference = purchaseHatDate.getTime() - today.getTime();

        if (timeDifference < 0) return 0;

        const oneDayToMilliseconds = 1000 * 60 * 60 * 24;
        return Math.ceil(timeDifference / oneDayToMilliseconds);
    };


    const fastForwardToPurchaseHatDay = async (data: UserData) => {
        // 1. Säkerhetskoll: Har vi all info vi behöver?
        if (!user?.id || !data?.graduation?.dateForPurchaseHat) {
            alert('Saknar nödvändig information');
            return null;
        }

        // 2. Kollar om datumet redan passerat
        const daysLeft = getDaysUntilPurchaseHat(data.graduation.dateForPurchaseHat);
        if (daysLeft <= 0) {
            alert('Datumet har redan passerat');
            return null;
        }

        // 3. SKAPA BACKUP (Om det inte redan finns)
        // Vi sparar undan hur mycket pengar användaren hade PÅ RIKTIGT innan vi fuskar.
        const timeBackup = {
            savedAmount: data.savings?.savedAmount || 0,
            lastTransactionDate: data.savings?.lastTransactionDate || null,
        };

        // Om backup inte finns sen tidigare, skapa en ny.
        if (!localStorage.getItem(`data_${user.id}_timeBackup`)) {
            localStorage.setItem(`data_${user.id}_timeBackup`, JSON.stringify(timeBackup));
        }

        // 4. RÄKNA UT PENGAR
        // Hur många månader hoppar vi fram? -> Hur mycket ska sparas?
        const monthsLeft = Math.max(0, Math.ceil(daysLeft / 30));
        const monthlyAmount = Number(data.savings?.monthlyAmount) || 0;
        const amountToAdd = monthsLeft * monthlyAmount;

        // 5. UPPDATERA DATA
        const purchaseDate = new Date(data.graduation.dateForPurchaseHat);

        // Vi gör en kopia av datan för att inte ändra direkt i originalet
        const newData = JSON.parse(JSON.stringify(data));

        // Lägg till pengarna och sätt nytt transaktionsdatum
        newData.savings.savedAmount = (newData.savings.savedAmount || 0) + amountToAdd;
        newData.savings.lastTransactionDate = purchaseDate.toISOString().split('T')[0];

        // 6. SPARA ALLT TILL DISKEN (localStorage)
        // Spara det simulerade datumet
        localStorage.setItem(`data_${user.id}_simulatedDate`, purchaseDate.toISOString().split('T')[0]);
        // Spara den nya användardatan (med mer pengar)
        localStorage.setItem(`data_${user.id}`, JSON.stringify(newData));

        // 7. UPPDATERA APPEN
        // Säg åt React att datumet har ändrats (uppdaterar UI direkt)
        setSimulatedDate(purchaseDate);
        // Säg åt React Query att datan på "servern" har ändrats (hämtar ny data)
        await queryClient.invalidateQueries({ queryKey: ['userData', user.id] });

        return newData;
    };

    const fastForwardToGraduationDay = async (data: UserData) => {
        // Samma logik som ovan, men för studentdagen
        if (!user?.id || !data?.graduation?.graduationDay) {
            alert('Saknar nödvändig information');
            return null;
        }

        const daysLeft = getDaysUntilGraduation(data.graduation.graduationDay);
        if (daysLeft <= 0) {
            alert('Datumet har redan passerat');
            return null;
        }

        const timeBackup = {
            savedAmount: data.savings?.savedAmount || 0,
            lastTransactionDate: data.savings?.lastTransactionDate || null,
        };

        if (!localStorage.getItem(`data_${user.id}_timeBackup`)) {
            localStorage.setItem(`data_${user.id}_timeBackup`, JSON.stringify(timeBackup));
        }

        const monthsLeft = Math.max(0, Math.ceil(daysLeft / 30));
        const monthlyAmount = Number(data.savings?.monthlyAmount) || 0;
        const amountToAdd = monthsLeft * monthlyAmount;

        const graduationDate = new Date(data.graduation.graduationDay);
        const newData = JSON.parse(JSON.stringify(data));

        newData.savings.savedAmount = (newData.savings.savedAmount || 0) + amountToAdd;
        newData.savings.lastTransactionDate = graduationDate.toISOString().split('T')[0];

        localStorage.setItem(`data_${user.id}_simulatedDate`, graduationDate.toISOString().split('T')[0]);
        localStorage.setItem(`data_${user.id}`, JSON.stringify(newData));

        setSimulatedDate(graduationDate);
        await queryClient.invalidateQueries({ queryKey: ['userData', user.id] });

        return newData;
    };

    const resetToCurrentTime = async (data: UserData) => {
        if (!user?.id) {
            alert('Saknar användar-ID');
            return null;
        }

        // 1. Hämta backupen vi sparade tidigare
        const timeBackupString = localStorage.getItem(`data_${user.id}_timeBackup`);
        if (!timeBackupString) {
            alert('Ingen backup hittades. Kan inte återställa.');
            return null;
        }

        const timeBackup = JSON.parse(timeBackupString);
        const currentData = JSON.parse(JSON.stringify(data));

        // 2. Återställ pengarna och datumet till hur det var innan tidsresan
        currentData.savings.savedAmount = timeBackup.savedAmount;
        currentData.savings.lastTransactionDate = timeBackup.lastTransactionDate;

        // 3. Spara den återställda datan
        localStorage.setItem(`data_${user.id}`, JSON.stringify(currentData));

        // 4. Städa upp (ta bort backup och simulerat datum)
        localStorage.removeItem(`data_${user.id}_timeBackup`);
        localStorage.removeItem(`data_${user.id}_simulatedDate`);

        // 5. Nollställ statet (null betyder "nutid")
        setSimulatedDate(null);
        await queryClient.invalidateQueries({ queryKey: ['userData', user.id] });

        return currentData;
    };

    // EXPORTERA UT VERKTYGEN
    return (
        <TimeTravelContext.Provider value={{
            simulatedDate,
            getDaysUntilGraduation,
            getDaysUntilPurchaseHat,
            fastForwardToPurchaseHatDay,
            fastForwardToGraduationDay,
            resetToCurrentTime
        }}>
            {children}
        </TimeTravelContext.Provider>
    );
};

// HOOK FÖR ATT ANVÄNDA CONTEXTET
// Gör det enkelt för komponenter att säga "useTimeTravel()"
export const useTimeTravel = () => {
    const context = useContext(TimeTravelContext);
    if (!context) throw new Error('useTimeTravel måste användas inom en TimeTravelProvider');
    return context;
};