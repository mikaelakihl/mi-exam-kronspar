import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useTimeTravel } from "../hooks/useTimeTravel";

export const ProgressBar = ({ saved, goal }: { saved: number, goal: number }) => {

    const percentage = goal > 0 ? Math.min(100, Math.max(0, (saved / goal) * 100)) : 0;

    const progressBarStatus = () => {
        if (percentage >= 100) return "Grattis du är i mål, dags att beställa! 🎓";
        if (percentage >= 75) return "Wow snart framme! Kämpa på! 🚀";
        if (percentage >= 50) return "Hälften avklarat, fortsätt så! 🌟";
        if (percentage >= 25) return "En bra bit på vägen! 💪";
        if (percentage > 0) return "Du har på börjat din resa! 🌱";

        return "Dags att börja spara! 💰"
    }

    return (
        <div className="p-8 flex flex-col gap-2">
            <div className="flex items-center gap-2 justify-center">
                <div>
                    <span className="text-3xl md:text-4xl lg:text-5xl text-primary font-bold">{saved} kr</span>
                    <span className="text-gray-500">/ {goal} kr</span>
                </div>
            </div>
            <div className="h-5 border border-gray-200 rounded-full ">
                <div className="h-full bg-accent rounded-full flex items-center justify-end p-2" style={{ width: `${percentage}%` }}
                    role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={goal}>
                    {percentage === 0 ? null : <p className="text-white text-sm">{percentage.toString()}%</p>}
                </div>
            </div>
            <p className="italic text-gray-500">{progressBarStatus()}</p>
        </div>
    )
}

export const Home = () => {

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
    })

    const { getDaysUntilPurchaseHat } = useTimeTravel();

    if (isLoading) return <div>Laddar data...</div>;
    if (error) return <div>Kunde inte ladda data.</div>;
    if (!data) return <div>Ingen data tillgänglig.</div>;

    const suppliers = [
        {
            id: 1,
            name: 'Crownstudent',
            image: '/assets/crownstudent-logo.jpg',
            link: 'https://www.crownstudent.se'
        },
        {
            id: 2,
            name: 'ABC-gruppen',
            image: '/assets/abcgruppen-logo.jpg',
            link: 'https://www.crownstudent.se'
        },
        {
            id: 3,
            name: 'Wigens',
            image: '/assets/wigens-logo.jpg',
            link: 'https://www.crownstudent.se'
        },
        {
            id: 4,
            name: 'C.L Seifert',
            image: '/assets/clseifert-logo.png',
            link: 'https://www.crownstudent.se'
        },
    ]
    return (
        <section className="flex flex-col gap-4">
            <div>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-2 px-4 mb-2">
                        <h2 className="font-bold text-primary">Hej {data.personal.fname}! 👋</h2>
                        <p>Nu kör vi mot studenten</p>
                    </div>
                    <div className="bg-accent/20 p-2 px-4 rounded-full border border-accent/40">
                        <p className=""><span className="font-bold text-orange-500">{getDaysUntilPurchaseHat(data.graduation.dateForPurchaseHat)} dagar</span> kvar till mössan</p>
                    </div>
                </div>
                <div className="bg-background-muted/80 p-4 rounded-4xl glass-effect-input flex flex-col gap-2 text-center">
                    <h3 className=" text-xl text-gray-500 uppercase font-bold">Ditt sparande</h3>
                    <ProgressBar saved={data.savings.savedAmount} goal={data.graduation.priceOnHat} />
                </div>
            </div>
            <div>
                <div className="flex flex-col gap-2 px-4 mb-2">
                    <h3 className="text-left ">Hitta din drömmössa</h3>
                    <p>Här hittar du bland de mest populära mössorna. Jämför och hitta din favorit! </p>
                </div>
                <div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
                        {suppliers.map((supplier) => (
                            <li className="md:flex-1" key={supplier.id}>
                                <a href={supplier.link} >
                                    <div className="bg-background-muted/80 p-4 rounded-4xl flex flex-col gap-2 p-8 glass-effect-input">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2 bg-yellow-100 p-2 rounded-full border border-p-white ">
                                                <p className="uppercase font-bold text-yellow-950 text-sm">Leverantör</p>
                                            </div>
                                            <FaExternalLinkAlt className="text-gray-400" />
                                        </div>

                                        <div className="rounded-full overflow-hidden w-24 h-24  border-2 border-secondary/20">
                                            <img src={supplier.image} className="w-24 h-24 object-cover" />
                                        </div>
                                        <h4 className="text-primary">{supplier.name}</h4>
                                        <p className="text-sm text-gray-500 uppercase font-bold">Besök Hemsida </p>
                                    </div>
                                </a>

                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};