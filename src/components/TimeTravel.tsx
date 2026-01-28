import { useState } from "react";
import { createPortal } from "react-dom";
import { useTimeTravel } from "../hooks/useTimeTravel";
import type { UserData } from "../mocks/handlers";
import { IoIosCloseCircleOutline } from "react-icons/io";

type TimeTravelModalProps = {
    data: UserData
    setIsTimeTravelOpen: (isOpen: boolean) => void
}

const TimeTravelModal = ({ data, setIsTimeTravelOpen }: TimeTravelModalProps) => {
    const { fastForwardToPurchaseHatDay, fastForwardToGraduationDay, resetToCurrentTime, simulatedDate } = useTimeTravel();

    const hasTimeBackup = !!simulatedDate;

    const handleFastForwardToPurchaseHatDay = async () => {
        if (!data) return;
        await fastForwardToPurchaseHatDay(data);
    };

    const handleFastForwardToGraduationDay = async () => {
        if (!data) return;
        await fastForwardToGraduationDay(data);
    };

    const handleResetToCurrentTime = async () => {
        if (!data) return;
        await resetToCurrentTime(data);
    };

    return createPortal(
        <div className="z-50 fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 ">
            <div className="flex gap-4 justify-center items-center bg-primary h-[30%] w-[50%] relative border-2 border-secondary rounded-4xl">
                <button
                    className="top-5 right-5 absolute text-p-white mb-5"
                    onClick={() => setIsTimeTravelOpen(false)}
                >
                    <IoIosCloseCircleOutline className="text-p-white text-2xl" />
                </button>
                {!hasTimeBackup ? (
                    <div className="flex flex-col lg:flex-row gap-4">
                        <button
                            className="bg-secondary text-p-white rounded py-2 px-4 rounded-full border border-background-muted"
                            onClick={handleFastForwardToPurchaseHatDay}
                        >
                            Mössa
                        </button>
                        <button
                            className="bg-secondary text-p-white rounded py-2 px-4 rounded-full border border-background-muted"
                            onClick={handleFastForwardToGraduationDay}
                        >
                            Graduation
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 justify-center items-center">
                        <p className="text-p-white mt-10">
                            Du befinner dig i time-travel-läge
                        </p>
                        <button
                            className="bg-accent text-p-white rounded py-2 px-4 rounded-full border border-background-muted"
                            onClick={handleResetToCurrentTime}
                        >
                            Återställ
                        </button>
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
};

export const TimeTravelButton = ({ data }: { data: UserData }) => {
    const [isTimeTravelOpen, setIsTimeTravelOpen] = useState(false);

    if (!data) return null;

    return (
        <>
            <button
                className="bg-background text-background hover:bg-primary/80 transition-all duration-300 hover:text-primary hover:border-secondary hover:text-white hover:border-2 p-2 rounded-full uppercase tracking-wider"
                onClick={() => setIsTimeTravelOpen(true)}
            >
                Time-travel
            </button>

            {isTimeTravelOpen && (
                <TimeTravelModal
                    data={data}
                    setIsTimeTravelOpen={setIsTimeTravelOpen}
                />
            )}
        </>
    );
}
