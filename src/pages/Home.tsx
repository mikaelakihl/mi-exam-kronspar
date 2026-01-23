import { FaExternalLinkAlt } from "react-icons/fa";

export const Home = () => {
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
        <section className="">
            <div>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                        <h2>Hej user</h2>
                        <p>Nu kör vi mot studenten</p>
                    </div>
                    <div className="bg-accent/20 p-2 px-4 rounded-full border border-accent/40">
                        <p className=""><span className="font-bold text-orange-500">antal dagar</span> kvar till mössan</p>
                    </div>
                </div>
                <div className="bg-background-muted/80 p-4 rounded-4xl glass-effect-input flex flex-col gap-2 text-center">
                    <h3 className=" text-xl text-gray-500 uppercase font-bold">Ditt sparande</h3>
                    <p>1000 kr/25000 kr</p>
                    <p>ProgressBAAaaaaaaaaaaaaaaar</p>
                    <p>Du ligger helt i fas</p>
                </div>
            </div>
            <div>
                <div className="flex flex-col gap-2 p-4">
                    <h3 className="text-left">Hitta din drömmössa</h3>
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