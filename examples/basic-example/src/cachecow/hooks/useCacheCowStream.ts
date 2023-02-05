import { useState, useEffect } from 'react'
// import { w3cwebsocket as W3CWebSocket } from "websocket"
import { io, Socket } from 'socket.io-client';
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
    const sockets: Socket<any, any>[] = streams.map((s: CacheCowStream) => {
      const socket = io(s.socket)

      // socket.onopen = () => {
      //   setState('OPEN');
      // };

      // socket.onclose = () => {
      //   setState('CLOSED');
      // };

      socket.on('data', (event: any) => {
        console.log('*** EVENT ***', event, state)
        dispatch({ ...state, [s.muName]: event });
      });

      return socket
    })
    console.log(sockets)
    setInitialized(true)
    return () => {
      sockets.forEach(socket => {
        // if (socket.readyState === 1) { // <-- This is important
          socket.off('connect');
          socket.off('disconnect');
          socket.off('pong');
        // } 
      });
    };
  }, [dispatch, state, streams, initialized]);

    return state;
}
