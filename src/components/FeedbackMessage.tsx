import { IoIosCloseCircleOutline } from "react-icons/io";

type FeedbackMessageProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;

}

export const FeedbackMessage = ({ isOpen, onClose, title, message }: FeedbackMessageProps) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 text-p-black">
            <div className="relative bg-background/60 glass-effect-input   w-[90%] md:w-[50%] p-8 rounded-xl shadow-2xl flex flex-col items-center text-center">
                <button
                    className="top-0 right-0 absolute"
                    onClick={onClose}
                >
                    <IoIosCloseCircleOutline className=" text-2xl" />
                </button>

                <div className="flex flex-col gap-2 items-center justify-center">
                    <h3>{title}</h3>
                    <p>{message}</p>
                </div>


            </div>
        </div>
    )
}
