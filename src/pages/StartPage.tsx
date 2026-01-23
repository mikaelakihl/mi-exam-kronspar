import { SignUpButton } from "@clerk/clerk-react";
import { CommentSection } from "../components/CommentSection";


export const StartPage = () => {
    return (
        <section className="flex flex-col gap-4">
            <div className="bg-primary  flex flex-col gap-4 md:gap-8 md:grid md:grid-cols-2 items-center py-8 px-4 md:p-8 rounded-4xl ">


                <div className=" gap-4 col-span-2 md:col-span-1 order-1 flex flex-col gap-4">
                    <h2 className="md:text-4xl lg:text-5xl text-p-white font-bold">Studenten ska vara <span className="text-accent italic">kul</span>, inte dyr.</h2>
                    <p className="text-p-white">
                        Vi hjälper dig fixa studentmössan utan stress. Spara lite varje månad i din egen takt. Inga krav, ingen press - bara en grym student!
                    </p>
                </div>
                <div className="flex flex-col gap-4 p-4  cols-span-2 md:col-span-1 order-4 md:order-3 ">
                    <SignUpButton mode="modal">
                        <button className="bg-accent text-p-white px-4 py-2 rounded-4xl mb-2 md:w-1/2 ">
                            Börja spara nu
                        </button>
                    </SignUpButton>

                </div>

                <div className="bg-p-white/10 backdrop-blur-lg md:mx-auto cols-span-2 md:col-span-1 order-3 md:order-2 md:row-span-2 p-4 md:p-8 w-full md:w-2/3 rounded-2xl shadow-lg text-p-white md:rotate-5">
                    <h2 className="mb-4">Så funkar det</h2>
                    <ol className="flex flex-col gap-2">
                        <li className="flex items-center gap-2"><div className="flex items-center justify-center bg-accent text-p-white rounded-full w-8 h-8"><p>
                            1
                        </p>
                        </div><p>Registrera dig</p></li>

                        <li className="flex items-center gap-2"><div className="flex items-center justify-center bg-secondary text-p-white rounded-full w-8 h-8"><p>2</p></div>Fyll i din spar-plan</li>
                        <li className="flex items-center gap-2"><div className="flex items-center justify-center bg-primary text-p-white rounded-full w-8 h-8"><p>3</p></div>Spara automatiskt</li>
                    </ol>
                </div>
            </div>



            <CommentSection />
        </section>
    );
};