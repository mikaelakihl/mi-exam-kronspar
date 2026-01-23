export const Home = () => {
    const suppliers = [
        {
            id: 1,
            name: 'Crownstudent',
            image: 'https://www.crownstudent.se/images/logo.png',
            link: 'https://www.crownstudent.se'
        },
        {
            id: 2,
            name: 'ABC-gruppen',
            image: 'https://www.crownstudent.se/images/logo.png',
            link: 'https://www.crownstudent.se'
        },
        {
            id: 3,
            name: 'Wigens',
            image: 'https://www.crownstudent.se/images/logo.png',
            link: 'https://www.crownstudent.se'
        },
        {
            id: 4,
            name: 'C.L Seifert',
            image: 'https://www.crownstudent.se/images/logo.png',
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
                    <div>
                        <p>dagar till mössan</p>
                    </div>
                </div>
                <div>
                    <h3>Ditt sparande</h3>
                    <p>1000 kr/25000 kr</p>
                    <p>ProgressBAAaaaaaaaaaaaaaaar</p>
                    <p>Du ligger helt i fas</p>
                </div>
            </div>
            <div>
                <div>
                    <h3>Hitta din drömmössa</h3>
                    <p>Här hittar du bland de mest populära mössorna. Jämför och hitta din favorit! </p>
                </div>
                <div>
                    <ul className="flex flex-col md:flex-row gap-4">
                        {suppliers.map((supplier) => (
                            <li key={supplier.id}>
                                <a>
                                    <div className="bg-background-muted p-4 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <p>Leverantör</p>
                                            <p>icon</p>
                                        </div>
                                        <h4>{supplier.name}</h4>
                                        <img src={supplier.image} alt={supplier.name} />
                                        <a href={supplier.link}>Besök Hemsida</a>
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