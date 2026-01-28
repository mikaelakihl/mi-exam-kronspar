import { useUserData } from "../hooks/useUserData";
import { StatisticCards } from "../components/StatisticCard";


export const Statistics = () => {

    const { data, isLoading, error } = useUserData();

    if (isLoading) return <div>Laddar statistik...</div>;
    if (error) return <div>Kunde inte ladda statistik.</div>;
    if (!data) return <div>Ingen data tillgänglig.</div>;

    return (
        <section>
            <h2 className="mb-4 text-center">Statistik</h2>
            <StatisticCards data={data} />

        </section>
    );
};