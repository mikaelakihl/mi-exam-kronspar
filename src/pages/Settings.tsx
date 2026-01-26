import { useUser } from "@clerk/clerk-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IoIosSave, IoMdSettings } from "react-icons/io";
import { withdrawSavings } from "../utils/payment";
import { PiHandWithdrawFill } from "react-icons/pi";
import { useTimeTravel } from "../hooks/useTimeTravel";
import { handleCardNumberChange, handleMonthChange, handleNumericChange } from "../utils/formRegex";

export const Settings = () => {
    const { getDaysUntilPurchaseHat } = useTimeTravel();
    const [nameOnCard, setNameOnCard] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardMonth, setCardMonth] = useState('');
    const [cardYear, setCardYear] = useState('');
    const [cvv, setCvv] = useState('');

    const [graduationDay, setGraduationDay] = useState('');
    const [dateForPurchaseHat, setDateForPurchaseHat] = useState('');
    const [priceOnHat, setPriceOnHat] = useState('');
    const [savingsMode, setSavingsMode] = useState('manual');
    const [monthlyAmount, setMonthlyAmount] = useState('');

    const [isCardDetailsEditing, setIsCardDetailsEditing] = useState(false);
    const [isSavingPlanDetailsEditing, setIsSavingPlanDetailsEditing] =
        useState(false);

    const [
        showSuccessMessageForSavedCardDetails,
        setShowSuccessMessageForSavedCardDetails,
    ] = useState(false);

    const [
        showErrorMessageForSavedCardDetails,
        setShowErrorMessageForSavedCardDetails,
    ] = useState(false);

    const [
        showSuccessMessageForSavedSavingPlan,
        setShowSuccessMessageForSavedSavingPlan,
    ] = useState(false);

    const [
        showErrorMessageForSavedSavingPlan,
        setShowErrorMessageForSavedSavingPlan,
    ] = useState(false);

    const [showWithdrawalSuccessMessage, setShowWithdrawalSuccessMessage] =
        useState(false);

    const [showWithdrawalErrorMessage, setShowWithdrawalErrorMessage] =
        useState(false);

    const { user } = useUser();
    const queryClient = useQueryClient();

    const {
        data: userData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['userData', user?.id],
        queryFn: async () => {
            if (!user?.id) return null;
            const response = await fetch(`/api/data?userId=${user.id}`);
            if (!response.ok) {
                throw new Error('Kunde inte hämta data');
            }
            return response.json();
        },
        enabled: !!user?.id,
    });

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

    useEffect(() => {
        if (userData?.graduation?.graduationDay) {
            setGraduationDay(userData.graduation.graduationDay);
        }
        if (userData?.graduation?.dateForPurchaseHat) {
            setDateForPurchaseHat(userData.graduation.dateForPurchaseHat);
        }
        if (userData?.graduation?.priceOnHat) {
            setPriceOnHat(userData.graduation.priceOnHat);
        }
        if (userData?.savings?.savingsMode) {
            setSavingsMode(userData.savings.savingsMode);
        }
        if (userData?.savings?.monthlyAmount) {
            setMonthlyAmount(userData.savings.monthlyAmount);
        }
    }, [userData]);

    useEffect(() => {
        if (savingsMode === 'auto' && priceOnHat && dateForPurchaseHat) {

            const daysLeft = getDaysUntilPurchaseHat(dateForPurchaseHat);
            const monthsLeft = Math.max(1, Math.ceil(daysLeft / 30));
            const price = parseFloat(priceOnHat);
            if (!isNaN(price)) {
                const calculatedAmount = Math.ceil(price / monthsLeft);
                setMonthlyAmount(calculatedAmount.toString());
            }
        }
    }, [savingsMode, priceOnHat, dateForPurchaseHat, getDaysUntilPurchaseHat]);

    if (isLoading) return <div>Laddar inställningar...</div>;
    if (error) return <div>Kunde inte ladda inställningar.</div>;
    // Spara data
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        setShowErrorMessageForSavedCardDetails(false); // nollställer så det inte blir lagg
        setShowSuccessMessageForSavedCardDetails(false); // nollställer så det inte blir lagg

        if (!user?.id) return;

        const currentData = userData || {
            personal: { fname: '', lname: '', email: '' },
            payment: {
                nameOnCard: '',
                cardNumber: '',
                cardMonth: '',
                cardYear: '',
                cardCVV: '',
            },
            graduation: { graduationDay: '', dateForPurchaseHat: '', priceOnHat: 0 },
            savings: { savedAmount: 0, savingsMode: 'manual', monthlyAmount: 0 },
        };

        const updatedData = {
            ...currentData,
            payment: {
                ...currentData.payment,
                nameOnCard: nameOnCard,
                cardNumber: cardNumber,
                cardCVV: cvv,
                cardMonth: cardMonth,
                cardYear: cardYear,
            },
            savings: {
                ...currentData.savings,
                savingsMode: savingsMode,
                monthlyAmount: monthlyAmount,
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
            setShowSuccessMessageForSavedCardDetails(true);

            queryClient.invalidateQueries({
                queryKey: ['userData', user?.id],
            });

            setIsCardDetailsEditing(false);
        } catch (error) {
            console.error('Error saving data:', error);
            setShowSuccessMessageForSavedCardDetails(false);
            setShowErrorMessageForSavedCardDetails(true);
        }
    };

    // Spara data
    const handleSaveForSavingPlan = async (e: React.FormEvent) => {
        e.preventDefault();

        setShowErrorMessageForSavedSavingPlan(false); // nollställer så det inte blir lagg
        setShowSuccessMessageForSavedSavingPlan(false);

        if (!user?.id) return;

        const currentSavingPlanData = userData || {
            personal: { fname: '', lname: '', email: '' },
            payment: {
                nameOnCard: '',
                cardNumber: '',
                cardMonth: '',
                cardYear: '',
                cardCVV: '',
            },
            graduation: { graduationDay: '', dateForPurchaseHat: '', priceOnHat: 0 },
            savings: { savedAmount: 0, savingsMode: 'manual', monthlyAmount: 0 },
        };

        const updatedSavingPlanData = {
            ...currentSavingPlanData,
            graduation: {
                ...currentSavingPlanData.graduation,
                graduationDay: graduationDay,
                dateForPurchaseHat: dateForPurchaseHat,
                priceOnHat: priceOnHat,
            },
            savings: {
                ...currentSavingPlanData.savings,
                savingsMode: savingsMode,
                monthlyAmount: monthlyAmount,
            },
        };

        try {
            const response = await fetch(`/api/data?userId=${user.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                    data: updatedSavingPlanData,
                }),
            });

            if (!response.ok) {
                throw new Error('Kunde inte spara data');
            }

            const data = await response.json();

            console.log(data);
            setShowSuccessMessageForSavedSavingPlan(true);
            queryClient.invalidateQueries({
                queryKey: ['userData', user?.id],
            });
            setIsSavingPlanDetailsEditing(false);
            console.log(data);
        } catch (error) {
            console.error('Error saving data:', error);
            setShowSuccessMessageForSavedSavingPlan(false);
            setShowErrorMessageForSavedSavingPlan(true);
        }
    };

    console.log(cardMonth);

    return (
        <section className="lg:h-screen lg:overflow-hidden flex-col flex">
            <h2 className="mb-4 text-center text-tertiary">Inställningar</h2>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-3 flex-1 min-h-0">
                {(showSuccessMessageForSavedCardDetails ||
                    showErrorMessageForSavedCardDetails) && (
                        <>
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 text-p-black">
                                <div className="relative bg-background/60 glass-effect-input   w-[90%] md:w-[50%] p-8 rounded-xl shadow-2xl flex flex-col items-center text-center">
                                    <button
                                        className="top-0 right-0 absolute"
                                        onClick={() => {
                                            setShowSuccessMessageForSavedCardDetails(false);
                                            setShowErrorMessageForSavedCardDetails(false);
                                        }}
                                    >
                                        X
                                    </button>
                                    {showSuccessMessageForSavedCardDetails && (
                                        <div className="flex flex-col gap-2 items-center justify-center">
                                            <h3>Allt gick bra!</h3>
                                            <p>Dina ändringar har sparats</p>
                                        </div>
                                    )}

                                    {showErrorMessageForSavedCardDetails && (
                                        <div className="flex flex-col gap-2 items-center justify-center">
                                            <h3>Oops!</h3>
                                            <p>Det gick inte att spara</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                {(showSuccessMessageForSavedSavingPlan ||
                    showErrorMessageForSavedSavingPlan) && (
                        <>
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 text-p-black">
                                <div className="relative bg-background/60 glass-effect-input   w-[90%] md:w-[50%] p-8 rounded-xl shadow-2xl flex flex-col items-center text-center">
                                    <button
                                        className="top-0 right-0 absolute"
                                        onClick={() => {
                                            setShowSuccessMessageForSavedSavingPlan(false);
                                            setShowErrorMessageForSavedSavingPlan(false);
                                        }}
                                    >
                                        X
                                    </button>

                                    {showSuccessMessageForSavedSavingPlan && (
                                        <div className="flex flex-col gap-2 items-center justify-center">
                                            <h3>Allt gick bra!</h3>
                                            <p>Dina ändringar har sparats</p>
                                        </div>
                                    )}

                                    {showErrorMessageForSavedSavingPlan && (
                                        <div className="flex flex-col gap-2 items-center justify-center">
                                            <h3>Oops!</h3>
                                            <p>Det gick inte att spara</p>

                                            <p>Det gick inte att spara</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                {showWithdrawalSuccessMessage && (
                    <>
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 text-p-black">
                            <div className="relative bg-background/60 glass-effect-input   w-[90%] md:w-[50%] p-8 rounded-xl shadow-2xl flex flex-col items-center text-center">
                                <button
                                    className="top-0 right-0 absolute"
                                    onClick={() => {
                                        setShowWithdrawalSuccessMessage(false);
                                    }}
                                >
                                    X
                                </button>
                                <div className="flex flex-col gap-2 items-center justify-center">
                                    <h3>Grattis!</h3>
                                    <p>
                                        Ditt uttag lyckades, pengarna når ditt konto inom 1-3
                                        arbetsdagar
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {showWithdrawalErrorMessage && (
                    <>
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 text-p-black">
                            <div className="relative bg-background/60 glass-effect-input   w-[90%] md:w-[50%] p-8 rounded-xl shadow-2xl flex flex-col items-center text-center">
                                <button
                                    className="top-0 right-0 absolute"
                                    onClick={() => {
                                        setShowWithdrawalSuccessMessage(false);
                                    }}
                                >
                                    X
                                </button>
                                <div className="flex flex-col gap-2 items-center justify-center">
                                    <h3>Oops!</h3>
                                    <p>Något gick fel, försök igen senare</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <div className="lg:col-span-1 lg:overflow-y-auto">
                    <div className=" bg-background-muted md:bg-background/70 h-fit  p-8 flex flex-col gap-4 rounded-3xl glass-effect-input  ">
                        <div className="flex flex-row gap-2 justify-between items-center">
                            <img src="/assets/pinpin.png" alt="Kronspar" className="w-8 h-8 " />
                            {/* <div className="bg-p-black text-p-white rounded-full h-3 w-3 flex justify-center items-center">
                  <p className="text-[10px]">x</p>
                </div>
                <div className="bg-p-black text-p-white rounded-full h-3 w-3 flex justify-center items-center">
                  <p className="text-[10px] text-p-white/90">x</p>
                </div> */}
                            <img src="/assets/pinpin.png" alt="Kronspar" className="w-8 h-8 rotate-90" />
                        </div>
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
                <div className="lg:flex- flex flex-col gap-4 md:gap-8 lg:overflow-y-auto lg:col-span-2">
                    <div className="bg-background-muted glass-effect-input flex flex-col gap-4 lg:gap-0 rounded-3xl p-8 ">
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
                                    className="  disabled:text-p-disabled disabled:cursor-not-allowed "
                                />
                            </label>
                            <label className="flex flex-col gap-2">
                                Kortnummer
                                <input
                                    value={cardNumber}
                                    onChange={(e) => handleCardNumberChange(e, setCardNumber)}
                                    className=" disabled:text-p-disabled disabled:cursor-not-allowed "
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
                                            className=" w-full min-w-0 flex-1  disabled:text-p-disabled disabled:cursor-not-allowed "
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
                                            className=" w-full min-w-0 flex-1  disabled:text-p-disabled disabled:cursor-not-allowed "
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
                                            className="disabled:text-p-disabled disabled:cursor-not-allowed text-base"
                                            placeholder="CVV"
                                            disabled={!isCardDetailsEditing}
                                            inputMode="numeric"
                                        />
                                    </label>
                                </div>
                            </div>

                            {isCardDetailsEditing && (
                                <button
                                    onClick={() => setShowSuccessMessageForSavedCardDetails(true)}
                                    type="submit"
                                    className="text-p-white bg-primary glass-effect-input rounded-4xl w-1/2 flex justify-center items-center gap-2"
                                >
                                    <IoIosSave />
                                    Spara
                                </button>
                            )}
                        </form>
                    </div>

                    <div className="bg-background-muted glass-effect-input   rounded-3xl  flex flex-col items-center p-8 ">
                        <div className="flex flex-row justify-between items-center pb-4 w-full ">
                            <h3 className="text-tertiary text-left">Din sparningsplan</h3>
                            <button
                                className="flex items-center gap-1 text-tertiary"
                                onSubmit={handleSaveForSavingPlan}
                                onClick={() =>
                                    setIsSavingPlanDetailsEditing(!isSavingPlanDetailsEditing)
                                }
                            >
                                <IoMdSettings />
                                {isSavingPlanDetailsEditing ? 'Avbryt' : 'Ändra'}
                            </button>
                        </div>
                        <div className="border-b-2 border-background w-full"></div>
                        <form
                            onSubmit={handleSaveForSavingPlan}
                            className="flex flex-col gap-2 pt-4 uppercase w-full"
                        >
                            <div className="flex flex-col md:flex-row gap-2">
                                <label className="flex flex-col gap-2 text-tertiary">
                                    {' '}
                                    Examensdag
                                    <input
                                        value={graduationDay}
                                        onChange={(e) => setGraduationDay(e.target.value)}
                                        className=" disabled:text-p-disabled disabled:cursor-not-allowed text-p-black"
                                        disabled={!isSavingPlanDetailsEditing}
                                    />
                                </label>
                                <label className="flex flex-col gap-2 text-tertiary">
                                    Vilket datum planeras inköpet av mössan?
                                    <input
                                        value={dateForPurchaseHat}
                                        onChange={(e) => setDateForPurchaseHat(e.target.value)}
                                        className="  disabled:text-p-disabled disabled:cursor-not-allowed text-p-black"
                                        disabled={!isSavingPlanDetailsEditing}
                                    />
                                </label>
                            </div>
                            <label className="flex flex-col gap-2 text-tertiary">
                                Pris på studentmössan
                                <input
                                    inputMode="numeric"
                                    value={priceOnHat}
                                    onChange={(e) => handleNumericChange(e, setPriceOnHat, 6)}
                                    className="  disabled:text-p-disabled disabled:cursor-not-allowed text-p-black"
                                    disabled={!isSavingPlanDetailsEditing}
                                />
                            </label>
                            <label className="flex flex-col gap-2 text-tertiary">
                                Hur vill du spara?
                                <div className="flex gap-2 mb-2">
                                    <button
                                        type="button"
                                        className={` rounded-xl disabled:text-p-disabled disabled:cursor-not-allowed  w-full ${savingsMode === 'manual' ? 'bg-secondary/30 text-p-primary' : 'bg-p-white border border-2 border-secondary/30 text-p-black'}`}
                                        disabled={!isSavingPlanDetailsEditing}
                                        onClick={() => setSavingsMode('manual')}
                                    >
                                        Manuellt
                                    </button>
                                    <button
                                        type="button"
                                        className={`rounded-xl disabled:text-p-disabled disabled:cursor-not-allowed  w-full ${savingsMode === 'auto' ? 'bg-secondary/30 text-p-primary' : 'bg-p-white border border-2 border-secondary/30 text-p-black'}`}
                                        disabled={!isSavingPlanDetailsEditing}
                                        onClick={() => setSavingsMode('auto')}
                                    >
                                        Automatiskt
                                    </button>
                                </div>
                            </label>
                            {savingsMode === 'manual' && (
                                <label className="flex flex-col gap-2">
                                    Summa du vill spara per månad
                                    <input
                                        inputMode="numeric"
                                        value={monthlyAmount}
                                        onChange={(e) => handleNumericChange(e, setMonthlyAmount, 4)}
                                        className=" rounded-lg disabled:bg-text-p-white disabled:text-gray-300 disabled:cursor-not-allowed"
                                        disabled={!isSavingPlanDetailsEditing}
                                    />
                                </label>
                            )}
                            {savingsMode === 'auto' && (
                                <p className="text-tertiary">
                                    Vi drar {monthlyAmount} kr / månad
                                </p>
                            )}
                            <div className="grid grid-cols-2 gap-2">
                                {isSavingPlanDetailsEditing && (
                                    <button
                                        className="text-p-white bg-primary glass-effect-input rounded-4xl flex justify-center items-center gap-2"
                                        type="submit"
                                    >
                                        <IoIosSave />
                                        Spara
                                    </button>
                                )}
                                <button
                                    type="button"
                                    className="text-p-black bg-accent glass-effect-input rounded-4xl flex justify-center items-center gap-2"
                                    onClick={() => {
                                        if (userData && user?.id) {
                                            const updatedData = withdrawSavings(userData, user.id);
                                            if (updatedData) {
                                                queryClient.invalidateQueries({
                                                    queryKey: ['userData', user.id],
                                                });
                                                setShowWithdrawalSuccessMessage(true);
                                            } else {
                                                setShowWithdrawalErrorMessage(true);
                                            }
                                        } else {
                                            setShowWithdrawalErrorMessage(true);
                                        }
                                    }}
                                >
                                    <PiHandWithdrawFill />
                                    Ta ut sparande
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

