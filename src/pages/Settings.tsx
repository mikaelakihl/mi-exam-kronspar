import { useState } from "react";
import { FeedbackMessage } from "../components/FeedbackMessage";
import { PaymentSettings } from "../components/PaymentSettings";
import { SavingplanSettings } from "../components/SavingplanSettings";
import { Information } from "../components/Information";


export const Settings = () => {

    const [feedback, setFeedback] = useState({
        isOpen: false,
        title: '',
        message: '',
    });

    const showFeedback = (title: string, message: string) => {
        setFeedback({ isOpen: true, title, message });
    };

    const closeFeedback = () => {
        setFeedback(prev => ({ ...prev, isOpen: false }));
    };


    // När vi får data, fyll i formuläret



    return (
        <section className="lg:h-screen lg:overflow-hidden flex-col flex">
            <FeedbackMessage
                isOpen={feedback.isOpen}
                onClose={closeFeedback}
                title={feedback.title}
                message={feedback.message}
            />
            <h2 className="mb-4 text-center ">Inställningar</h2>

            <div className="grid gap-4 md:gap-8 lg:grid-cols-3 flex-1 min-h-0">
                <Information />
                <div className="lg:flex- flex flex-col gap-4 md:gap-8 lg:overflow-y-auto lg:col-span-2">
                    <PaymentSettings
                        onSuccess={() => showFeedback('Allt gick bra!', 'Dina kortuppgifter har sparats')}
                        onError={() => showFeedback('Oops!', 'Det gick inte att spara kortuppgifterna')}
                    />
                    <SavingplanSettings
                        onSuccess={() => showFeedback('Allt gick bra!', 'Din sparningsplan har sparats')}
                        onError={() => showFeedback('Oops!', 'Det gick inte att spara sparningsplanen')}

                        onWithdrawSuccess={() => showFeedback('Grattis!', 'Ditt uttag lyckades och pengarna är på väg till dig')}
                        onWithdrawError={() => showFeedback('Tyvärr!', 'Något gick fel, försök igen senare')}
                    />
                </div>
            </div>
        </section>
    );
};

