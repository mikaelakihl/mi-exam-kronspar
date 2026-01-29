import { useQueryClient } from "@tanstack/react-query";
import { useUserData } from "../hooks/useUserData";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { IoIosSave, IoMdSettings } from "react-icons/io";
import { handleCardNumberChange, handleMonthChange, handleNumericChange } from "../utils/formRegex";
import { Button } from "./Button";

type PaymentSettingsProps = {
    onSuccess: () => void;
    onError: () => void;
};

export const PaymentSettings = ({ onSuccess, onError }: PaymentSettingsProps) => {

    const [nameOnCard, setNameOnCard] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardMonth, setCardMonth] = useState('');
    const [cardYear, setCardYear] = useState('');
    const [cvv, setCvv] = useState('');

    const [isCardDetailsEditing, setIsCardDetailsEditing] = useState(false);

    const queryClient = useQueryClient();
    const { user } = useUser();

    const {
        data: userData,
        isLoading,
        error,
    } = useUserData()


    // När vi får data, fyll i formuläret

    useEffect(() => {
        if (userData?.payment?.nameOnCard) {
            setNameOnCard(userData.payment.nameOnCard);
        }
        if (userData?.payment?.cardNumber) {
            setCardNumber(userData.payment.cardNumber);
        }
        if (userData?.payment?.cardCVV) {
            setCvv(userData.payment.cardCVV);
        }
        if (userData?.payment?.cardMonth) {
            setCardMonth(userData.payment.cardMonth);
        }
        if (userData?.payment?.cardYear) {
            setCardYear(userData.payment.cardYear);
        }
    }, [userData]);





    if (isLoading) return <div>Laddar inställningar...</div>;
    if (error) return <div>Kunde inte ladda inställningar.</div>;
    // Spara data
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user?.id) return;

        const currentData = userData || {
            userId: user.id,
            personal: { fname: '', lname: '', email: '' },
            payment: {},
            graduation: {},
            savings: { savedAmount: 0, savingsMode: 'manual', monthlyAmount: 0 }
        };

        const updatedData = {
            ...currentData,
            payment: {
                ...(currentData.payment || {}),
                nameOnCard: nameOnCard,
                cardNumber: cardNumber,
                cardCVV: cvv,
                cardMonth: cardMonth,
                cardYear: cardYear,
            },

        };

        try {
            const response = await fetch(`/api/data?userId=${user.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user.id, data: updatedData }), // Ändra för att testa felkod 404;
            });

            if (!response.ok) {
                throw new Error('Kunde inte spara data');
            }

            const data = await response.json();

            console.log('Sparad:', data);
            setIsCardDetailsEditing(false);
            setTimeout(() => {
                onSuccess();
            }, 100);

            queryClient.invalidateQueries({
                queryKey: ['userData', user?.id],
            });
        } catch (error) {
            console.error('Error saving data:', error);
            onError();
        }
    };

    // Spara data


    return (




        <div className="bg-background-muted glass-effect-input flex flex-col  rounded-3xl p-4 py-8 lg:p-8 ">
            <div className="flex flex-row justify-between items-center pb-4 ">
                <h3>Betalningsuppgifter</h3>
                <button
                    className="flex items-center gap-1 text-p-black"
                    onClick={() => setIsCardDetailsEditing(!isCardDetailsEditing)}
                >
                    <IoMdSettings />
                    {isCardDetailsEditing ? 'Avbryt' : 'Ändra'}
                </button>
            </div>
            <div className="border-b-2 border-background "></div>
            <form
                onSubmit={handleSave}
                className="flex flex-col gap-2 pt-4 uppercase"
            >
                <label className="flex flex-col gap-2">
                    Namn på kortet
                    <input
                        value={nameOnCard}
                        onChange={(e) => setNameOnCard(e.target.value)}
                        disabled={!isCardDetailsEditing}
                        className="  disabled:text-p-disabled disabled:cursor-not-allowed  border-2 border-secondary/30 rounded-xl disabled:border-0"
                        placeholder="Förnamn Efternamn"
                    />
                </label>
                <label className="flex flex-col gap-2">
                    Kortnummer
                    <input
                        value={cardNumber}
                        onChange={(e) => handleCardNumberChange(e, setCardNumber)}
                        className="disabled:text-p-disabled disabled:cursor-not-allowed  border-2 border-secondary/30 rounded-xl disabled:border-0"
                        disabled={!isCardDetailsEditing}
                        type="text"
                        maxLength={19}
                        placeholder="XXXX XXXX XXXX XXXX"
                        inputMode="numeric"

                    />
                </label>

                <div className="flex flex-row gap-2">
                    <div>
                        <p className="text-base  lg:text-lg mb-2">
                            Gilftighetstid (MM/YY)
                        </p>
                        <div className="flex gap-2">
                            <input
                                aria-label="Månad kortet går ut"
                                type="number"
                                className=" w-full min-w-0 flex-1  disabled:text-p-disabled disabled:cursor-not-allowed  border-2 border-secondary/30 rounded-xl disabled:border-0"
                                value={cardMonth}
                                onChange={(e) => handleMonthChange(e, setCardMonth)}
                                disabled={!isCardDetailsEditing}
                                placeholder="MM"
                                inputMode="numeric"
                            />
                            <span>/</span>
                            <input
                                aria-label="År kortet går ut"
                                type="number"
                                className=" w-full min-w-0 flex-1  disabled:text-p-disabled disabled:cursor-not-allowed  border-2 border-secondary/30 rounded-xl disabled:border-0 "
                                value={cardYear}
                                onChange={(e) => handleNumericChange(e, setCardYear, 2)}
                                disabled={!isCardDetailsEditing}
                                placeholder="YY"
                                inputMode="numeric"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="flex flex-col gap-2">
                            CVV
                            <input
                                value={cvv}
                                onChange={(e) => handleNumericChange(e, setCvv, 3)}
                                type="number"
                                className="disabled:text-p-disabled disabled:cursor-not-allowed text-base  border-2 border-secondary/30 rounded-xl disabled:border-0"
                                placeholder="CVV"
                                disabled={!isCardDetailsEditing}
                                inputMode="numeric"
                            />
                        </label>
                    </div>
                </div>

                {isCardDetailsEditing && (
                    <Button
                        variant="primary"
                        className="w-1/2 flex self-end col-start-2 justify-center items-center gap-2 mt-4"
                    >
                        <IoIosSave />
                        Spara
                    </Button>
                )}
            </form>
        </div>
    )
}