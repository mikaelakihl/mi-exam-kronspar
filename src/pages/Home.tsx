import { SignUpButton } from "@clerk/clerk-react";
import { CommentSection } from "../components/CommentSection";


export const Home = () => {
    return (
        <section className="flex flex-col gap-4">
            <div className="bg-primary">
                <div className="">
                    <h2>Välkommen till Kronspar</h2>
                    <p>
                        Här hjälper vi dig att fixa studentmössan utan att det blir dyrt
                        eller stressigt. Studenten ska vara rolig — inte en tävling om vem
                        som har råd med vad. Genom att spara lite varje månad kan du lugnt
                        bygga upp pengarna du behöver, helt i din egen takt. Inga krav.
                        Ingen press. Bara ett smidigt sätt att se till att du får den
                        studentmössa du vill ha, när det väl är dags (helt gratis) Starta
                        ditt sparande idag och gör studenten lite enklare för dig själv.
                    </p>
                </div>
                <div className="flex flex-col gap-4 p-4">
                    <SignUpButton mode="modal">
                        <button className="bg-accent text-p-white px-4 py-2 rounded mb-2">
                            Registrera
                        </button>
                    </SignUpButton>
                    <div className="bg-background-muted">
                        <p>
                            När du har registrerat dig kommer du direkt vidare till nästa
                            steg. Där fyller du enkelt i dina kortuppgifter, din examensdag
                            och vilken dag du vill att köpet av mössan ska göras.
                        </p>
                    </div>
                </div>
            </div>

            <CommentSection />
        </section>
    );
};