import { useContext } from "react"
import { CacheCowStateContext } from "../context/CacheCow"

export default function useCacheCowState() {
  const state = useContext(CacheCowStateContext)
  return state
}