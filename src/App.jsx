import { useState, useEffect } from 'react';
import { LanguageProvider } from './hooks/useLanguage.jsx';
import { MusicProvider } from './contexts/MusicContext.jsx';
import LoadingScreen from './components/layout/LoadingScreen.jsx';
import Home from './pages/Home.jsx';
import ErrorBoundary from './components/ui/ErrorBoundary.jsx';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <MusicProvider>
          {/* Loading overlay for initial entrance */}
          {loading && <LoadingScreen onDone={() => setLoading(false)} />}
          {/* Main application is always mounted and visible */}
          <Home />
        </MusicProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

