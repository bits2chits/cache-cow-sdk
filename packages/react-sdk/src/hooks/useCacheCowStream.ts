import { useState, useEffect } from 'react'
import WebSocket from 'ws'
import { CacheCowStream } from '../types/api'
import useCacheCowDispatch from './useCacheCowDispatch'
import useCacheCowState from './useCacheCowState'

export default function useCacheCowStream() {
  const state = useCacheCowState()
  const { api, dispatch } = useCacheCowDispatch()
  const [streams, setStreams] = useState<CacheCowStream[]>([])

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
  }, [api])

  useEffect(() => {
    if (streams.length === 0 || !dispatch) {
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
        console.log('*** EVENT ***', event)
        dispatch({ ...state, [s.muName]: JSON.parse(event.data) });
      };

      return socket
    })

    return () => {
      sockets.forEach(socket => socket.close());
    };
  }, [dispatch, state]);

    return state;
}
