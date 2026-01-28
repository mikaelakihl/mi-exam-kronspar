
import { useEffect, useState } from "react";
import { IoIosSave, IoMdSettings } from "react-icons/io";
import { withdrawSavings } from "../utils/payment";
import { PiHandWithdrawFill } from "react-icons/pi";
import { useTimeTravel } from "../hooks/useTimeTravel";
import { handleNumericChange } from "../utils/formRegex";
import { useUserData } from "../hooks/useUserData";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";


type SavingplanSettingsProps = {
    onSuccess: () => void;
    onError: () => void;
    onWithdrawSuccess: () => void;
    onWithdrawError: () => void;
};

export const SavingplanSettings = ({ onSuccess, onError, onWithdrawSuccess, onWithdrawError }: SavingplanSettingsProps) => {
    const { getDaysUntilPurchaseHat } = useTimeTravel();



    const [graduationDay, setGraduationDay] = useState('');
    const [dateForPurchaseHat, setDateForPurchaseHat] = useState('');
    const [priceOnHat, setPriceOnHat] = useState('');
    const [savingsMode, setSavingsMode] = useState('manual');
    const [monthlyAmount, setMonthlyAmount] = useState('');

    const [isSavingPlanDetailsEditing, setIsSavingPlanDetailsEditing] =
        useState(false);


    const queryClient = useQueryClient();
    const { user } = useUser();

    const {
        data: userData,
        isLoading,
        error,
    } = useUserData()


    // När vi får data, fyll i formuläret



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


    // Spara data
    const handleSaveForSavingPlan = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user?.id || !userData) return;

        const updatedSavingPlanData = {
            ...userData,
            graduation: {
                ...userData.graduation,
                graduationDay: graduationDay,
                dateForPurchaseHat: dateForPurchaseHat,
                priceOnHat: priceOnHat,
            },
            savings: {
                ...userData.savings,
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
            onSuccess();
            queryClient.invalidateQueries({
                queryKey: ['userData', user?.id],
            });
            setIsSavingPlanDetailsEditing(false);
            console.log(data);
        } catch (error) {
            console.error('Error saving data:', error);
            onError();
        }
    };



    return (

        <div className="bg-background-muted glass-effect-input  rounded-3xl  flex flex-col items-center p-4 py-8 lg:p-8 ">

            <div className="flex flex-row justify-between items-center pb-4 w-full ">
                <h3 className="text-left">Din sparningsplan</h3>
                <button
                    className="flex items-center gap-1"
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
                    <label className="flex flex-col gap-2">
                        {' '}
                        Examensdag
                        <input
                            value={graduationDay}
                            onChange={(e) => setGraduationDay(e.target.value)}
                            className=" disabled:text-p-disabled disabled:cursor-not-allowed text-p-black"
                            disabled={!isSavingPlanDetailsEditing}
                        />
                    </label>
                    <label className="flex flex-col gap-2 ">
                        Vilket datum planeras inköpet av mössan?
                        <input
                            value={dateForPurchaseHat}
                            onChange={(e) => setDateForPurchaseHat(e.target.value)}
                            className="  disabled:text-p-disabled disabled:cursor-not-allowed text-p-black"
                            disabled={!isSavingPlanDetailsEditing}
                        />
                    </label>
                </div>
                <label className="flex flex-col gap-2 ">
                    Pris på studentmössan
                    <input
                        inputMode="numeric"
                        value={priceOnHat}
                        onChange={(e) => handleNumericChange(e, setPriceOnHat, 6)}
                        className="  disabled:text-p-disabled disabled:cursor-not-allowed text-p-black"
                        disabled={!isSavingPlanDetailsEditing}
                    />
                </label>
                <label className="flex flex-col gap-2 ">
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
                    <p className="">
                        Vi drar {monthlyAmount} kr / månad
                    </p>
                )}
                <div className="grid grid-cols-2 gap-2">
                    {isSavingPlanDetailsEditing ? null : (
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
                                        onWithdrawSuccess();
                                    } else {
                                        onWithdrawError();
                                    }
                                } else {
                                    onWithdrawError();
                                }
                            }}
                        >
                            <PiHandWithdrawFill />
                            Ta ut sparande
                        </button>
                    )}
                    {isSavingPlanDetailsEditing && (
                        <button
                            className="text-p-white bg-primary glass-effect-input rounded-4xl flex justify-center items-center gap-2"
                            type="submit"
                        >
                            <IoIosSave />
                            Spara
                        </button>
                    )}
                </div>
            </form>
        </div>

    );
};

