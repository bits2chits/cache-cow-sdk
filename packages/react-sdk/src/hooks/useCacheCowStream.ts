import { useState, useEffect } from 'react';
import WebSocket from 'ws';

const CC_STREAM = ''

export default function useCacheCowStream(muNames: string[]): any {
  const [sockets, setSockets] = useState<WebSocket[]>([]);
  const [state, setState] = useState('CLOSED');
  const [data, setData] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket(CC_STREAM);

    setSockets([...sockets, newSocket]);

    newSocket.onopen = () => {
      setState('OPEN');
    };

    newSocket.onclose = () => {
      setState('CLOSED');
    };

    newSocket.onmessage = (event: any) => {
      setData(event.data);
    };

    return () => {
      newSocket.close();
    };
  }, [muNames]);

  return [state, data];
};
