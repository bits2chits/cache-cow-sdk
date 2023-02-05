import React, { createContext, useState } from 'react'
import useCacheCowApi from '../hooks/useCacheCowApi';
import CacheCowApi from '../libs/api';

export interface CacheCowProviderProps {
  apiKey: string
  mus: string[]
  children: React.ReactNode | React.ReactNode[]
}

export interface CacheCowState {
  [key: string]: Record<string, Record<string, any>>
}

export interface CacheCowDispatch {
  dispatch: React.Dispatch<React.SetStateAction<CacheCowState>> | undefined
  api: CacheCowApi | undefined
}

export const CacheCowStateContext = createContext({})
export const CacheCowDispatchContext = createContext<CacheCowDispatch>({ dispatch: undefined, api: undefined })

export const CacheCowProvider = ({ apiKey, mus, children }: CacheCowProviderProps) => {
  const [state, setState] = useState<CacheCowState>(mus.reduce((data: CacheCowState, m: string) => ({ ...data, [m]: {} }), {}))
  const api = useCacheCowApi(apiKey)

  return (
    <CacheCowStateContext.Provider value={state}>
      <CacheCowDispatchContext.Provider value={{ dispatch: setState, api }}>
        {children}
      </CacheCowDispatchContext.Provider>
    </CacheCowStateContext.Provider>
  )
}
