
import { useTimeTravel } from "../hooks/useTimeTravel";
import { useUserData } from "../hooks/useUserData";
import { ProgressBar } from "../components/ProgressBar";
import { SupplierCard } from "../components/SupplierCard";


export const Home = () => {

    const { data, isLoading, error } = useUserData();
    const { getDaysUntilPurchaseHat } = useTimeTravel();

    if (isLoading) return <div>Laddar data...</div>;
    if (error) return <div>Kunde inte ladda data.</div>;
    if (!data) return <div>Ingen data tillgänglig.</div>;

    return (
        <section className="flex flex-col gap-4 mt-4 lg:mt-0">
            <div>
                <div className="flex flex-col md:flex-row pb-4 md:pb-0 justify-between items-center">
                    <div className="flex flex-col gap-2 px-4 mb-2">
                        <h2 className="font-bold text-center md:text-left text-primary">Hej {data.personal.fname} 👋</h2>
                        <p className=" ">Nu kör vi mot studenten!</p>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
                        <SupplierCard title="Crownstudent" img="/assets/crownstudent-logo.jpg" link="https://www.crownstudent.com" />
                        <SupplierCard title="ABC-gruppen" img="/assets/abcgruppen-logo.jpg" link="https://www.abcgruppen.se" />
                        <SupplierCard title="Wigens" img="/assets/wigens-logo.jpg" link="https://www.wigens.se" />
                        <SupplierCard title="C.L Seifert" img="/assets/clseifert-logo.png" link="https://www.clseifert.se" />
                    </div>
                </div>
            </div>
        </section>
    );
};