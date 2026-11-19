import { useEffect, useRef, useState } from 'react';
import { ApiService } from './api';

export function useLiveTokenPush(onTokenReceived?: (tokenData: any) => void) {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    try {
      const wsUrl = process.env.EXPO_PUBLIC_WS_URL || 'ws://localhost:5000';
      const ws = new WebSocket(wsUrl);
      socketRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        console.log('[WebSocket Client] Connected to HOT Recharge Push Gateway');
      };

      ws.onmessage = async (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'TOKEN_DISPENSED') {
            console.log('[WebSocket Client] Live token received:', data.payload);
            await ApiService.saveToOfflineVault(data.payload);
            if (onTokenReceived) {
              onTokenReceived(data.payload);
            }
          }
        } catch (err) {
          console.warn('Failed parsing WS message', err);
        }
      };

      ws.onclose = () => {
        setIsConnected(false);
      };

      return () => {
        ws.close();
      };
    } catch (err) {
      console.warn('WebSocket connection error', err);
    }
  }, []);

  return { isConnected };
}
