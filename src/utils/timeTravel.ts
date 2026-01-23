// import type { UserData } from "../mocks/handlers";
// import { getDaysUntilGraduation, getDaysUntilPurchaseHat } from "./getDays";


  
//   // Caluculate what the sum of savings till be at the date for purchasing the hat when in manual savings mode

  
//   export const fastForwardToPurchaseHatDay = async (
//     data: UserData,
//     userId: string | undefined
//   ) => {
//     // 1. Extra säkerhetskoll
//     if (!userId || !data?.graduation?.dateForPurchaseHat) {
//       alert('Saknar nödvändig information');
//       return null;
//     }
  
//     const daysLeft = getDaysUntilPurchaseHat(
//       data.graduation.dateForPurchaseHat,
//       userId
//     );
  
//     if (daysLeft <= 0) {
//       alert('Datumet har redan passerat');
//       return null;
//     }
  
//     // 2. SPARA ENDAST TIDSRELATERADE VÄRDEN I BACKUP
//     // (savedAmount och lastTransactionDate)
//     const timeBackup = {
//       savedAmount: data.savings?.savedAmount || 0,
//       lastTransactionDate: data.savings?.lastTransactionDate || null,
//     };
//     localStorage.setItem(`data_${userId}_timeBackup`, JSON.stringify(timeBackup));
  
//     // 3. Beräkna månadsskillnaden
//     const monthsLeft = Math.max(0, Math.ceil(daysLeft / 30));
  
//     // 4. Beräkna hur mycket som skulle ha sparats
//     const monthlyAmount = Number(data.savings?.monthlyAmount) || 0;
//     const amountToAdd = monthsLeft * monthlyAmount;
  
//     // 5. Skapa ett datum i framtiden (köpdatumet)
//     const purchaseDate = new Date(data.graduation.dateForPurchaseHat);
  
//     // 6. Djupkopiering med JSON.parse/JSON.stringify
//     const newData = JSON.parse(JSON.stringify(data));
  
//     // 7. Uppdatera ENDAST tidsrelaterade värden
//     newData.savings.savedAmount =
//       (newData.savings.savedAmount || 0) + amountToAdd;
//     newData.savings.lastTransactionDate = purchaseDate
//       .toISOString()
//       .split('T')[0];
  
//     // 8. Spara simulerat datum för time travel
//     localStorage.setItem(
//       `data_${userId}_simulatedDate`,
//       purchaseDate.toISOString().split('T')[0]
//     );
  
//     // 9. Spara till localStorage (behåller alla andra inställningar)
//     localStorage.setItem(`data_${userId}`, JSON.stringify(newData));
  
//     return newData;
//   };
  
//   export const fastForwardToGraduationDay = async (
//     data: UserData,
//     userId: string | undefined
//   ) => {
//     // 1. Extra säkerhetskoll
//     if (!userId || !data?.graduation?.graduationDay) {
//       alert('Saknar nödvändig information');
//       return null;
//     }
  
//     const daysLeft = getDaysUntilGraduation(
//       data.graduation.graduationDay,
//       userId
//     );
  
//     if (daysLeft <= 0) {
//       alert('Datumet har redan passerat');
//       return null;
//     }
  
//     // 2. SPARA ENDAST TIDSRELATERADE VÄRDEN I BACKUP
//     // (savedAmount och lastTransactionDate)
//     const timeBackup = {
//       savedAmount: data.savings?.savedAmount || 0,
//       lastTransactionDate: data.savings?.lastTransactionDate || null,
//     };
//     localStorage.setItem(`data_${userId}_timeBackup`, JSON.stringify(timeBackup));
  
//     // 3. Beräkna månadsskillnaden
//     const monthsLeft = Math.max(0, Math.ceil(daysLeft / 30));
  
//     // 4. Beräkna hur mycket som skulle ha sparats
//     const monthlyAmount = Number(data.savings?.monthlyAmount) || 0;
//     const amountToAdd = monthsLeft * monthlyAmount;
  
//     // 5. Skapa ett datum i framtiden (examensdagen)
//     const graduationDate = new Date(data.graduation.graduationDay);
  
//     // 6. Djupkopiering med JSON.parse/JSON.stringify
//     const newData = JSON.parse(JSON.stringify(data));
  
//     // 7. Uppdatera ENDAST tidsrelaterade värden
//     newData.savings.savedAmount =
//       (newData.savings.savedAmount || 0) + amountToAdd;
//     newData.savings.lastTransactionDate = graduationDate
//       .toISOString()
//       .split('T')[0];
  
//     // 8. Spara simulerat datum för time travel
//     localStorage.setItem(
//       `data_${userId}_simulatedDate`,
//       graduationDate.toISOString().split('T')[0]
//     );
  
//     // 9. Spara till localStorage (behåller alla andra inställningar)
//     localStorage.setItem(`data_${userId}`, JSON.stringify(newData));
  
//     return newData;
//   };
  
//   export const resetToCurrentTime = async (
//     data: UserData,
//     userId: string | undefined
//   ) => {
//     if (!userId) {
//       alert('Saknar användar-ID');
//       return null;
//     }
  
//     // 1. Hämta backup av tidsrelaterade värden
//     const timeBackupString = localStorage.getItem(`data_${userId}_timeBackup`);
  
//     if (!timeBackupString) {
//       alert('Ingen backup hittades. Kan inte återställa.');
//       return null;
//     }
  
//     const timeBackup = JSON.parse(timeBackupString);
  
//     // 2. Djupkopiera nuvarande data (som innehåller alla användarens inställningar)
//     const currentData = JSON.parse(JSON.stringify(data));
  
//     // 3. Återställ ENDAST tidsrelaterade värden från backup
//     currentData.savings.savedAmount = timeBackup.savedAmount;
//     currentData.savings.lastTransactionDate = timeBackup.lastTransactionDate;
  
//     // 4. Spara tillbaka (med alla inställningar intakta)
//     localStorage.setItem(`data_${userId}`, JSON.stringify(currentData));
  
//     // 5. Ta bort backup och simulerat datum
//     localStorage.removeItem(`data_${userId}_timeBackup`);
//     localStorage.removeItem(`data_${userId}_simulatedDate`);
  
//     return currentData;
//   };
  
  