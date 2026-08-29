import { useState, useEffect } from 'react';
import { useMusicContext } from '../../contexts/MusicContext.jsx';
import { Activity, X, ChevronUp, ChevronDown } from 'lucide-react';

export default function YTDebugPanel() {
  const { isPlaying, isLoading, isBuffering, playerReady, currentTrack, errorMessage } = useMusicContext();
  const [logs, setLogs] = useState({
    scriptLoaded: typeof window !== 'undefined' && Boolean(window.YT && window.YT.Player),
    apiReadyFired: false,
    playerConstructorCalled: false,
    onReadyFired: false,
    lastState: 'NONE',
    lastErrorCode: null,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
  });
  const [minimized, setMinimized] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateLogs = () => {
      const g = window.__YT_DEBUG__ || {};
      setLogs({
        scriptLoaded: Boolean(window.YT && window.YT.Player),
        apiReadyFired: Boolean(g.apiReadyFired),
        playerConstructorCalled: Boolean(g.constructorCalled),
        onReadyFired: Boolean(g.onReadyFired),
        lastState: g.lastState || 'UNSET',
        lastErrorCode: g.lastErrorCode || null,
        userAgent: navigator.userAgent,
      });
    };

    const interval = setInterval(updateLogs, 500);
    return () => clearInterval(interval);
  }, []);

  if (closed) return null;

  const isInstagram = /Instagram/i.test(logs.userAgent);
  const isFBLite = /FB_IAB|FBLC|FBAN\/FBIOS|FBAN\/EMA/i.test(logs.userAgent);
  const isWebView = /wv|WebView/i.test(logs.userAgent) || isInstagram || isFBLite;

  return (
    <div
      className="fixed bottom-20 right-2 z-[9999] max-w-[280px] sm:max-w-xs bg-black/90 text-[11px] font-mono text-puja-gold p-2.5 rounded-lg border border-puja-gold/40 shadow-2xl backdrop-blur-md"
      style={{ fontSize: '10px', lineHeight: '1.3' }}
    >
      <div className="flex items-center justify-between border-b border-puja-gold/20 pb-1 mb-1.5 font-sans font-bold text-white">
        <span className="flex items-center gap-1">
          <Activity size={12} className="text-puja-gold animate-pulse" />
          <span>YT DIAGNOSTICS</span>
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setMinimized(m => !m)}
            className="p-0.5 text-puja-ivory/60 hover:text-white"
            aria-label="Toggle minimize"
          >
            {minimized ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
          <button
            type="button"
            onClick={() => setClosed(true)}
            className="p-0.5 text-puja-ivory/60 hover:text-white"
            aria-label="Close debug panel"
          >
            <X size={12} />
          </button>
        </div>
      </div>

      {!minimized && (
        <div className="space-y-1">
          <div className="flex justify-between">
            <span>Environment:</span>
            <span className="text-amber-300 font-bold">
              {isInstagram ? 'Instagram WebView' : isFBLite ? 'FB Lite' : isWebView ? 'WebView' : 'Standard Browser'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>YT Script:</span>
            <span className={logs.scriptLoaded ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>
              {logs.scriptLoaded ? 'LOADED' : 'PENDING'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>onAPIReady:</span>
            <span className={logs.apiReadyFired ? 'text-green-400 font-bold' : 'text-yellow-400'}>
              {logs.apiReadyFired ? 'FIRED' : 'WAITING'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>new YT.Player():</span>
            <span className={logs.playerConstructorCalled ? 'text-green-400 font-bold' : 'text-yellow-400'}>
              {logs.playerConstructorCalled ? 'CALLED' : 'NO'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>onReady Event:</span>
            <span className={logs.onReadyFired || playerReady ? 'text-green-400 font-bold' : 'text-yellow-400'}>
              {logs.onReadyFired || playerReady ? 'FIRED' : 'PENDING'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>YT State:</span>
            <span className="text-cyan-300 font-bold">{logs.lastState}</span>
          </div>
          <div className="flex justify-between">
            <span>UI State:</span>
            <span>
              {isLoading ? '⏳ Loading ' : ''}
              {isBuffering ? '🔄 Buffering ' : ''}
              {isPlaying ? '▶ Playing' : '⏸ Paused'}
            </span>
          </div>
          {logs.lastErrorCode && (
            <div className="flex justify-between text-red-400 font-bold">
              <span>YT Error:</span>
              <span>Code {logs.lastErrorCode}</span>
            </div>
          )}
          {errorMessage && (
            <div className="text-red-300 truncate" title={errorMessage}>
              Err: {errorMessage}
            </div>
          )}
          <div className="text-[9px] text-puja-ivory/40 pt-1 border-t border-puja-gold/10 truncate">
            Track: {currentTrack?.youtubeId || currentTrack?.id || 'none'}
          </div>
        </div>
      )}
    </div>
  );
}
