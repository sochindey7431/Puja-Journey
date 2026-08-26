import { useState, useEffect } from 'react';
import { LanguageProvider } from './hooks/useLanguage.jsx';
import { MusicProvider } from './contexts/MusicContext.jsx';
import LoadingScreen from './components/layout/LoadingScreen.jsx';
import Home from './pages/Home.jsx';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LanguageProvider>
      <MusicProvider>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
        <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.6s ease' }}>
          <Home />
        </div>
      </MusicProvider>
    </LanguageProvider>
  );
}

