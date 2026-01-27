import { IoMdSettings } from "react-icons/io";
import { useTimeTravel } from "../hooks/useTimeTravel";
import { calculateSumOfSavingsInManualSavingsMode, getNextPaymentDate } from "../utils/payment"
import { NavLink } from "react-router";
import type { UserData } from "../mocks/handlers";

type StatisticCardsProps = {
    data: UserData;
}

export const StatisticCards = ({ data }: StatisticCardsProps) => {

    const { getDaysUntilGraduation, getDaysUntilPurchaseHat } = useTimeTravel();

    return (

        <div className="flex flex-col lg:grid gap-4 lg:grid lg:grid-cols-6">
            <ActiveStatusStatisticCard data={data} />
            <NextPaymentStatisticCard data={data} />
            <StatisticCard icon="📅" title="Studenten är om" value={getDaysUntilGraduation(data.graduation?.graduationDay)} unit="Dagar" />
            <StatisticCard icon="🎓" title="Köp mössan om" value={getDaysUntilPurchaseHat(data.graduation?.dateForPurchaseHat)} unit="Dagar" />
            <YouHaveSavedStatisticCard data={data} />

        </div>


    )
}

export const ActiveStatusStatisticCard = ({ data }: StatisticCardsProps) => {
    const { getDaysUntilPurchaseHat } = useTimeTravel();

    return (
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
                                getDaysUntilPurchaseHat(data.graduation?.dateForPurchaseHat)
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
    )
}

export const NextPaymentStatisticCard = ({ data }: StatisticCardsProps) => {
    return (
        <div className="glass-effect bg-background-muted md:col-span-2 flex flex-col gap-2 justify-between items-center p-8">
            <div className="flex justify-center items-center rounded-full bg-yellow-100 w-17 h-17 backdrop-blur-lg border border-white shadow-lg">
                <p className="text-3xl">💸</p>
            </div>
            <p className="uppercase font-bold text-gray-500 font-bold">
                Nästa inbetalning sker datum
            </p>
            <p className="text-3xl md:text-4xl lg:text-5xl text-tertiary">
                {getNextPaymentDate(data.savings?.lastTransactionDate ?? '').toString()}
            </p>
        </div>
    )

}

export const YouHaveSavedStatisticCard = ({ data }: StatisticCardsProps) => {
    return (
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
    )
}

type StatisticCardProps = {
    icon: string;
    title: string;
    value: number;
    unit: string;
}

export const StatisticCard = ({ icon, title, value, unit }: StatisticCardProps) => {

    return (
        <div className="glass-effect md:col-span-2 flex-col flex gap-2 justify-between items-center p-8">
            <div className="flex justify-center items-center rounded-full bg-yellow-100 w-17 h-17 backdrop-blur-lg border border-white shadow-lg">
                <p className="text-3xl">{icon}</p>
            </div>
            <p className="uppercase font-bold text-gray-500 font-bold">
                {title}
            </p>{' '}
            <div className="flex items-baseline gap-2">
                <p className="text-3xl md:text-4xl lg:text-5xl text-tertiary">
                    {value}{' '}
                </p>
                <p className="text-gray-500">{unit}</p>
            </div>
        </div>
    )
}
