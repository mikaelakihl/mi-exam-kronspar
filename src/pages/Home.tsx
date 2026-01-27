
import { FaExternalLinkAlt } from "react-icons/fa";
import { useTimeTravel } from "../hooks/useTimeTravel";
import { useUserData } from "../hooks/useUserData";
import { ProgressBar } from "../components/ProgressBar";


export const Home = () => {

    const { data, isLoading, error } = useUserData();
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
        <section className="flex flex-col gap-4 mt-4 lg:mt-0">
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