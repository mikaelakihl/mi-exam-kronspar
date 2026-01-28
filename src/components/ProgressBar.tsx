export const ProgressBar = ({ saved, goal }: { saved: number, goal: number }) => {

    const percentage = goal > 0 ? Math.min(100, Math.max(0, (saved / goal) * 100)) : 0;

    const progressBarStatus = () => {
        if (percentage >= 100) return "Grattis du är i mål, dags att beställa! 🎓";
        if (percentage >= 75) return "Wow snart framme! Kämpa på! 🚀";
        if (percentage >= 50) return "Hälften avklarat, fortsätt så! 🌟";
        if (percentage >= 25) return "En bra bit på vägen! 💪";
        if (percentage > 0) return "Du har på börjat din resa! 🌱";

        return "Dags att börja spara! 💰"
    }

    return (
        <div className="p-8 flex flex-col gap-2">
            <div className="flex items-center gap-2 justify-center">
                <div>
                    <span className="text-3xl md:text-4xl lg:text-5xl text-primary font-bold">{saved} kr</span>
                    <span className="text-gray-500">/ {goal} kr</span>
                </div>
            </div>
            <div className="h-5 border border-gray-200 rounded-full ">
                <div className="h-full bg-accent rounded-full flex items-center justify-end p-2" style={{ width: `${percentage}%` }}
                    role="progressbar" aria-valuenow={saved} aria-valuemin={0} aria-valuemax={goal}>
                    {percentage === 0 ? null : <p className="text-white text-sm">{percentage.toString()}%</p>}
                </div>
            </div>
            <p className="italic text-gray-500">{progressBarStatus()}</p>
        </div>
    )
}
