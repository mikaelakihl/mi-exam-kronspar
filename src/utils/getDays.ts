// export const getDaysUntilGraduation = (
//     graduationDateString: string,
//     userId?: string
//   ) => {
//     let today = new Date();
  
//     // Om vi är i time travel-läge, använd simulerat datum
//     if (userId) {
//       const simulatedDateStr = localStorage.getItem(
//         `data_${userId}_simulatedDate`
//       );
//       if (simulatedDateStr) {
//         today = new Date(simulatedDateStr);
//       }
//     }
  
//     const graduationDay = new Date(graduationDateString);
  
//     const timeDifference = graduationDay.getTime() - today.getTime();
  
//     if (timeDifference < 0) {
//       return 0;
//     }
  
//     const oneDayToMilliseconds = 1000 * 60 * 60 * 24;
  
//     const dayLeftUntilGraduation = timeDifference / oneDayToMilliseconds;
  
//     return Math.ceil(dayLeftUntilGraduation);
//   };
  
//   export const getDaysUntilPurchaseHat = (
//     dateForPurchasingHatString: string,
//     userId?: string
//   ) => {
//     let today = new Date();
  
//     // Om vi är i time travel-läge, använd simulerat datum
//     if (userId) {
//       const simulatedDateStr = localStorage.getItem(
//         `data_${userId}_simulatedDate`
//       );
//       if (simulatedDateStr) {
//         today = new Date(simulatedDateStr);
//       }
//     }
  
//     const purchaseHatDate = new Date(dateForPurchasingHatString);
  
//     const timeDifference = purchaseHatDate.getTime() - today.getTime();
  
//     if (timeDifference < 0) {
//       return 0;
//     }
  
//     const oneDayToMilliseconds = 1000 * 60 * 60 * 24;
  
//     const dayLeftUntilPurchaseHat = timeDifference / oneDayToMilliseconds;
  
//     return Math.ceil(dayLeftUntilPurchaseHat);
//   };
  