import { useEffect, useRef, useState } from 'react';
import { io, Socket, Manager } from 'socket.io-client';

interface PriceData {
  tokenAddress: string;
  price: number;
  timestamp: number;
}

interface SubscribedData {
  tokenAddress: string;
}

interface ErrorData {
  message: string;
}

interface UseTokenPriceReturn {
  price: number | null;
  lastUpdate: string;
  connectionStatus: string;
}

export const useTokenPrice = (tokenAddress: string): UseTokenPriceReturn => {
  const [price, setPrice] = useState<number | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [connectionStatus, setConnectionStatus] = useState<string>('disconnected');
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Initialize Socket.IO connection
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const manager = new Manager(baseUrl, {
      path: '/socket.io',
      transports: ['websocket'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      autoConnect: true,
      withCredentials: false
    });

    // Connect to specific namespace
    socketRef.current = manager.socket('/token-info');

    // Handle connection events
    socketRef.current.on('connect', () => {
      console.log('Connected to WebSocket server');
      setConnectionStatus('connected');
      // Subscribe to token when connected
      socketRef.current?.emit('subscribe', { tokenAddress });
    });

    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
      setConnectionStatus('disconnected');
    });

    socketRef.current.on('price', (data: PriceData) => {
      console.log('Received price update:', data);
      setPrice(data.price);
      setLastUpdate(new Date(data.timestamp).toLocaleString());
    });

    socketRef.current.on('subscribed', (data: SubscribedData) => {
      console.log('Successfully subscribed to token:', data.tokenAddress);
    });

    socketRef.current.on('error', (error: ErrorData) => {
      console.error('WebSocket error:', error.message);
      setConnectionStatus('error');
    });

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.emit('unsubscribe', { tokenAddress });
        socketRef.current.disconnect();
      }
    };
  }, [tokenAddress]);

  return {
    price,
    lastUpdate,
    connectionStatus
  };
}; 