import { useState, useEffect } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket"
import { CacheCowStream } from '../types/api'
import useCacheCowDispatch from './useCacheCowDispatch'
import useCacheCowState from './useCacheCowState'

export default function useCacheCowStream() {
  const state = useCacheCowState()
  const { api, dispatch } = useCacheCowDispatch()
  const [streams, setStreams] = useState<CacheCowStream[]>([])
  const [initialized, setInitialized] = useState<boolean>(false)

  // get streams
  useEffect(() => {
    if (!api) {
      return
    }
    async function getStreams() {
      const streams = await api!.getStreams(Object.keys(state))
      setStreams(streams)
    }
    getStreams()
  }, [api, state])

  useEffect(() => {
    if (streams.length === 0 || !dispatch || initialized) {
      return
    }
    const sockets: W3CWebSocket[] = streams.map((s: CacheCowStream) => {
      const socket = new W3CWebSocket(s.socket)

      // socket.onopen = () => {
      //   setState('OPEN');
      // };

      // socket.onclose = () => {
      //   setState('CLOSED');
      // };

      socket.onmessage = (event: any) => {
        console.log('*** EVENT ***', event)
        dispatch({ ...state, [s.muName]: JSON.parse(event.data) });
      };

      return socket
    })
    console.log(sockets)
    setInitialized(true)
    return () => {
      sockets.forEach(socket => {
        if (socket.readyState === 1) { // <-- This is important
          socket.close();
        } 
      });
    };
  }, [dispatch, state, streams, initialized]);

    return state;
}
