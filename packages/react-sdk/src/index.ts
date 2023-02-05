import { useState, useEffect } from 'react';
import WebSocket from 'ws';
import CacheCowApi from './libs/api';
import { CacheCowStream } from './types/api';

/**
 * 
 * @param apiKey Api key is different for testnet and mainnet, and that is how it will differentiate between the two
 * @returns 
 */
export default function init(apiKey: string): Function {
  // should use a singleton here
  const api = new CacheCowApi(apiKey)
  return function useCacheCowStream(muNames: string[]): any {
    // const [state, setState] = useState('CLOSED');
    const [data, setData] = useState(muNames.reduce((data, name: string) => ({ ...data, [name]: {}}), {}));
    const [streams, setStreams] = useState<CacheCowStream[]>([])
    const [initialized, setInitialized] = useState<boolean>(false)

    // initialize
    useEffect(() => {
      async function initialize() {
        await api.auth()
        setInitialized(true)
      }
      initialize()
    }, [])

    // get streams
    useEffect(() => {
      async function getStreams() {
        const streams = await api.getStreams(muNames)
        setStreams(streams)
      }
      getStreams()
    }, [initialized])

    useEffect(() => {
      if (streams.length === 0) {
        return
      }
      const sockets: WebSocket[] = streams.map((s: CacheCowStream) => {
        const socket = new WebSocket(s.socket)

        // socket.onopen = () => {
        //   setState('OPEN');
        // };

        // socket.onclose = () => {
        //   setState('CLOSED');
        // };

        socket.onmessage = (event: any) => {
          setData({ ...data, [s.muName]: event.data });
        };

        return socket
      })

      return () => {
        sockets.forEach(socket => socket.close());
      };
    }, [muNames]);

    return data;
  };
}