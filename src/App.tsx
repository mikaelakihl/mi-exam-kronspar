
import './index.css';

import { BrowserRouter, Route, Routes } from 'react-router';
import {
  SignedIn,
  SignedOut,
} from '@clerk/clerk-react';
import { Layout } from './pages/Layout';
import { Statistics } from './pages/Statistics';
import { Settings } from './pages/Settings';

import { StartPage } from './pages/StartPage';
import { Home } from './pages/Home';



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <div>
                <SignedIn><Home /></SignedIn>
                <SignedOut>
                  <StartPage />
                </SignedOut>
              </div>
            }
          />
          <Route path="/settings" element={<Settings />} />
          <Route path="/statistics" element={<Statistics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
