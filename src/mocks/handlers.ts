import { http, HttpResponse } from 'msw';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const handlers = [
  // --- GET DATA ---
  // We expect a userId in the query params (e.g. /api/data?userId=user_123)
  http.get('/api/data', async ({ request }) => {
    await delay(300);

    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return new HttpResponse(null, { status: 400 });
    }

    const storedData = localStorage.getItem(`data_${userId}`);
    const userData = storedData ? JSON.parse(storedData) : { savedAmount: 0 };

    return HttpResponse.json(userData);
  }),

  // --- UPDATE DATA ---
  http.post('/api/data', async ({ request }) => {
    await delay(300);
    const body = (await request.json()) as { userId: string; data: any };

    if (!body.userId || !body.data) {
      return new HttpResponse(null, { status: 400 });
    }

    localStorage.setItem(`data_${body.userId}`, JSON.stringify(body.data));

    return HttpResponse.json({ success: true, data: body.data });
  }),
];
