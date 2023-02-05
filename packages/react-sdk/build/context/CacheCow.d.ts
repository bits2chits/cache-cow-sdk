import React from 'react';
import CacheCowApi from '../libs/api';
export interface CacheCowProviderProps {
    apiKey: string;
    mus: string[];
    children: React.ReactNode | React.ReactNode[];
}
export interface CacheCowState {
    [key: string]: Record<string, Record<string, any>>;
}
export interface CacheCowDispatch {
    dispatch: React.Dispatch<React.SetStateAction<CacheCowState>> | undefined;
    api: CacheCowApi | undefined;
}
export declare const CacheCowStateContext: React.Context<{}>;
export declare const CacheCowDispatchContext: React.Context<CacheCowDispatch>;
export declare const CacheCowProvider: ({ apiKey, mus, children }: CacheCowProviderProps) => JSX.Element;
