export const Information = () => {
    return (
        <div className="lg:col-span-1 lg:overflow-y-auto">
            <div className=" bg-background-muted md:bg-background/70 h-fit  p-8 flex flex-col gap-4 rounded-3xl glass-effect-input  ">
                {/* <div className="flex flex-row gap-2 justify-between items-center">
                <img src="/assets/pinpin.png" alt="Kronspar" className="w-8 h-8 " />
              
                <img src="/assets/pinpin.png" alt="Kronspar" className="w-8 h-8 rotate-90" />
            </div> */}
                <h3 className="p-4  text-tertiary">Information</h3>
                <div className="p-2 text-tertiary">
                    <p>Här hittar du information om hur ditt sparande fungerar.</p>
                    <p>
                        Klicka på rubrikerna nedan för att läsa mer om betalningar,
                        uttag och hur du hanterar dina uppgifter.
                    </p>
                </div>
                <div>
                    <details>
                        <summary className="bg-primary text-p-white rounded-lg p-3 ">
                            Betalning
                        </summary>
                        <div className="flex flex-col gap-2 bg-background rounded-lg  p-3">
                            <p>
                                När du registrerat dina kortuppgifter kan du välja mellan
                                två sätt att spara.
                            </p>
                            <p>
                                Med automatisk sparning beräknar systemet månadsbeloppet
                                baserat på priset på studentmössan och när du planerar att
                                köpa den.
                            </p>
                            <p>
                                Beloppet dras automatiskt från ditt kort varje månad. Med
                                manuell sparning väljer du själv månadsbeloppet, som också
                                dras automatiskt varje månad.
                            </p>
                            <p>
                                Betalningarna sker automatiskt varje månad baserat på när du
                                senast gjorde en betalning.
                            </p>
                            <p>
                                När du loggar in uppdateras ditt sparande med eventuella
                                månader som har passerat sedan senaste betalningen.
                            </p>
                        </div>
                    </details>
                </div>
                <details>
                    <summary className="bg-primary text-p-white rounded-lg p-3">
                        Uttag
                    </summary>
                    <div className="flex flex-col gap-2 bg-background rounded-lg  p-3">
                        <p>
                            Du kan när som helst ta ut dina sparade pengar. När du gör ett
                            uttag skickas pengarna tillbaka till ditt konto och når dig
                            inom 1–3 arbetsdagar.
                        </p>
                        <p>
                            Efter ett uttag nollställs ditt sparande, men du kan fortsätta
                            spara igen genom att behålla din sparningsplan aktiv.
                        </p>
                    </div>
                </details>
                <details>
                    <summary className="bg-primary text-p-white rounded-lg p-3">
                        Hantera dina uppgifter
                    </summary>
                    <div className="flex flex-col gap-2 bg-background rounded-lg  p-3">
                        <p>
                            Du kan när som helst ändra dina kortuppgifter, sparningsplan
                            eller ta ut pengar via inställningar
                        </p>
                        <p>Alla ändringar sparas direkt när du klickar på "Spara".</p>
                    </div>
                </details>
            </div>
        </div>
    );
};