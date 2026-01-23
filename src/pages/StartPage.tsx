import { SignUpButton } from "@clerk/clerk-react";
import { CommentSection } from "../components/CommentSection";


export const StartPage = () => {
    return (
        <section className="flex flex-col gap-4">
            <div className="bg-primary  flex flex-col gap-4 md:grid md:grid-cols-2 items-center py-8 px-4 md:p-8 rounded-4xl ">


                <div className=" gap-4 col-span-2 md:col-span-1 order-1 flex flex-col gap-4">
                    <h2 className="md:text-4xl lg:text-5xl text-p-white font-bold">Studenten ska vara <span className="text-accent italic">kul</span>, inte dyr.</h2>
                    <p className="text-p-white">
                        Vi hjälper dig fixa studentmössan utan stress. Spara lite varje månad i din egen takt. Inga krav, ingen press - bara en grym student!
                    </p>
                </div>
                <div className="flex flex-col gap-4 p-4  cols-span-2 md:col-span-1 order-4 md:order-3 ">
                    <SignUpButton mode="modal">
                        <button className="bg-accent text-p-white px-4 py-2 rounded-4xl mb-2 ">
                            Börja spara nu
                        </button>
                    </SignUpButton>

                </div>

                <div className="bg-p-white/10 backdrop-blur-lg  cols-span-2 md:col-span-1 order-3 md:order-2 md:row-span-2 p-4 md:p-8 w-full rounded-2xl shadow-lg text-p-white">
                    <h2 className="mb-4">Så funkar det</h2>
                    <ol className="flex flex-col gap-2 list-decimal list-inside">
                        <li>Registrera dig</li>
                        <li>Välj pris på din mössa</li>
                        <li>Spara automatiskt eller manuellt</li>
                    </ol>
                </div>
            </div>



            <CommentSection />
        </section>
    );
};