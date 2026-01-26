import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

export const useUserData = () => {
    const { user } = useUser();

    return useQuery({
        queryKey: ['userData', user?.id],
        queryFn: async () => {
            if (!user?.id) return null;
        
            const response = await fetch(`/api/data?userId=${user.id}`);
            if (!response.ok) {
                throw new Error('Kunde inte hämta data');
            }
            return response.json();
        },
        enabled: !!user?.id, // Kör bara om vi har en inloggad användare
    });
};