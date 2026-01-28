import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ClerkProvider } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TimeTravelProvider } from './contexts/TimeTravelProvider.tsx';


// Create a client
const queryClient = new QueryClient();

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

async function enableMocking() {
  const { worker } = await import('./mocks/browser');

  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

const mountApp = () => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>

      <ClerkProvider publishableKey={PUBLISHABLE_KEY} signUpForceRedirectUrl="/settings">
        <QueryClientProvider client={queryClient}>
          <TimeTravelProvider>
            <App />
          </TimeTravelProvider>
        </QueryClientProvider>

      </ClerkProvider>

    </StrictMode>
  );
};

enableMocking()
  .then(() => {
    mountApp();
  })
  .catch((err) => {
    console.error('MSW failed to start:', err);
    mountApp();
  });
