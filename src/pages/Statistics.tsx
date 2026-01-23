import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { IoMdSettings } from "react-icons/io";
import { NavLink } from "react-router";
import { calculateSumOfSavingsInManualSavingsMode, getNextPaymentDate } from "../utils/payment";
import { useTimeTravel } from "../contexts/TimeTravelContext";

export const Statistics = () => {
    const { user } = useUser();

    const { data, isLoading, error } = useQuery({
        queryKey: ['userData', user?.id],
        queryFn: async () => {
            if (!user?.id) return null;
            const response = await fetch(`/api/data?userId=${user.id}`);
            if (!response.ok) {
                throw new Error('Kunde inte hämta data');
            }
            return response.json();
        },
        enabled: !!user?.id,
    });
    const { getDaysUntilGraduation, getDaysUntilPurchaseHat } = useTimeTravel();

    if (isLoading) return <div>Laddar statistik...</div>;
    if (error) return <div>Kunde inte ladda statistik.</div>;
    if (!data) return <div>Ingen data tillgänglig.</div>;

    return (
        <section className="tertiary">
            <h2 className="mb-4 text-center">Statistik</h2>
            <div className="grid gap-4 md:grid md:grid-cols-6">
                <div className="glass-effect md:col-span-4 flex flex-col  p-8  ">
                    <h3 className="text-left pb-4">Aktiv status</h3>
                    <div>
                        <div className="flex flex-col gap-2">
                            <p>
                                <span className="text-3xl md:text-4xl lg:text-5xl text-primary">
                                    {data.savings?.monthlyAmount} kr
                                </span>{' '}
                                / månad{' '}
                            </p>
                            {data.savings?.savingsMode === 'auto' && (
                                <p>
                                    Du beräknas ha <span className="font-bold">{data.graduation?.priceOnHat} kr</span> lagom till{' '}
                                    {data.graduation?.dateForPurchaseHat}
                                </p>
                            )}
                        </div>
                        <div>
                            {data.savings?.savingsMode === 'manual' && (
                                <p>
                                    Du beräknas ha{' '}
                                    {calculateSumOfSavingsInManualSavingsMode(
                                        // Make sure to convert to numbers before passing to the function
                                        Number(data.savings?.monthlyAmount),
                                        data.graduation?.dateForPurchaseHat,
                                        user?.id
                                    )}{' '}
                                    kr lagom till {data.graduation?.dateForPurchaseHat}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="border-b-2 border-p-disabled my-4"></div>
                    <div className="flex items-center gap-1 text-tertiary">
                        <IoMdSettings />{' '}
                        <NavLink to="/settings">
                            Klicka här om du vill ändra din spar-plan
                        </NavLink>
                    </div>
                </div>
                <div className="glass-effect bg-background-muted md:col-span-2 flex flex-col gap-2 justify-between items-center p-8">
                    <div className="flex justify-center items-center rounded-full bg-yellow-100 w-17 h-17 backdrop-blur-lg border border-white shadow-lg">
                        <p className="text-3xl">💸</p>
                    </div>
                    <p className="uppercase font-bold text-gray-500 font-bold">
                        Nästa inbetalning sker datum
                    </p>
                    <p className="text-3xl md:text-4xl lg:text-5xl text-tertiary">
                        {getNextPaymentDate(data.savings?.lastTransactionDate).toString()}
                    </p>
                </div>
                <div className="glass-effect md:col-span-2 flex-col flex gap-2 justify-between items-center p-8">
                    <div className="flex justify-center items-center rounded-full bg-yellow-100 w-17 h-17 backdrop-blur-lg border border-white shadow-lg">
                        <p className="text-3xl">📅</p>
                    </div>
                    <p className="uppercase font-bold text-gray-500 font-bold">
                        Studenten är om
                    </p>{' '}
                    <div className="flex items-baseline gap-2">
                        <p className="text-3xl md:text-4xl lg:text-5xl text-tertiary">
                            {getDaysUntilGraduation(
                                data.graduation?.graduationDay
                            )}{' '}
                        </p>
                        <p className="text-gray-500">Dagar</p>
                    </div>
                </div>
                <div className="glass-effect md:col-span-2 flex flex-col  gap-2 justify-between items-center p-8">
                    <div className="flex justify-center items-center rounded-full bg-yellow-100 w-17 h-17 backdrop-blur-lg border border-white shadow-lg">
                        <p className="text-3xl">🎓</p>
                    </div>
                    <p className="uppercase font-bold text-gray-500">Köp mössan om </p>
                    <div className="flex items-baseline gap-2">
                        <p className="text-3xl md:text-4xl lg:text-5xl text-tertiary">
                            {getDaysUntilPurchaseHat(
                                data.graduation?.dateForPurchaseHat
                            )}
                        </p>
                        <p className="text-gray-500">Dagar</p>
                    </div>
                </div>
                <div className=" glass-effect md:col-span-2  flex justify-center flex-col  items-center p-8">
                    <p className="uppercase font-bold text-gray-500">Du har sparat</p>
                    <div className='relative w-fit'>
                        <img
                            src="/assets/kronspar-pig.png"
                            alt="Kronspar"
                            className="w-35 h-35  relative"
                        />
                        <div className="absolute inset-0 text-center flex flex-col font-bold gap-0 pt-15 pr-5 ">
                            <p className="text-3xl">
                                {data?.savings?.savedAmount === 0
                                    ? '0'
                                    : data?.savings?.savedAmount}
                            </p>
                            {/* <p className=" font-bold text-background-muted text-stroke text-3xl">
                  Kronspar
                </p> */}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};