import type { UserData } from "../mocks/handlers";
export const getNextPaymentDate = (lastPaymentDate: string) => {
    if (!lastPaymentDate) return 'Datum saknas';
  
    const date = new Date(lastPaymentDate);
    date.setMonth(date.getMonth() + 1);
  
    return date.toLocaleDateString('sv-SE', {
      day: 'numeric',
      month: 'long',
    });
  };
  
  console.log(getNextPaymentDate('2026-01-20'));

export const calculateSumOfSavingsInManualSavingsMode = (
  monthlyAmount: number,
  dayLeft: number //  tar emot antalet dagar direkt
) => {
  const monthsLeft = Math.max(0, Math.ceil(dayLeft / 30));

  return monthsLeft * monthlyAmount;
};

  export const withdrawSavings = (data: UserData, userId: string) => {
    if (!userId || !data?.savings) {
      return null;
    }
  
    const newData = JSON.parse(JSON.stringify(data));
    newData.savings.savedAmount = 0;
  
    localStorage.setItem(`data_${userId}`, JSON.stringify(newData));
  
    return newData;
  };
  