import { useEffect, useState } from 'react'
import CacheCowApi from '../libs/api'

export default function useCacheCowApi(apiKey: string) {
  const [api, setApi] = useState<CacheCowApi | undefined>()
  useEffect(() => {
    const api = new CacheCowApi(apiKey)
    api.auth()
    setApi(api)
  }, [])
  return api
}