/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from "react";

export const ConfigContext = createContext<any>(null);

export function useConfig() {
    return useContext(ConfigContext);
}
