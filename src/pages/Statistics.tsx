import { useUserData } from "../hooks/useUserData";
import { StatisticCards } from "../components/StatisticCard";
import NoDataHome from "../components/NoDataHome";


export const Statistics = () => {

    const { data, isLoading, error } = useUserData();

    if (isLoading) return <div>Laddar statistik...</div>;
    if (error) return <div>Kunde inte ladda statistik.</div>;


    return (
        <section>
            {(!data) ? <NoDataHome /> : (
                <>
                    <h2 className="mb-4 text-center">Statistik</h2>
                    <StatisticCards data={data} />
                </>
            )}
        </section>
    );
};