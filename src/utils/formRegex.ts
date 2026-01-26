

export const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void, kMaxLength?: number) => {
    const value = e.target.value; 
    const isOnlyNumbers = /^\d*$/.test(value);

    if (value === '' || (isOnlyNumbers && (!kMaxLength || value.length <= kMaxLength))) {
        setter(value);
    }
}

export const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
    const value = e.target.value;
    if (value === '' || /^\d*$/.test(value)) {
        // Kolla också att det inte är > 12 om man skrivit 2 siffror
        if (value.length === 2 && parseInt(value) > 12) {
            return;
        }
        if (value.length <= 2) {
             setter(value);
        }
    }
};

export const handleCardNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (value: string) => void
) => {
    // Hämta råvärdet och ta bort allt som inte är siffror
    let value = e.target.value.replace(/\D/g, ''); 
    
    // Klipp av om det är längre än 16 siffror
    if (value.length > 16) {
        value = value.slice(0, 16);
    }
    
    //  Lägg till mellanslag var 4:e siffra
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    // 4. Uppdatera statet
    setter(value);
};