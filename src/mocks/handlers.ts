import { http, HttpResponse } from 'msw';

// --- TYPDEFINITIONER FÖR DATAN ---

interface PersonalInfo {
  fname: string;
  lname: string;
  email: string;
}

interface PaymentInfo {
  nameOnCard: string;
  cardNumber: string;
  cardMonth: string;
  cardYear: string;
  cardCVV: string;
}

interface GraduationInfo {
  graduationDay: string;
  dateForPurchaseHat: string;
  priceOnHat: number;
}

// Huvudobjektet för en användare
interface UserData {
  id: number;
  userId: string; // Koppling till inloggad användare
  personal: PersonalInfo;
  payment: PaymentInfo;
  graduation: GraduationInfo;
}

// --- MOCKDATA (5 st exempelanvändare) ---

const initialUsers: UserData[] = [
  {
    id: 1,
    userId: 'user_37WRhowNrAR4eFiAtinVZcX4LN6',
    personal: {
      fname: 'Anna',
      lname: 'Andersson',
      email: 'anna.andersson@example.com',
    },
    payment: {
      nameOnCard: 'Anna Andersson',
      cardNumber: '4532123456789012',
      cardMonth: '06',
      cardYear: '28',
      cardCVV: '123',
    },
    graduation: {
      graduationDay: '2027-06-12',
      dateForPurchaseHat: '2027-04-25',
      priceOnHat: 899,
    },
  },
  {
    id: 2,
    userId: 'user_2',
    personal: {
      fname: 'Erik',
      lname: 'Eriksson',
      email: 'erik.e@example.com',
    },
    payment: {
      nameOnCard: 'Erik Eriksson',
      cardNumber: '5432987654321098',
      cardMonth: '12',
      cardYear: '26',
      cardCVV: '456',
    },
    graduation: {
      graduationDay: '2026-06-10',
      dateForPurchaseHat: '2026-05-01',
      priceOnHat: 1200,
    },
  },
  {
    id: 3,
    userId: 'user_3',
    personal: {
      fname: 'Maria',
      lname: 'Lind',
      email: 'maria.lind@example.com',
    },
    payment: {
      nameOnCard: 'Maria Lind',
      cardNumber: '4929111122223333',
      cardMonth: '09',
      cardYear: '25',
      cardCVV: '789',
    },
    graduation: {
      graduationDay: '2025-06-05',
      dateForPurchaseHat: '2025-03-15',
      priceOnHat: 650,
    },
  },
  {
    id: 4,
    userId: 'user_4',
    personal: {
      fname: 'Lars',
      lname: 'Larsson',
      email: 'lars.l@example.com',
    },
    payment: {
      nameOnCard: 'Lars Larsson',
      cardNumber: '1234567812345678',
      cardMonth: '01',
      cardYear: '27',
      cardCVV: '321',
    },
    graduation: {
      graduationDay: '2027-06-15',
      dateForPurchaseHat: '2027-05-20',
      priceOnHat: 950,
    },
  },
  {
    id: 5,
    userId: 'user_5',
    personal: {
      fname: 'Karin',
      lname: 'Nilsson',
      email: 'karin.n@example.com',
    },
    payment: {
      nameOnCard: 'Karin Nilsson',
      cardNumber: '8765432187654321',
      cardMonth: '03',
      cardYear: '26',
      cardCVV: '654',
    },
    graduation: {
      graduationDay: '2026-06-08',
      dateForPurchaseHat: '2026-04-10',
      priceOnHat: 1500,
    },
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const handlers = [
  // --- GET DATA ---
  http.get('/api/data', async ({ request }) => {
    await delay(300);

    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return new HttpResponse(null, { status: 400 });
    }

    // 1. Kolla om vi har sparat (uppdaterad) data i localStorage
    const storedData = localStorage.getItem(`data_${userId}`);
    if (storedData) {
      return HttpResponse.json(JSON.parse(storedData));
    }

    // 2. Annars, kolla om det är en av våra mock-användare
    const mockUser = initialUsers.find((u) => u.userId === userId);
    if (mockUser) {
      return HttpResponse.json(mockUser);
    }

    // 3. Annars returnera tomt (ny användare)
    return HttpResponse.json(null);
  }),

  // --- UPDATE DATA ---
  http.post('/api/data', async ({ request }) => {
    await delay(300);
    const body = (await request.json()) as { userId: string; data: UserData };

    if (!body.userId || !body.data) {
      return new HttpResponse(null, { status: 400 });
    }

    // Vi sparar hela den uppdaterade strukturen i localStorage
    localStorage.setItem(`data_${body.userId}`, JSON.stringify(body.data));

    return HttpResponse.json({ success: true, data: body.data });
  }),
];
